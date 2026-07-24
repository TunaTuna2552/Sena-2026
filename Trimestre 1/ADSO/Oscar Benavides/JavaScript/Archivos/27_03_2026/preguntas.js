function preguntar () {
    let preguntas = [
        {
        type: "text",
        name: "nombre",
        message: "Digite su nombre"
        },
        {
        type: "text",
        name: "correo",
        message: "Digite su correo"
        },
        {
        type: "text",
        name: "cargo",
        message: "Digite su cargo"
        }
    ];
    return preguntas;
}

export { preguntar };