document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".lista");
    const listaPrestamos = document.getElementById("listaPrestamos");

    function calcularCuotaMensual(monto, tasaMensual, plazo) {
        return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    }

    function mostrarResultado(monto, cuotas, cuotaMensual, tasaInteres, comision, seguro, notaria) {
        const listaPrestamos = document.getElementById("listaPrestamos");
    
        const resultadoElemento = document.createElement("div");
        resultadoElemento.classList.add("detalle");
        resultadoElemento.innerHTML = `
            Monto solicitado: $${monto}, Cuotas: ${cuotas}, Cuota mensual: $${cuotaMensual.toFixed(2)}, Tasa de interés anual: ${tasaInteres}%, Comisión de apertura: $${comision}, Seguro de préstamo: $${seguro}, Gastos de notaría: $${notaria}
        `;
    
        listaPrestamos.appendChild(resultadoElemento);
        guardarPrestamo({
            monto,
            cuotas,
            tasaInteres,
            comision,
            seguro,
            notaria
        });
    }
    
    function mostrarListaPrestamos() {
        const listaPrestamosGuardados = obtenerPrestamos();
        listaPrestamos.innerHTML = "";

        listaPrestamosGuardados.forEach((prestamo, index) => {
            const cuotaMensual = calcularCuotaMensual(prestamo.monto, prestamo.tasaInteres / 12 / 100, prestamo.cuotas);
            const montoTotal = prestamo.monto + prestamo.comision + prestamo.seguro + prestamo.notaria;
            const li = document.createElement("li");
            li.innerHTML = `
                -Monto solicitado: $${montoTotal},<br>
                -Cuotas: ${prestamo.cuotas},<br> 
                -Cuota mensual: $${cuotaMensual.toFixed(2)},<br> 
                -Tasa de interés anual: ${prestamo.tasaInteres}%, <br>
                -Comisión de apertura: $${prestamo.comision}, <br>
                -Seguro de préstamo: $${prestamo.seguro}, <br>
                -Gastos de notaría: $${prestamo.notaria}<br>
                <button class="editar" data-index="${index}">Editar</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            listaPrestamos.appendChild(li);
        });
    }

    function guardarPrestamo(prestamo) {
        const listaPrestamosGuardados = obtenerPrestamos();
        listaPrestamosGuardados.push(prestamo);
        localStorage.setItem("prestamos", JSON.stringify(listaPrestamosGuardados));
    }

    function obtenerPrestamos() {
        return JSON.parse(localStorage.getItem("prestamos")) || [];
    }

    function obtenerTasaInteres(cuotas) {
        return fetch("./index.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener tasas de interés");
                }
                return response.json();
            })
            .then(tasas => {
                if (cuotas in tasas) {
                    return tasas[cuotas];
                } else {
                    throw new Error("Tasa de interés no encontrada");
                }
            })
            .catch(error => {
                console.error(error);
                return 10;
            });
    }

    formulario.addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const monto = parseFloat(document.getElementById("monto").value);
        const cuotas = parseInt(document.getElementById("cuotas").value);
        const comision = parseFloat(document.getElementById("comisionApertura").value);
        const seguro = parseFloat(document.getElementById("seguroPrestamo").value);
        const notaria = parseFloat(document.getElementById("gastosNotaria").value);
        const edad = parseInt(document.getElementById("edad").value);
    
        if (isNaN(monto) || isNaN(cuotas) || isNaN(comision) || isNaN(seguro) || isNaN(notaria) || isNaN(edad) || monto <= 0 || comision < 0 || seguro < 0 || notaria < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingrese datos válidos o complete los campos.',
            });
            return;
        }
    
        if (edad < 18) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Lo siento, debes ser mayor de 18 años para simular un préstamo.',
            });
            return;
        }

        try {
            const tasaInteres = await obtenerTasaInteres(cuotas);
            const tasaInteresMensual = tasaInteres / 12 / 100;
            const cuotaMensual = calcularCuotaMensual(monto, tasaInteresMensual, cuotas);
    
            mostrarResultado(monto, cuotas, cuotaMensual, tasaInteres, comision, seguro, notaria);
    
            formulario.reset();
            mostrarListaPrestamos();
        } catch (error) {
            console.error(error);
        }
    });
    
    listaPrestamos.addEventListener("click", function (e) {
        if (e.target.classList.contains("editar")) {
            const index = e.target.getAttribute("data-index");
            const prestamos = obtenerPrestamos();
            const prestamo = prestamos[index];
            if (prestamo) {
                document.getElementById("monto").value = prestamo.monto;
                document.getElementById("cuotas").value = prestamo.cuotas;
                document.getElementById("comisionApertura").value = prestamo.comision;
                document.getElementById("seguroPrestamo").value = prestamo.seguro;
                document.getElementById("gastosNotaria").value = prestamo.notaria;

                prestamos.splice(index, 1);
                localStorage.setItem("prestamos", JSON.stringify(prestamos));
                mostrarListaPrestamos();
            }
        } else if (e.target.classList.contains("eliminar")) {
            const index = e.target.getAttribute("data-index");
            const prestamos = obtenerPrestamos();
            if (index >= 0 && index < prestamos.length) {
                prestamos.splice(index, 1);
                localStorage.setItem("prestamos", JSON.stringify(prestamos));
                mostrarListaPrestamos();
            }
        }
    });
    mostrarListaPrestamos();
});
