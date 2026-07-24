//Hacer un programa que lea tantos votantes como el usuario quiera.
//Por cada votante Se lee el nombre de su candidato y el género del votante.
//Se debe averiguar el total de de votos por candidato y el total de hombres y mujeres que votaron.

import readline from 'readline-sync'

let totalHombres = 0;
let totalMujeres = 0;

let votosCandidatos = {};

let continuar = true;

while (continuar) {
    let candidato = readline.question("Ingrese el nombre del candidato por el que vota: ").trim().toUpperCase();
    
    let genero = "";
    while (genero !== "H" && genero !== "M") {
        genero = readline.question("Ingrese el género del votante (H para Hombre / M para Mujer): ").trim().toUpperCase();
        if (genero !== "H" && genero !== "M") {
            alert("Por favor, ingrese una opción válida (H o M).");
        }
    }

    if (votosCandidatos[candidato]) {
        votosCandidatos[candidato]++;
    } else {
        votosCandidatos[candidato] = 1;
    }

    if (genero === "H") {
        totalHombres++;
    } else {
        totalMujeres++;
    }

    let respuesta = readline.question("¿Desea ingresar otro votante? (S para Sí / Cualquier otra tecla para Salir): ").trim().toUpperCase();
    if (respuesta !== "S") {
        continuar = false;
    }
}

console.log("------ RESULTADOS DE LA VOTACIÓN ------");

console.log("\n--- Votos por Candidato ---");
for (let candidato in votosCandidatos) {
    console.log(`Candidato: ${candidato} - Total Votos: ${votosCandidatos[candidato]}`);
}

console.log("\n--- Total de Votantes por Género ---");
console.log(`Total Hombres: ${totalHombres}`);
console.log(`Total Mujeres: ${totalMujeres}`);
console.log(`Total General de Votos: ${totalHombres + totalMujeres}`);