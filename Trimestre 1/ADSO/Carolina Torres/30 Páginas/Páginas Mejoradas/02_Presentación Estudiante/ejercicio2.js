let monto = 10000
let interes = 0.01
let bucle = "Interes acumulado = ";

var pmes1 = monto*interes //100
var mes1 = (monto+pmes1); //10100

var pmes2 = interes*mes1 //101
var mes2 = (mes1+pmes2);//10101

var pmes3 = interes*mes2
var mes3 = (mes2+pmes3);

var pmes4 = interes*mes3
var mes4 = (mes3+pmes4);

var pmes5 = interes*mes4
var mes5 = (mes4+pmes5);

var pmes6 =interes*mes5
var mes6 = (mes5+pmes6);

console.log("Mes 1");
console.log(bucle+"$10.000 x 1% = $"+mes1);
console.log("");

console.log("Mes 2");
console.log(bucle+mes1+" x 1% = $"+mes2);
console.log("");

console.log("Mes 3");
console.log(bucle+mes2+"x 1% = $"+mes3);
console.log("");

console.log("Mes 4");
console.log(bucle+mes3+" x 1% = $"+mes4);
console.log("");


console.log("Mes 5");
console.log(bucle+mes4+" x 1% = $"+mes5);
console.log("");


console.log("Mes 6");
console.log(bucle+mes5+" x 1% = $"+mes6);


