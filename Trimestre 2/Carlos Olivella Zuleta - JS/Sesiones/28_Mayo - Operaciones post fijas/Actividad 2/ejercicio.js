//Hacer un programa que lea tantos salarios como el usuario quiera y guardarlos en un vector o arreglo.
//Luego se debe llamar a una función que recorra el vector de los alarios y solo pase los salarios mayores a 5 millones a un nuevo vector.
//Finalmente debe haber otra función que muestre el vector original y el nuevo vector.

import readline from 'readline-sync';
import { ingresarSalarios, filtrarSalarios, mostrarVectores } from './funciones.js';

let opcion;

do {
    console.log("\n========================================");
    console.log("        MENÚ GESTIÓN DE SALARIOS        ");
    console.log("========================================");
    console.log("1. Ingresar salarios");
    console.log("2. Filtrar salarios mayores a 5 millones");
    console.log("3. Mostrar vector original y filtrado");
    console.log("4. Salir");
    console.log("========================================");

    opcion = Number(readline.question("Seleccione una opcion: "));

    switch (opcion) {
        case 1:
            ingresarSalarios();
            break;
        case 2:
            filtrarSalarios();
            break;
        case 3:
            mostrarVectores();
            break;
        case 4:
            console.log("¡Programa finalizado! Que tenga un buen día.");
            break;
        default:
            console.log("Opción no válida. Intente de nuevo.");
            break;
    }

} while (opcion !== 4);