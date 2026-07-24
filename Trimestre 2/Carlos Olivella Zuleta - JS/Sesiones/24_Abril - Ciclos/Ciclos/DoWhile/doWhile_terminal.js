import prompts from 'prompts';

(async () => {
    const response = await prompts({
        type: 'number',
        name: 'n',
        message: '¿A qué número le quieres hallar el factorial?'
    });

    const n = response.n;
    let factorial = 1;
    let k = 1;

    do {
        factorial *= k;
        k++;
    } while (k <= n);

    console.log('-------------------------------------------------');
    console.log('El factorial de ' + n + ' es ' + factorial);
    console.log('-------------------------------------------------');
})();
