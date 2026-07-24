import prompts from 'prompts';

(async () => {
  const response = await prompts(
    [
      {
        type: 'number',
        name: 'n1',
        message: 'Introduce el numero para repetir en bucle:'
      },
      {
        type: 'number',
        name: 'n2',
        message: 'Introduce hasta qué numero se repite el bucle:'
      },
      {
        type: 'number',
        name: 'n3',
        message: 'Introduce número al que le quieres hallar el factorial:'
      }
    ]
  );

  const {n1, n2, n3} = response;

let suma = 0;

for (let k=1; k<=n2; k++){
    suma = n1 + k;
}
    console.log('-------------------------------------------------');
    console.log('-------------------------------------------------');
    console.log('La suma de ' + n1 + ' hasta ' + n2 + ' es ' + suma)

let factorial = 1;
for (let i= 1; i<=n3; i++){
    factorial = factorial * i;
}
    console.log('El factorial de ' + n3 + ' es ' + factorial)
    console.log('-------------------------------------------------');
    console.log('-------------------------------------------------');

})
();