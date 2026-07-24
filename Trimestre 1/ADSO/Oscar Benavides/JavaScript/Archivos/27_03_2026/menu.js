import prompts from 'prompts';
import {guardarDato, actualizar, borrar, example, exp, borrarArchivo, agregar } from './leer_files.js';
import {preguntar} from './preguntas.js';
import * as fs from 'fs';

const preguntas = [
    {
        type: "text",
        name: "continuar",
        message: "Digite la opcion"
    }
];

let ejecutar = true;

while (ejecutar) {
    try {
        console.log("\n====== MENU PRINCIPAL =========");
        console.log("1. Leer");
        console.log("2. Guardar");
        console.log("3. Actualizar");
        console.log("4. Borrar");
        console.log("5. Salir");

        const res = await prompts(preguntas);

        console.log("Opción elegida: "+ res.continuar);

        // Validación para evitar errores si el usuario cierra el proceso (Ctrl+C)
        if (res.continuar === undefined) {
            console.log("\nSaliendo...");
            ejecutar = false;
            break;
        }

        switch (res.continuar) {

            case '1':
                // Leer archivo de forma segura
                if (fs.existsSync("file.txt")) {
                    const data = fs.readFileSync("file.txt", 'utf-8');
                    console.log("\n--- Contenido del archivo ---");
                    console.log(data);
                    console.log("----------------------------");
                } else {
                    console.log("\n[!] El archivo file.txt aún no existe.");
                }
                break;

            case '2':
                const listado = preguntar();
                let respuesta = await prompts(listado)
                let empleado = {
                    "nombre": respuesta.nombre,
                    "mail": respuesta.correo,
                    "cargo": respuesta.cargo
                };
                console.log(guardarDato(empleado));
                break;

            case '3':
                preguntar();
                let agrega = await prompts(agregarLista);
                let archivo = "file.txt";
                let empleadoAdd = {
                    "nombre": agrega.nombre,
                    "mail": agrega.correo,
                    "cargo": agrega.cargo
                };
                agregar(archivo, empleadoAdd);
                break;

            case '4':
                let borrarFile = [
                    {
                        type: "text",
                        name: "nombreArchivo",
                        message: "Digite el nombre del archivo a borrar"
                    }
                ];
                let borrar = await prompts(borrarFile);
                borrarArchivo(borrar.nombreArchivo);
                break;

            case '5':
                console.log("Ha salido de la aplicación");
                ejecutar = false;
                break;

            default:
                console.log("Este valor no existe... Digite uno válido..");
        }

    } catch (error) {
        console.log("Error al ingresar el campo: " + error);
    }
}
