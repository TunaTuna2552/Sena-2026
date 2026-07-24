// Importamos la librería externa 'prompts' para hacer preguntas interactivas en la terminal
import prompts from 'prompts';
// Importamos las funciones específicas que creamos en el archivo alumno.js
import { mostrarAlumno, guardarDato, actualizar, borrar } from './alumno.js';
// Importamos las herramientas de archivos de Node.js
import * as fs from "fs";

// Definimos la configuración de la pregunta que hará prompts
const preguntas = [
    {
        type: "number",      // El usuario debe ingresar obligatoriamente un número
        name: "continuar",   // El nombre de la variable donde se guardará la respuesta
        message: "Digite la opcion" // El texto que verá el usuario
    }
];

// Variable de control para mantener el programa funcionando
let ejecutar = true;

// Iniciamos un bucle que no se detendrá mientras 'ejecutar' sea true
while (ejecutar) {
    try {
        // Imprimimos el diseño del menú visualmente
        console.log("\n====== MENU PRINCIPAL =========");
        console.log("1. Leer");
        console.log("2. Guardar");
        console.log("3. Actualizar");
        console.log("4. Borrar");
        console.log("5. Salir");

        // 'await' pausa el código aquí hasta que el usuario responda la pregunta
        const res = await prompts(preguntas);

        // Si el usuario presiona Ctrl+C, 'res.continuar' será undefined. 
        // Esta línea evita que el programa falle y lo cierra limpiamente.
        if (res.continuar === undefined) {
            console.log("\nSaliendo...");
            ejecutar = false;
            break; // Rompe el bucle while
        }

        // Evaluamos el número que ingresó el usuario
        switch (res.continuar) {
            case 1: // Si eligió 1 (Leer)
                // Verificamos primero si el archivo 'file.txt' existe en la carpeta
                if (fs.existsSync("file.txt")) {
                    // Leemos el archivo de forma SÍNCRONA para que no se mezcle con el menú
                    const data = fs.readFileSync("file.txt", 'utf-8');
                    console.log("\n--- Contenido del archivo ---");
                    console.log(data); // Imprime lo que dice el archivo
                    console.log("----------------------------");
                } else {
                    // Si el archivo no existe, avisamos al usuario
                    console.log("\n[!] El archivo file.txt aún no existe.");
                }
                break;
            case 2: // Si eligió 2 (Guardar)
                guardarDato(); // Llama a la función de alumno.js
                break;
            case 3: // Si eligió 3 (Actualizar)
                actualizar(); // Llama a la función de alumno.js
                break;
            case 4: // Si eligió 4 (Borrar)
                borrar(); // Llama a la función de alumno.js
                break;
            case 5: // Si eligió 5 (Salir)
                console.log("Ha salido de la aplicación");
                ejecutar = false; // Cambia a false para romper el bucle while
                break;
            default: // Si ingresó cualquier otro número (ej. 9)
                console.log("Este valor no existe... Digite uno válido..");
        }

    } catch (error) {
        // Bloque de seguridad: si algo falla dentro del 'try', atrapa el error aquí
        console.log("Error al ingresar el campo: " + error);
    }
}


/* 
  ESTE ARCHIVO SIRVE COMO: El "Controlador" o interfaz de usuario de la aplicación. 
  Su función es gestionar el flujo principal, mostrar el menú visual y capturar la entrada 
  del usuario mediante la librería 'prompts'. Es el cerebro que decide qué función llamar 
  dependiendo de la tecla que presione el usuario.
  CONEXIÓN: Es el punto de unión de todo. Importa las funciones de 'alumno.js' para darles 
  uso y utiliza 'fs' para leer el archivo 'file.txt' de forma rápida. Depende de que 
  'package.json' esté configurado como "type": "module" para poder realizar las importaciones.
*/