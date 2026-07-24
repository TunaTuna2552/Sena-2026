import readline from 'readline-sync'

let k;

function ingresarExpresion(){
    do {
        k = readline.question('Ingrese una expresión aritmética: ');
        k++;
    } while (k !== "e")
}

function convertir(){
    
}

function operar(){

}

export {
    ingresarExpresion,
    convertir,
    operar
}