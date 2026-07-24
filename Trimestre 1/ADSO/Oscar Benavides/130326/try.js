const readline = require('readline/promises');

const rl = readline.createInterface(
    {
    input: process.stdin,
    output: process.stdout
}
);

async function capturarDatos() {
    try {

    const datos ={};

    datos.nombre = await rl.question("Digite su nombre: ")
    datos.edad = await rl.question("Digite su edad: ")

    console.log("Su nombre es: "+datos.nombre);


    } catch (error) {
        console.error('Error'+error);
    }finally{
        rl.close()
    }
}

capturarDatos()
//validar()