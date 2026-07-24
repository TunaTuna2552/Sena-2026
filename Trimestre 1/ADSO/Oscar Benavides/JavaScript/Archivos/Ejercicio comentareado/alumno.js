// Importamos el módulo 'fs' (File System) de Node.js para manejar archivos (leer/escribir)
import * as fs from "fs"; 

// Definición de la función 'mostrarAlumno'
function mostrarAlumno() {
    // Declaramos una variable local con un mensaje de texto
    var alumno = "El alumno es visualizado";
    // Imprimimos el mensaje en la consola
    console.log(alumno);
}

// Función simple para simular la acción de guardar (solo imprime un mensaje)
function guardar() {
    console.log("El alumno ha sido guardado");
}

// Función simple para simular la actualización
function actualizar() {
    console.log("El alumno ha sido actualizado");
}

// Función simple para simular el borrado
function borrar() {
    console.log("El alumno ha sido borrado");
}

// Función principal para crear un archivo físico con datos
function guardarDato() {
    // Variable con un texto genérico
    let contenido = "Linea de ejemplo para guardar";
    
    // Creamos un objeto 'empleado' con formato clave:valor (JSON)
    let empleado = {
        "nombre": "Pedro Perez",
        "mail": "nada@nada.com",
        "cargo": "Gerente"
    };

    // Concatenamos el contenido inicial con el nombre del objeto empleado
    // \n significa "salto de línea" (como presionar Enter)
    let info = contenido + "\n" + empleado.nombre;

    // Usamos el método 'writeFile' de fs para crear el archivo
    fs.writeFile(
        "file.txt",   // Nombre del archivo a crear o sobrescribir
        info,         // El contenido de texto que vamos a meter dentro
        { flag: 'w' }, // Opción 'w' (write): si existe, lo borra y escribe de nuevo
        (err) => {    // Función 'callback' que se ejecuta cuando termina el proceso
            if (err) {
                // Si hubo un error (permisos, disco lleno, etc.), lo muestra
                console.log("Error al escribir el archivo: " + err);
            } else {
                // Si no hay error, confirma el éxito en consola
                console.log("\n[OK] Archivo creado/actualizado satisfactoriamente");
            }
        }
    );
}

// Exportamos las funciones para que 'menu.js' pueda importarlas y usarlas
export { mostrarAlumno, actualizar, borrar, guardarDato };


/* 
  ESTE ARCHIVO SIRVE COMO: El módulo de lógica de negocio o "Modelo". 
  Su función es definir todas las acciones específicas que se pueden realizar con un "Alumno" 
  (mostrar, guardar, actualizar, borrar). No decide CUÁNDO se ejecutan las cosas, solo CÓMO se hacen.
  CONEXIÓN: Se conecta con 'menu.js' a través de la sentencia 'export'. 'menu.js' importa estas 
  funciones para ejecutarlas cuando el usuario elige una opción. También interactúa directamente 
  con 'file.txt' usando el módulo 'fs' para persistir la información en el disco duro.
*/