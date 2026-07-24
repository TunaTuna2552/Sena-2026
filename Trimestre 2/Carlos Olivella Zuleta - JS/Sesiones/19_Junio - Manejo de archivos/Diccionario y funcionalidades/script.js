import fs from 'fs/promises';
import readline from 'readline-sync';

// Lista en memoria para almacenar los autos válidos antes de guardarlos
let autosParaGuardar = [];

console.log("==========================================================================================");
console.log("Lista de autos \nSolo los autos de modelo más reciente (a partir del año 2020) entrarán al archivo");
console.log("==========================================================================================");

async function principal() {
    let opcion;

    do {
        console.log("==========================================================================================");
        console.log("1. Agregar nuevo modelo");
        console.log("2. Guardar lista en el archivo y leer contenido");
        console.log("3. Finalizar lista y salir");

        opcion = Number(readline.question("\nSelecciona una de las opciones: "));

        switch (opcion) {
            case 1:
                agregar();
                break;

            case 2:
                await manejarArchivos();
                break;

            case 3:
                console.log("¡Byeee!");
                break;

            default:
                console.log("Opción no válida. Intenta de nuevo.");
                break;
        }

    } while (opcion !== 3); 
}

function agregar() {
    console.log("\nResponde las siguientes preguntas: ");
    let marca = readline.question("Ingresa la marca del auto: ");
    let precio = Number(readline.question("Ingresa el precio del auto: "));
    let color = readline.question("Ingresa el color del auto: ");
    let modelo = Number(readline.question("Ingresa el año del modelo: "));


    if (modelo >= 2020) {
        const nuevoAuto = { marca, precio, color, modelo };
        autosParaGuardar.push(nuevoAuto);
        console.log("\nAuto agregado a la lista temporal de forma exitosa");
    } else {
        console.log("El auto no se agregará porque el modelo es anterior al año 2020.");
    }
}

async function manejarArchivos() {
    const rutaArchivo = './ejemplo.txt';

    if (autosParaGuardar.length === 0) {
        console.log("No hay autos en la lista que cumplan con el requisito del año para ser guardados.");
        return;
    }

    try {
        // Convertir lista de autos a un texto entendible (JSON formateado)
        const datosAEnviar = JSON.stringify(autosParaGuardar, null, 2);

        await fs.writeFile(rutaArchivo, datosAEnviar, 'utf-8');
        console.log('\nArchivo creado/actualizado exitosamente.');

        const contenido = await fs.readFile(rutaArchivo, 'utf-8');
        console.log('\n--- Contenido del archivo creado ---');
        console.log(contenido);
        console.log('------------------------------------');

    } catch (error) {
        console.error('Ocurrió un error al manejar el archivo:', error);
    }
}

principal();