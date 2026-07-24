//Elaborar un programa que pida la marca del auto, el color y el precio de tantos autos como el usuario quiera y los almacene en una lista enlazad, luego se debe recorrer la lista y obtener total de cantidad de autos por marca, total de precios por marca y total de autos por color
import readline from 'readline-sync';

class Nodo {
  constructor(marca, color, precio) {
    this.marca = marca.toUpperCase(); //Mayúsculas
    this.color = color.toUpperCase();
    this.precio = Number(precio);
    this.siguiente = null;
  }
}

class ListaAutos {
  constructor() {
    this.cabeza = null;
  }

  agregar(marca, color, precio) {
    const nuevoNodo = new Nodo(marca, color, precio);

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

  mostrarReporte() {
    if (!this.cabeza) {
      console.log("\nNo hay autos registrados en la lista.");
      return;
    }

    let marcas = {};
    let colores = {};

    let actual = this.cabeza;

    while (actual) {
      //PROCESAR MARCAS
      if (!marcas[actual.marca]) {
        marcas[actual.marca] = { cantidad: 0, totalPrecio: 0 };
      }
      marcas[actual.marca].cantidad += 1;
      marcas[actual.marca].totalPrecio += actual.precio;

      //PROCESAR COLORES
      if (!colores[actual.color]) {
        colores[actual.color] = 0;
      }
      colores[actual.color] += 1;

      actual = actual.siguiente;
    }

    //IMPRIMIR LOS RESULTADOS EN PANTALLA
    console.log("\n========================================");
    console.log("       REPORTE TOTAL DE AUTOMÓVILES       ");
    console.log("========================================");

    console.log("\n TOTALES POR MARCA:");
    for (let m in marcas) {
      console.log(`- ${m}: Cantidad: ${marcas[m].cantidad} | Total Precios: $${marcas[m].totalPrecio}`);
    }

    console.log("\n TOTALES POR COLOR:");
    for (let c in colores) {
      console.log(`- ${c}: Cantidad: ${colores[c]}`);
    }
    console.log("========================================\n");
  }
}

//EJECUCIÓN PRINCIPAL DEL PROGRAMA
const lista = new ListaAutos();
let continuar;

console.log("--- REGISTRO DE AUTOS EN LISTA ENLAZADA ---");

do {
  let marca = readline.question("\nIngresa la marca del auto: ");
  let color = readline.question("Ingresa el color del auto: ");
  let precio = readline.question("Ingresa el precio del auto: ");

  lista.agregar(marca, color, precio);
  console.log("¡Auto registrado con éxito!");

  continuar = readline.question("\n¿Quieres registrar otro auto? (si/no): ").toLowerCase();

} while (continuar === 'si' || continuar === 's');

lista.mostrarReporte();