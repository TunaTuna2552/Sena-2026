//Elaborar un programa  que pida una edades y las almacene en un vector. Luego pasar los datos del vector a la matriz
import readline from 'readline-sync'
// 1. Definir el Vector y la Matriz (vacíos inicialmente)
let vectorEdades = [];
let matrizEdades = [];

// 2. Pedir el tamaño del Vector en la variable n utilizando readline.question
let n = parseInt(readline.question("Ingrese el tamaño del vector (ej. 6 o 9): "));

// 3. Bucle 'for' para pedir las edades y guardarlas en el Vector
for (let k = 0; k < n; k++) {
    let edad = parseInt(readline.question(`Ingrese la edad para la posición ${k}: `));//el parseInt convierte el número a entero y con el readline.question, a medida que avanza el buble for, vamos ingresando las edades, estas se guardan en la varibale edad
    
    if (edad % 2 === 0) {
        vectorEdades.push(edad);//ccon vector Edades estor llamando el Array y con el .push() estoy agregando el nuevo dato dentro del Array, dentro de parentesis va el dato nuevo que voy a guardar, en este caso, una variable
    }//ccondicional para que solo los valores que son pares se guaden dentro del vector
}


// Mostrar el vector original en la consola
console.log("Vector original:", vectorEdades);

// 4. Pasar los datos del Vector a una Matriz
// Definimos que la matriz tendrá siempre 3 columnas
let columnas = 3; 
let filas = n / columnas;

let indiceVector = 0;

for (let i = 0; i < filas; i++) {
    // Creamos una nueva fila vacía dentro de la matriz
    matrizEdades[i] = []; 
    
    for (let j = 0; j < columnas; j++) {
        // Asignamos el valor actual del vector a la posición [fila][columna]
        matrizEdades[i][j] = vectorEdades[indiceVector];
        indiceVector++; // Avanzamos al siguiente elemento del vector
    }
}

// Mostrar la matriz resultante en la consola
console.log("Matriz resultante:");
console.table(matrizEdades);