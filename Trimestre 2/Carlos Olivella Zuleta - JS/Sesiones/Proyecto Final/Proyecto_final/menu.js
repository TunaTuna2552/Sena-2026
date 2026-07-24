import readline from 'readline-sync';
import { registrarComponente, guardarEnArchivo } from './functions.js';

function iniciarPrograma() {
    const registros = [];
    console.log("=== BIENVENIDO AL SISTEMA DE REGISTRO DE TIENDA TECH ===");

    let deseaRegistrar = readline.keyInYNStrict("¿Desea registrar algun componente nuevo?");//Pa no escribir enter, aparte solo acepta una letra y no importa si es mayúscula o minúscula

    while (deseaRegistrar) {
        
        const nuevoRegistro = registrarComponente();
        if (nuevoRegistro) {
            registros.push(nuevoRegistro);
        }

        console.log("\n------------------------------------------------");
        console.log("1. Agregar un registro nuevo");
        console.log("2. Imprimir en un nuevo archivo de texto y salir");
        
        const opcion = readline.questionInt("\n¿Que desea hacer ahora? Selecciona (1 o 2): ");

        switch (opcion) {
            case 1:
                deseaRegistrar = true; 
                break;
                
            case 2:
                guardarEnArchivo(registros);
                deseaRegistrar = false; 
                break;
                
            default:
                console.log("Opción no válida. Por defecto continuaremos registrando.");
                deseaRegistrar = true;
                break;
        }
    }

    console.log("\nPrograma finalizado. ¡Gracias por usar el sistema!");
}

iniciarPrograma();