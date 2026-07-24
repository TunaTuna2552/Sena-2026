// Importamos todas las funcionalidades del módulo nativo 'fs' (File System) de Node.js
// Se usa la sintaxis moderna 'import' para poder trabajar con archivos del sistema
import * as fs from "fs"

// Llamamos al método 'readFile' para leer el contenido del archivo de texto
fs.readFile(
    "file.txt",    // Primer argumento: La ruta o nombre del archivo que queremos abrir
    'utf-8',       // Segundo argumento: La codificación para que el contenido se lea como texto legible
    (err, data) => { // Tercer argumento: Una función 'callback' que se ejecuta al terminar la lectura
        
        // Verificamos si ocurrió algún error durante la lectura (ej. el archivo no existe)
        if (err) {
            // Si hay error, lo imprimimos junto con un mensaje descriptivo
            console.log(err + "Error al leer el archivo");
        } else {
            // Si la lectura es exitosa, imprimos el contenido del archivo ('data') en la consola
            console.log(data);
        }
    }
);

/* 
  ESTE ARCHIVO SIRVE COMO: Un script de utilidad independiente para la lectura de datos. 
  Su función específica es realizar una prueba de lectura rápida sobre el archivo 'file.txt' 
  para verificar que los datos guardados por otros módulos sean correctos y accesibles.
  CONEXIÓN: Se conecta indirectamente con 'alumno.js' y 'menu.js', ya que todos comparten 
  el mismo archivo de destino ('file.txt'). Mientras 'alumno.js' escribe la información, 
  este archivo se encarga exclusivamente de recuperarla y mostrarla, funcionando como 
  una herramienta de depuración o consulta simple.
*/
