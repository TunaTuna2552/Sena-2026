import readline from 'readline-sync'

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null; 
  }
}

// Clase para la lista enlazada
class ListaEnlazada {
  constructor() {
    this.cabeza = null; 
  }

  // Método para agregar un nuevo nodo al final de la lista
  agregar(valor) {
    const nuevoNodo = new Nodo(valor);

    // Si la lista está vacía, el nuevo nodo es la cabeza
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      return;
    }

    // Si no está vacía, recorremos hasta llegar al último nodo
    let actual = this.cabeza;
    while (actual.siguiente) {
      actual = actual.siguiente;
    }

    // Enlazamos el último nodo con el nuevo
    actual.siguiente = nuevoNodo;
  }

  // Método para imprimir los valores de la lista
  imprimir() {
    let valores = [];
    let actual = this.cabeza;
    
    while (actual) {
      valores.push(actual.valor);
      actual = actual.siguiente;
    }
    
    console.log(valores.join(" -> "));
  }
}

const lista = new ListaEnlazada ();


let k = 0;

do {
    k++

    let value = readline.question("Ingresa un nuevo valor: ");
    lista.agregar(value);

} while (k < 5);


lista.imprimir();