
//fs.openFile("file.txt","r","utf-8",()=>{})
//Lo que va después de la coma se llama flag y es lo que me indica para que quiero abrir el archivo
//"r" Read
//"w" Write - Busca el archivo y si no lo encuentra, lo crea. Si el archivo existe, lo borra y lo crea con la información nueva
//"a" append - Si busca el archivo y no lo encuentra bota error, si lo encuentra,adiciona información
//Entre estos 3 hay diversas combinaciones
//"r+" = rw
//"w+" = Busca el archivo, si no existe lo crea, y si existe, adiciona la información
//"a+" = Adicionar y escribir 

//promise es una funcion asyn que lleva un nombre y que retorna 3 valores: pending, reject y resolve 

/*async function nombre() {

}

await nombre().then(/*Se ejecuta una función)//Cuando sale bien o lo acepta
.catch(/*Se ejecuta una función)//Cuando hay error
.finally()//Se ejecuta si o si, independientemente del resolve o del reject
*/
// Comentario de referencia sobre fs.open (explicación de modos de apertura):
// El "flag" indica la intención: "r" (leer), "w" (escribir/sobrescribir), "a" (añadir).
// Combinaciones como "w+" permiten leer y escribir creando el archivo si no existe.

// Explicación de Promesas: Una promesa es un objeto que representa el éxito o fracaso de una tarea asíncrona.
// Estados: Pending (pendiente), Resolved (completado), Rejected (fallido).

// Importamos la versión de 'fs' que soporta Promesas para poder usar async/await
import * as fs from 'fs/promises';

// Definimos una función asíncrona (async) para manejar tareas que toman tiempo
async function example() {
    try {
        // 'await' pausa la ejecución hasta que la lectura del archivo termine.
        // No necesita callback (err, data) porque el resultado se guarda directamente en la constante.
        const data = await fs.readFile(
            'file.txt', // Nombre del archivo
            'utf8'      // Codificación para obtener texto y no binarios (Buffer)
        );

        // Si la lectura es exitosa, se ejecuta esta línea
        console.log("Contenido del archivo:");
        console.log(data);

    } catch (err) {
        // Si la promesa falla (ej. el archivo no existe), el error cae aquí (equivalente al .catch)
        console.log("Error detectado:", err.message);
    } finally {
        // Este bloque se ejecuta siempre, haya error o no (ideal para cerrar conexiones)
        console.log("Proceso de lectura finalizado.");
    }
}

// Llamamos a la función para que se ejecute
example();

/* 
  ESTE ARCHIVO SIRVE COMO: Un ejemplo educativo y práctico de programación asíncrona moderna. 
  Su función es demostrar cómo leer archivos utilizando 'Promises' y la estructura 'async/await', 
  que es más limpia y fácil de leer que los callbacks tradicionales.
  CONEXIÓN: Se conecta conceptualmente con los otros archivos al manipular el mismo recurso 
  ('file.txt'), pero utiliza una metodología de código superior (asíncrona) que evita el "callback hell". 
  Es la forma recomendada de manejar archivos en aplicaciones profesionales de Node.js.
*/