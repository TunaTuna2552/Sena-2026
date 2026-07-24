import readline from 'readline-sync'; 
import { ingresarExpresion, convertir, operar } from './funciones.js';

let opcion;

do {
    console.log("\n========================================");
    console.log("Menú de opciones:");
    console.log("1. Ingresar expresión algebraica");
    console.log("2. Convertir expresión algebraica a postfija");
    console.log("3. Calcular operación");
    console.log("4. Salir");
    console.log("========================================");

    opcion = Number(readline.question("Ingrese una de las opciones anteriores: "));

    switch (opcion) {
        case 1:
            ingresarExpresion();
            break;

        case 2:
            convertir();
            break;

        case 3: 
            operar();
            break;

        case 4:
            console.log("¡Hasta luego!");
            break;

        default:
            console.log("Opción inválida, intente nuevamente .");
            break;
    }
    
} while (opcion !== 4);