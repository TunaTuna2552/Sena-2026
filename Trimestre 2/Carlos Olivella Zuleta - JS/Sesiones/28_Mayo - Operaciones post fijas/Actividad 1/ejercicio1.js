//Elaborar un programa que  lea una expresión aritmética, luego se debe convertir a una expresión Postfija y posteriormente se debe operar la expresión postfija y conseguir el resultado final.
import readline from 'readline-sync'; 
import { ingresarExpresion, convertir, operar } from './funciones.js';

let k;
let j;
let i;

let postfija = [k];
let pilaSignos = [j];

let resultado = [i]

let opcion;

let jerarquia = {
    "+" : 1,
    "-" : 1,
    "*" : 2,
    "/" : 2,
    "**" : 3
} 
console.log("========================================");
console.log("Menú de opciones:");
console.log("1. Ingresar expresión algebraica");
console.log("2. Convertir expresión algebraica a postfija");
console.log("3. Calcular operación");
console.log("========================================");

opcion = Number(readline.question("Ingrese una de las opciones anteriores: ")
)

do {
    switch (opcion) {
        case 1:
            ingresarExpresion();
            break;

        case 2:
            convertir();
            break;

        case 3: operar();
            break

        default:
            break;
    }
    
} while (opcion !== 9);


