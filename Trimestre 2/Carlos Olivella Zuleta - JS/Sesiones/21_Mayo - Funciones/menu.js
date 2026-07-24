
import readline from 'readline-sync'

function potencia() {
    console.log("=======================================================================");
    let base = parseFloat(readline.question("Digite cuál será la base: "));
    let exponente = parseFloat(readline.question("Digite el valor del exponente: "));
    console.log("=======================================================================");
    let resultado = base ** exponente
    console.log("El resultado es " + resultado);
}

function producto() {
    console.log("=======================================================================");
    let base = parseFloat(readline.question("Digite cuál será la el multiplicando: "));
    let exponente = parseFloat(readline.question("Digite el valor del multiplicador: "));
    console.log("=======================================================================");
    let resultado = base * exponente
    console.log("El resultado es " + resultado);
}

function fecha() {
    let fecha = new Date();
    console.log("=======================================================================");
    console.log("La fecha actual es: " + fecha.toLocaleDateString());
}

let opcion;

function menu() {
    do {
        console.log("=======================================================================");
        console.log("Lista de opciones");
        console.log("=======================================================================");
        console.log("1. Potencia \n");
        console.log("2. Producto \n");
        console.log("3. Fecha \n");
        console.log("9. Terminar");
        console.log("=======================================================================");

        opcion = Number(readline.question("Digite una de las opciones: "))

        switch (opcion) {
            case 1:
                potencia();
                break;

            case 2:
                producto();
                break

            case 3:
                fecha();
                break

            case 9:
                console.log("Saliendo del programa... ¡Adiós!");
                break;

            default:
                break;
        }
    }
    while (opcion !== 9);
}

menu();
