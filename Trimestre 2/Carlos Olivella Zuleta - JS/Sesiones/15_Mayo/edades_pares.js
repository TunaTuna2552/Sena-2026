import readline from 'readline-sync'
let vectorEdades = [];
let matrizEdades = [];

let n = parseInt(readline.question("Ingrese el tamaño del vector (ej. 6 o 9): "));

for (let k = 0; k < n; k++) {
    let edad = parseInt(readline.question(`Ingrese la edad para la posición ${k}: `));
    
    if (edad % 2 === 0) {
        vectorEdades.push(edad);
    }
}


console.log("Vector original:", vectorEdades);

let columnas = 3; 
let filas = n / columnas;

let indiceVector = 0;

for (let i = 0; i < filas; i++) {
    matrizEdades[i] = []; 
    
    for (let j = 0; j < columnas; j++) {
        matrizEdades[i][j] = vectorEdades[indiceVector];
        indiceVector++;
    }
}

console.log("Matriz resultante:");
console.table(matrizEdades);