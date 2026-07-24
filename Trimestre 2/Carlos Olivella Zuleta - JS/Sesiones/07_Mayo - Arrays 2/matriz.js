let k = 0
let matriz = []
for(let fila = 0; fila < 3; fila++){
    matriz[fila] = []
	for(let columna = 0; columna < 3; columna++){
		k = k + 1;
		matriz[fila][columna] = k
	}
}

console.log(matriz[0][0], matriz[1][1], matriz[2][2])