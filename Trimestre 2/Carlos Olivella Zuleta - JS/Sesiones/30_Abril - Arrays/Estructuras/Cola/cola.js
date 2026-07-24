import readline from 'readline-sync';

let lista = [];

let cab = 0;
let cola = 0;
let sigue;

do {
    let artículo =readline.question("Digite la cantidad: ");
    lista [cab] = artículo;
    cab++;
    sigue = readline.question("Desea continuar? s/n: ");
} while (sigue === "s");

console.log("La cantidad de artículos es: " + cab);
console.log("Los artículos son: " + lista);