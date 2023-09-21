const edad = Number(prompt("Introduce tu edad: "));

if (edad < 18) {
    console.log("Lo siento, tienes que ser mayor de edad para poder solicitar un préstamo.");
} else {
    const numPrestamos = Number(prompt("¿Cuántos préstamos deseas simular?"));

    if (isNaN(numPrestamos) || numPrestamos <= 0) {
        console.log("Por favor, introduce un número válido de préstamos.");
    } else {
        const prestamos = []; // Array para almacenar detalles de préstamos

        for (let i = 0; i < numPrestamos; i++) {
            console.log(`--- Detalles del Préstamo ${i + 1} ---`);

            const totalSolicitado = Number(prompt(`Introduce el monto a solicitar para el Préstamo ${i + 1}: `));

            let cuotas;
            while (true) {
                cuotas = Number(prompt(`Selecciona la cantidad de cuotas para el Préstamo ${i + 1}: 1, 3, 6, 12 o 18`));
                if ([1, 3, 6, 12, 18].includes(cuotas)) {
                    break;
                } else {
                    console.log("Por el momento solo hay planes de 1, 3, 6, 12 y 18 cuotas.");
                }
            }

            const tasaInteresAnual = Number(prompt(`Introduce la tasa de interés anual en porcentaje para el Préstamo ${i + 1}: `));
            const tasaInteresMensual = tasaInteresAnual / 12 / 100;

            function calcularCuotaMensual(monto, tasaMensual, plazo) {
                const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
                return cuota;
            }

            function calcularTotalAPagar(monto, cuotaMensual, plazo) {
                const total = cuotaMensual * plazo;
                return total;
            }

            prestamos.push({
                monto: totalSolicitado,
                cuotas: cuotas,
                tasaInteres: tasaInteresAnual,
            });

            const cuotaMensual = calcularCuotaMensual(totalSolicitado, tasaInteresMensual, cuotas);
            const totalAPagar = calcularTotalAPagar(totalSolicitado, cuotaMensual, cuotas);

            console.log(`El total a pagar en ${cuotas} cuotas para el Préstamo ${i + 1} es de $${totalAPagar.toFixed(2)}.`);
        }

        // Detalle de todos los préstamos
        prestamos.forEach((prestamo, index) => {
            console.log(`Resumen del Préstamo ${index + 1}:`);
            console.log(`- Monto solicitado: $${prestamo.monto}`);
            console.log(`- Cuotas: ${prestamo.cuotas}`);
            console.log(`- Tasa de interés anual: ${prestamo.tasaInteres}%`);
        });
    }
}
