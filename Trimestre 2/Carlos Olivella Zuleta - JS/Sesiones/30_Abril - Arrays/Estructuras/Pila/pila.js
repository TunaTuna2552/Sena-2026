import prompts from "prompts";

let pila = [];
let cabeza = 0;


(async () => {
let edades = 0;
let continuar;
let si = 's';

    do {
        const response = await prompts([
            {
                type: 'number',
                name: 'edad',
                message: 'Ingrese la edad de los estudiantes'
            },
            {
            type: 'text',
            name: 'continua',
            message: 'Si desea continuar ingrese "s", si no ingrese "n"'
            }
        ]);

        continuar = response.continua;

        pila[cabeza] = response.edad;
        cabeza++;
    } while (si === continuar);

    for (let k = cabeza - 1; k >= 0; k--) {
        console.log(pila[k]);
    }
})();


