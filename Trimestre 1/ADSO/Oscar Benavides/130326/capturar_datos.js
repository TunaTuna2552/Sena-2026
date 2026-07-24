const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Escribe un número: ', (answer) => {
    console.log("El número es: " , answer);
    rl.close()
})