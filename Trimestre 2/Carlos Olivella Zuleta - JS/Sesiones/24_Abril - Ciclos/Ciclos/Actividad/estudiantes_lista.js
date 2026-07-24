//Realiza un programa que lea los nombres, genero y notas de tantos estudiantes como el usuario quiera.
//Se debe tener un informe de: 
//Cuantos aprobaron
//Cuantos reprobaron
//Cuantos hombres aprovaron
//Cuantes mujeres aprovaron

/* 

hacer un import de prompts para que el usuario pueda poner la cantidad de estudiantes que desee ver

primero se me ocurre crear un diccionario  o un vector  en donde ponga los datos de los estudiantes e investigar como implememtar un ciclo while para imprimir los datos de la cantidad de 
estuddiantes que el usuario desee ver o algo así

crear otro ciclo que imprima un informe de 
//Cuantos aprobaron
//Cuantos reprobaron
//Cuantos hombres aprovaron
//Cuantes mujeres aprovaron

*/

import prompts from "prompts";

(async () => {
    const response = await prompts({
        type: "number",
        name: "cantidad",
        message: "De cuántos estudiantes desea crear el informe de aprovación?"
    })

    const cantidad = response.cantidad;

    let estudiantes = {
        1: { nombre: "Ana García", genero: "Femenino", nota: 4.5 },
        2: { nombre: "Luis Pérez", genero: "Masculino", nota: 3.2 },
        3: { nombre: "María López", genero: "Femenino", nota: 5.0 },
        4: { nombre: "Carlos Ruiz", genero: "Masculino", nota: 2.8 },
        5: { nombre: "Elena Sanz", genero: "Femenino", nota: 4.1 },
        6: { nombre: "Javier Ortiz", genero: "Masculino", nota: 3.9 },
        7: { nombre: "Sofía Castro", genero: "Femenino", nota: 4.7 },
        8: { nombre: "Diego Torres", genero: "Masculino", nota: 2.5 },
        9: { nombre: "Lucía Méndez", genero: "Femenino", nota: 3.8 },
        10: { nombre: "Andrés Villa", genero: "Masculino", nota: 4.2 },
        11: { nombre: "Carmen Luna", genero: "Femenino", nota: 3.1 },
        12: { nombre: "Pablo Ríos", genero: "Masculino", nota: 4.8 },
        13: { nombre: "Isabel Mora", genero: "Femenino", nota: 2.9 },
        14: { nombre: "Hugo León", genero: "Masculino", nota: 3.5 },
        15: { nombre: "Valeria Paz", genero: "Femenino", nota: 4.4 },
        16: { nombre: "Jorge Soler", genero: "Masculino", nota: 1.8 },
        17: { nombre: "Marta Gil", genero: "Femenino", nota: 4.0 },
        18: { nombre: "Raúl Cano", genero: "Masculino", nota: 3.7 },
        19: { nombre: "Paula Bajo", genero: "Femenino", nota: 4.9 },
        20: { nombre: "Marcos Polo", genero: "Masculino", nota: 2.2 },
        21: { nombre: "Julia Domenech", genero: "Femenino", nota: 3.4 },
        22: { nombre: "Ricardo Tormo", genero: "Masculino", nota: 4.6 },
        23: { nombre: "Beatriz Rico", genero: "Femenino", nota: 3.3 },
        24: { nombre: "Fernando Rey", genero: "Masculino", nota: 1.5 },
        25: { nombre: "Sara Carbonero", genero: "Femenino", nota: 4.3 },
        26: { nombre: "Roberto Álamo", genero: "Masculino", nota: 3.6 },
        27: { nombre: "Inés Arrimadas", genero: "Femenino", nota: 2.7 },
        28: { nombre: "Mateo Bravo", genero: "Masculino", nota: 4.1 },
        29: { nombre: "Clara Lago", genero: "Femenino", nota: 3.0 },
        30: { nombre: "Adrián Lastra", genero: "Masculino", nota: 4.4 },
        31: { nombre: "Gloria Fuertes", genero: "Femenino", nota: 5.0 },
        32: { nombre: "Víctor Manuel", genero: "Masculino", nota: 2.1 },
        33: { nombre: "Alicia Keys", genero: "Femenino", nota: 4.7 },
        34: { nombre: "Sergio Ramos", genero: "Masculino", nota: 3.5 },
        35: { nombre: "Natalia Oreiro", genero: "Femenino", nota: 4.2 },
        36: { nombre: "Iván Ferreiro", genero: "Masculino", nota: 1.9 },
        37: { nombre: "Rosa López", genero: "Femenino", nota: 3.8 },
        38: { nombre: "Oscar Jaenada", genero: "Masculino", nota: 2.6 },
        39: { nombre: "Irene Villa", genero: "Femenino", nota: 4.5 },
        40: { nombre: "Santi Millán", genero: "Masculino", nota: 3.3 },
        41: { nombre: "Nuria Roca", genero: "Femenino", nota: 4.0 },
        42: { nombre: "Dani Martín", genero: "Masculino", nota: 3.1 },
        43: { nombre: "Lola Índigo", genero: "Femenino", nota: 4.9 },
        44: { nombre: "Paco León", genero: "Masculino", nota: 2.4 },
        45: { nombre: "Esther Expósito", genero: "Femenino", nota: 4.6 },
        46: { nombre: "Mario Casas", genero: "Masculino", nota: 3.7 },
        47: { nombre: "Úrsula Corberó", genero: "Femenino", nota: 4.3 },
        48: { nombre: "Miguel Herrán", genero: "Masculino", nota: 3.2 },
        49: { nombre: "Alba Flores", genero: "Femenino", nota: 4.8 },
        50: { nombre: "Jaime Lorente", genero: "Masculino", nota: 2.9 }
    };

    console.log("=====================================================================================================================");
    console.log("Informe de los estudiantes del 1 al " + cantidad + " que aprobaron o desaprobaron ");
    console.log("=====================================================================================================================");

    let k = 1;
    let n = 1;

    console.log("Lista de estudiantes aprobados ======================================================================================");

    do {
        if (estudiantes[k].nota >= 3.0) {
            console.log(estudiantes[k]);
        }
        k++;
    } while (k <= cantidad);

    console.log("")
    console.log("Lista de estudiantes desaprobados ==================================================================================");
    do {
        if (estudiantes[n].nota <= 2.9) {
            console.log(estudiantes[n]);
        }
        n++;
    } while (n <= cantidad);

    console.log("=====================================================================================================================");
    console.log("Informe de los estudiantes del 1 al " + cantidad + " que aprobaron o desaprobaron ordenados según su género");
    console.log("=====================================================================================================================");

})
    ();


/*
        for (k=1; k<=cantidad; k++){
            if (estudiantes[k].nota >= 3.0){

            } else {

            }
        }
            */


/*
                console.log("Lista de estudiantes aprovados ==================================");
                console.log(estudiantes[k])
                */
/*
                console.log("")
                console.log("Lista de estudiantes desaprovados ===============================")
                console.log(estudiantes[k])
                */