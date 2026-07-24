import readline from 'readline-sync';

let expresionOriginal = "";
let expresionPostfija = [];

const jerarquia = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "**": 3
};

function ingresarExpresion() {
    console.log("\n--- Ingresar Expresión ---");
    expresionOriginal = readline.question('Ingrese una expresion aritmetica (ej: 3 + 5 * 2): ');
    console.log(`Expresión guardada con éxito: ${expresionOriginal}`);
}

function convertir() {
    if (!expresionOriginal) {
        console.log("\n Primero debes ingresar una expresión en la opción 1.");
        return;
    }

    console.log("\n--- Convirtiendo a Postfija ---");
    
    // Separamos la expresión por espacios para identificar números de múltiples dígitos y operadores fácilmente
    let tokens = expresionOriginal.trim().split(/\s+/);
    let pilaSignos = [];
    expresionPostfija = [];

    for (let token of tokens) {
        // Si es un número, va directo a la salida postfija
        if (!isNaN(token)) {
            expresionPostfija.push(Number(token));
        } 
        // Si es un operador válido
        else if (jerarquia[token] !== undefined) {
            while (
                pilaSignos.length > 0 && 
                jerarquia[pilaSignos[pilaSignos.length - 1]] >= jerarquia[token]
            ) {
                expresionPostfija.push(pilaSignos.pop());
            }
            pilaSignos.push(token);
        } else {
            console.log(` Token no reconocido ignorado: ${token}`);
        }
    }

    // Vaciar los operadores restantes de la pila a la salida
    while (pilaSignos.length > 0) {
        expresionPostfija.push(pilaSignos.pop());
    }

    console.log(`Expresión en Postfija: ${expresionPostfija.join(" ")}`);
}

function operar() {
    if (expresionPostfija.length === 0) {
        console.log("\n Primero debes convertir la expresión en la opción 2.");
        return;
    }

    console.log("\n--- Calculando Operación ---");
    let pilaCalculo = [];

    for (let token of expresionPostfija) {
        // Si es un número, se apila
        if (typeof token === 'number') {
            pilaCalculo.push(token);
        } 
        // Si es un operador, se desapilan los dos últimos números y se opera
        else {
            let b = pilaCalculo.pop();
            let a = pilaCalculo.pop();

            if (a === undefined || b === undefined) {
                console.log(" Error: Expresión mal formada.");
                return;
            }

            let res;
            switch (token) {
                case "+": res = a + b; break;
                case "-": res = a - b; break;
                case "*": res = a * b; break;
                case "/": res = a / b; break;
                case "**": res = a ** b; break;
                default: res = 0;
            }
            pilaCalculo.push(res);
        }
    }

    if (pilaCalculo.length === 1) {
        console.log(`El resultado final es: ${pilaCalculo[0]}`);
    } else {
        console.log("Error: La expresión no se pudo evaluar correctamente.");
    }
}

export {
    ingresarExpresion,
    convertir,
    operar
};