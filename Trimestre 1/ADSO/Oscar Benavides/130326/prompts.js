const prompts = require('prompts');

async function capturarDatos() {
    const preguntas = [ 
        {
            type: "text",
            name: "Nombre",
            message: "Escriba su mensaje"
        },
        {
            type: "number",
            name: "edad",
            message: "Digite su edad",
            validate: value => value < 0 ? "Ese valor no es válido": true
        }
    ]
    try {
        const resp = await prompts(preguntas)
        console.log("El nombre digitado es: " + resp.Nombre);
    }catch(Error)
    {
        console.log("Error de aplicación" + Error);
    }
}

capturarDatos()