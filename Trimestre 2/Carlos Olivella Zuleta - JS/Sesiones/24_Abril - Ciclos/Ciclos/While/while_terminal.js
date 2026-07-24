import prompts from 'prompts';

(async () => {
    const response = await prompts(
        [
        {
            type: 'number',
            name: 'n',
            message: 'Introduce el numero para repetir en bucle:'
        }
        ]
    );

    const n = response.n;
    let suma = 0;

    while (suma < n){  //suma es menor que n? Si es así suma = suma + 1
            suma = n + 1;
            console.log('-------------------------------------------------');
            console.log(suma)
            console.log('-------------------------------------------------');
    }
})
();