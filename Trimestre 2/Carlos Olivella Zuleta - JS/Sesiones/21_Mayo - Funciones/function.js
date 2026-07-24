
import readline from 'readline-sync';

let nombre = readline.question("Digite el nombre del estudiante: ");
let x = parseFloat(readline.question("Digite la nota del estudiante: "));

function calcular(num1, num2, operacion) {
    switch (operacion) {
        case 'sumar':
            return num1  + num2;
        case 'restar':
            return num1 - num2;
        case 'multiplicar':
            return num1 * num2;
        case 'dividir':
            return num1 / num2;
        default:
            return "Operación no válida";
    }
}

//console.log(calcular(x, y,operar));


function aprobar(x){
    if(x < 6){
        console.log ("El estudiante " + nombre + " no aprueba")
    } else {
        console.log("El estudiante " + nombre + " aprueba")
    }
}

aprobar(x);