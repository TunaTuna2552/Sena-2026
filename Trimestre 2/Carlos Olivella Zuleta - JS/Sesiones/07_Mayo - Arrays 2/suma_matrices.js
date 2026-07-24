import readline from 'readline-sync';

let matrizA = [];
let matrizB = [];
let matrizC = [];

for(let fila = 0; fila < 3; fila++){
    matrizA[fila] = [];
    matrizB[fila] = [];
    matrizC[fila] = [];
    for(let columna = 0; columna < 3; columna++){
        console.log("Ingresa los datos de la primera matriz");
        let datosMatrizA = Number(readline.question("Digite el numero: "));
        console.log("Ingresa los datos de la segunda matriz");
        let datosMatrizB = Number(readline.question("Digite el numero: "));
        matrizA[fila][columna] = datosMatrizA;
        matrizB[fila][columna] = datosMatrizB;
        matrizC[fila][columna] = matrizA[fila][columna] + matrizB[fila][columna];
    }
}



let matrices = [matrizA, matrizB, matrizC];
let nombres = ['A', 'B', 'C'];

for (let i = 0; i < matrices.length; i++) {
    let m = matrices[i]; // La matriz actual
    console.log("========================================================================");
    console.log("Datos de la matriz " + nombres[i] + ": ");
    console.log("========================================================================");
    
    // Imprime cada fila como en tu segundo código
    for (let f = 0; f <= 2; f++) {
        console.log(m[f][0], m[f][1], m[f][2]);
    }

    // Calcula la suma de la matriz actual
    let suma = m[0][0] + m[0][1] + m[0][2] + m[1][0] + m[1][1] + m[1][2] + m[2][0] + m[2][1] + m[2][2];
    console.log('La suma de los datos en la matriz ' + nombres[i] + ' es: ' + suma);
}








/*
console.log("========================================================================");
console.log("Datos de la matriz A: ");
console.log("========================================================================");
console.log(matrizA[0][0],matrizA[0][1],matrizA[0][2]);
console.log(matrizA[1][0],matrizA[1][1],matrizA[1][2]);
console.log(matrizA[2][0],matrizA[2][1],matrizA[2][2]);
console.log('La suma de los datos en la matriz A es: ' + (matrizA[0][0] + matrizA[0][1] + matrizA[0][2] + matrizA[1][0] + matrizA[1][1] + matrizA[1][2] + matrizA[2][0] + matrizA[2][1] + matrizA[2][2]));

console.log("========================================================================");
console.log("Datos de la matriz B: ");
console.log("========================================================================");
console.log(matrizB[0][0],matrizB[0][1],matrizB[0][2]);
console.log(matrizB[1][0],matrizB[1][1],matrizB[1][2]);
console.log(matrizB[2][0],matrizB[2][1],matrizB[2][2]);
console.log('La suma de los datos en la matriz B es: ' + (matrizB[0][0] + matrizB[0][1] + matrizB[0][2] + matrizB[1][0] + matrizB[1][1] + matrizB[1][2] + matrizB[2][0] + matrizB[2][1] + matrizB[2][2]));

console.log("========================================================================");
console.log("Datos de la matriz C: ");
console.log("========================================================================");
console.log(matrizC[0][0],matrizC[0][1],matrizC[0][2]);
console.log(matrizC[1][0],matrizC[1][1],matrizC[1][2]);
console.log(matrizC[2][0],matrizC[2][1],matrizC[2][2]);
console.log('La suma de los datos en la matriz C es: ' + (matrizC[0][0] + matrizC[0][1] + matrizC[0][2] + matrizC[1][0] + matrizC[1][1] + matrizC[1][2] + matrizC[2][0] + matrizC[2][1] + matrizC[2][2]));
console.log("========================================================================");
*/