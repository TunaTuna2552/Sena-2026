const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function leerDatos() {
    const edad = await pregunta("Escriba su edad: ")
    const nombre = await pregunta("Escriba su nombre: ")
    const dir = await pregunta ("Escriba su dirección: ")
    console.log();
    console.log("Respuestas del usuario: ");
    console.log(`Su edad es ${edad} años de edad`);
    console.log("su nombre es: "+nombre);
    console.log(`Su dirección es: ${dir}`);
    console.log();
    rl.close()
}

function pregunta(edad) {
    return new Promise(
        (resolve) => {
            rl.question(edad, (respuesta) => {
                resolve(respuesta)
            })
        }
    )
}

leerDatos()