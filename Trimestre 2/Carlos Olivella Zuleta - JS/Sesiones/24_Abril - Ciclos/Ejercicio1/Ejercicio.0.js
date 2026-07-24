//Leer un nùmero entero y averiguar si es par o impar
import prompts from 'prompts';

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'numero',
    message: 'Introduce un número:'
  });

  const numero = response.numero;

  if (numero % 2 === 0) {
    console.log(`${numero} es un número par`);
  } else {
    console.log(`${numero} es un número impar`);
  }
})();
