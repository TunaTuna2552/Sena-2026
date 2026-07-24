//Leer los 3 lados de un triàngulo y averiguar si el triàngulo es equilatero, isosceles o escaleno
import prompts from 'prompts';

(async () => {
  const response = await prompts(
    [
      {
        type: 'number',
        name: 'L1',
        message: 'Introduce el valor del lado 1:'
      },
      {
        type: 'number',
        name: 'L2',
        message: 'Introduce el valor del lado 2:'
      },
      {
        type: 'number',
        name: 'L3',
        message: 'Introduce el valor del lado 3:'
      }
    ]
  );

  const {L1, L2, L3} = response;

  if (L1 == L2) {
    if (L1 == L3) {
      console.log("El triángulo es equilátero");
    } else {
      console.log("El triángulo es isósceles");
    }
  } else {
    if (L1 == L3) {
      console.log("El triángulo es isósceles");
    } else {
      if (L2 == L3) {
        console.log("El triángulo es isósceles");
      } else {
        console.log("El triángulo es escaleno");
      }
    }
  }
})
();