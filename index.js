
const edad = Number(prompt("introduce tu edad: "))

if (edad < 18) {
    console.log("Lo siento, tienes que ser mayor de edad para poder solicitar un prestamo.");
}
else{
    console.log("Cumples la edad requerida para solicitar un prestamo! ");
}


const totalSolicitado = Number(prompt("Introduce el monto a solicitar: "));

let cuotas;
while (true) {
    cuotas = Number(prompt("Selecciona la cantidad de cuotas: 1, 3, 6, 12 o 18"));
    if ([1, 3, 6, 12, 18].includes(cuotas)) {
        break;
    } else {
        console.log("Por el momento solo hay planes de 1, 3, 6, 12 y 18 cuotas.");
    }
}

function multiplicacion(a, b){
    return a * b;
}


// esto da el total a pagar
switch (cuotas) {
    case 1:
        console.log("el total a pagar en 1 cuota es de $", multiplicacion(totalSolicitado, 1.53));
        break;
    case 3:
        console.log("el total a pagar en 3 cuotas es de $", multiplicacion(totalSolicitado, 1.75));
        break;
    case 6:
        console.log("el total a pagar en 6 cuotas es de $", multiplicacion(totalSolicitado, 1.85));
        break;
    case 12:
        console.log("el total a pagar en 12 cuotas es de $", multiplicacion(totalSolicitado, 2.15));
        break;
    case 18:
        console.log("el total a pagar en 18 cuotas es de $", multiplicacion(totalSolicitado, 2.23));
        break;
    default:
        console.log("Algo salió mal. Por favor, intenta de nuevo más tarde.");
}



//incluir una interfaz para reconocer a los solicitantes 
//class solicitante {
//   constructor(nombre, apellido, dni){
//       this.nombre = "pepe";
//       this.apellido = "grillo";
//       this.dni = 27444888
//    }
//}
//console.log(solicitante);

