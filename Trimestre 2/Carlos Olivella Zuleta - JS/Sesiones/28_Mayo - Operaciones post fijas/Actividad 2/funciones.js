import readline from 'readline-sync';

let salariosOriginales = [];
let salariosMayores = [];

function ingresarSalarios() {
    salariosOriginales = []; 
    while (true) {
        let entrada = readline.question("Ingrese un salario: ").toLowerCase().trim();
        if (entrada === 'fin') break;
        
        let salario = Number(entrada);
        if (salario > 0) {
            salariosOriginales.push(salario);
        } else {
            console.log("Ingrese un número válido.");
        }
    }
}

function filtrarSalarios() {
    if (salariosOriginales.length === 0) return;
    salariosMayores = salariosOriginales.filter(s => s > 5000000);
}

function mostrarVectores() {
    console.log("\n🔹 Vector Original:");
    salariosOriginales.length ? console.table(salariosOriginales) : console.log("[Vacío]");

    console.log("\n🔹 Salarios > 5 Millones:");
    salariosMayores.length ? console.table(salariosMayores) : console.log("[Vacío]");
}

export { ingresarSalarios, filtrarSalarios, mostrarVectores };