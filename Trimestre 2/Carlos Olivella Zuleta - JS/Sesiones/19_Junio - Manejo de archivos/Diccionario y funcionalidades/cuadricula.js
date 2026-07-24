let n = 7;
let k = 1;
let f = 0;
let c = parseInt(n / 2);

let matriz = new Array(n);
for (let i = 0; i < n; i++) {
    matriz[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        matriz[i][j] = 0; 
    }
}

while (k <= (n * n)) {
    matriz[f][c] = k; 
    
    let f_ant = f; //anterior
    let c_ant = c;

    k = k + 1;
    f = f - 1; 
    c = c + 1; s

    if (f < 0 && c >= n) {
        f = f_ant + 1;
        c = c_ant;
    } else {
        if (f < 0) {
            f = n - 1;
        }
        if (c >= n) {
            c = 0;
        }
    }

    if (k <= n * n) { 
        if (matriz[f][c] != 0) {
            f = f_ant + 1;
            c = c_ant;
        }
    }
}

console.table(matriz);

