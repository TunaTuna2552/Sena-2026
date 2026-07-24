//Hacer un programa con un menú que tenga las siguientes opciones:
//1. Lenar lista 1
//2. Llenar lista 2
//3. suma de los datos en lista 3
//4. Imprimir resultado
//5. Terminar

import readline from 'readline-sync';

class Nodo {
  constructor(valor) {
    this.valor = Number(valor); 
    this.siguiente = null; 
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null; 
  }

  agregar(valor) {
    const nuevoNodo = new Nodo(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      return;
    }

    let actual = this.cabeza;
    while (actual.siguiente) {
      actual = actual.siguiente;
    }

    actual.siguiente = nuevoNodo;
  }

  imprimir() {
    if (!this.cabeza) {
      console.log("La lista está vacía.");
      return;
    }
    
    let valores = [];
    let actual = this.cabeza;
    
    while (actual) {
      valores.push(actual.valor);
      actual = actual.siguiente;
    }
    
    console.log(valores.join(" -> "));
  }

  static sumarListas(lista1, lista2) {
    const listaResultado = new ListaEnlazada();
    let actual1 = lista1.cabeza;
    let actual2 = lista2.cabeza;

    while (actual1 || actual2) {
      let val1 = actual1 ? actual1.valor : 0; // Si no hay nodo, suma 0
      let val2 = actual2 ? actual2.valor : 0;

      listaResultado.agregar(val1 + val2);

      if (actual1) actual1 = actual1.siguiente;
      if (actual2) actual2 = actual2.siguiente;
    }

    return listaResultado;
  }
}

let lista1 = new ListaEnlazada();
let lista2 = new ListaEnlazada();
let lista3 = new ListaEnlazada();

let opcion;

do {
  console.log("\n--- MENÚ DE LISTAS ENLAZADAS ---");
  console.log("1. Llenar lista 1");
  console.log("2. Llenar lista 2");
  console.log("3. Sumar datos en lista 3");
  console.log("4. Imprimir resultado");
  console.log("5. Terminar");
  
  opcion = readline.question("Selecciona una opcion (1-5): ");

  switch (opcion) {
    case '1':
      let val1 = readline.question("Ingresa un numero para la Lista 1: ");
      lista1.agregar(val1);
      console.log("¡Valor agregado a la Lista 1!");
      break;

    case '2':
      let val2 = readline.question("Ingresa un numero para la Lista 2: ");
      lista2.agregar(val2);
      console.log("¡Valor agregado a la Lista 2!");
      break;

    case '3':
      if (!lista1.cabeza && !lista2.cabeza) {
        console.log("Error: Ambas listas están vacías. No hay nada que sumar.");
      } else {
        lista3 = ListaEnlazada.sumarListas(lista1, lista2);
        console.log("¡Suma realizada con éxito en la Lista 3!");
      }
      break;

    case '4':
      console.log("\n--- RESULTADOS ---");
      console.log("Lista 1: "); lista1.imprimir();
      console.log("Lista 2: "); lista2.imprimir();
      console.log("Lista 3 (Suma): "); lista3.imprimir();
      break;

    case '5':
      console.log("Saliendo del programa... ¡Hasta luego!");
      break;

    default:
      console.log("Opción no válida. Por favor, intenta de nuevo.");
      break;
  }

} while (opcion !== '5');