//Ingresar dos números por teclado y que con esos dos número el primero sea la fecha de nacimiento y el segundo se la fecha actual y que diga la edad que tiene

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function leerDatos() {
    const nacimiento = await pregunta("Escriba su fecha de nacimiento: ")
    const actual = await pregunta("Escriba la fecha actual: ")
    console.log("Respuestas del usuario: ");
    console.log("Su edad será: "+edad);
    console.log();
    rl.close()
}

function pregunta(fecha) {
    return new Promise(
        (resolve) => {
            rl.question(fecha, (respuesta) => {
                resolve(respuesta)
            })
        }
    )
}

leerDatos()