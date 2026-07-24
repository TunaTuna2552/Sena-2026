//Elaborar un programa que lea los datos de tantos empleados como el usuarios quiera. 
//Por cada empleado se debe pedir el nombre, cédula, salario base y área.
//Se debe calcular el salario neto.

/*
Si el área es "A" de administración, se le debe adicionar un 4% al salario base

Si el área es "P" de producción, se le debe adicionar un 5% al salario base.

Si e área el "V" de ventas, se le debe adicionar un 6% al salario base.

Si el área es "S" de sistemas, se le debe adicionar un 7% al salario base.
*/

//Al final se debe mostrar el total de salarios por area.

import readline from 'readline-sync'

let nombre;
let cedula;
let salario_base;
let area;

function administracion(){
    salario = salario_base * 0.04;
    console.log("====================================================================================================");
    console.log(`El salario neto del empleado ${nombre} es ${salario}`);
    console.log("====================================================================================================");
}

function produccion(){
    salario = salario_base * 0.05;
    console.log("====================================================================================================");
    console.log(`El salario neto del empleado ${nombre} es ${salario}`);
    console.log("====================================================================================================");
}

function ventas(){
    salario = salario_base * 0.06;
    console.log("====================================================================================================");
    console.log(`El salario neto del empleado ${nombre} es ${salario}`);
    console.log("====================================================================================================");
}

function sistemas(){
    salario = salario_base * 0.07;
    console.log("====================================================================================================");
    console.log(`El salario neto del empleado ${nombre} es ${salario}`);
    console.log("====================================================================================================");
}

function totalPorArea(){

}

function datos() {
    do {

        nombre = readline.question("Digite el nombre del empleado: ");
        cedula = readline.questionInt("Digite la cédula del empleado: ");
        salario_base = readline.questionFloat("Digite el salario base del empleado: ");

        console.log("==================================================");

        console.log("A. Administración");
        console.log("P. Producción");
        console.log("V. Ventas");
        console.log("S. Sistemas");
        console.log("9. Salir");

        console.log("Seleccione el area donde el empleado trabaja");

        switch (area) {
            case A:
                administracion();
                break;

            case P:
                produccion();
                break;

            case V:
                ventas();
                break;

            case S:
                sistemas();
                break;

            case 9:
                console.log("Saliendo del programa... ¡Adiós!");
                break;

            default:
                break;
        }
    }
    while (area !== 9);
}

datos();