import readline from 'readline-sync';

let matriz = [];

for(let fila = 0; fila < 3; fila++){

    matriz[fila] = [];

    for(let columna = 0; columna < 3; columna++){
        let n = parseInt(readline.question("Digite el numero: "));
        matriz[fila][columna] = n;
    }
}

console.log(matriz[0][0],matriz[1][1],matriz[2][2]);