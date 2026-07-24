document.getElementById('formInvertir').onsubmit = function (e) {
    e.preventDefault();

    let n = parseInt(document.getElementById('n').value);

    let primero = parseInt(n / 10);
    let s = n % 10;
    let r = s.toString() + primero.toString();

    document.getElementById('resultado').innerText = `El número invertido es: ${r}`;
};

//------------------------------------------------------------------------------

document.getElementById('areaCirculo').onsubmit = function (e) {
    e.preventDefault();

    let radio = parseInt(document.getElementById('radio').value);
    let area = Math.PI * radio * radio;

    document.getElementById('resultado_2').innerText = `El área del círculo es: ${area} cm²`;
};

//------------------------------------------------------------------------------

document.getElementById('areaTriangulo').onsubmit = function (e) {
    e.preventDefault();

    let base = parseInt(document.getElementById('b').value);
    let alto = parseInt(document.getElementById('h').value);
    let area = base * alto / 2;

    document.getElementById('resultado_3').innerText = `El área del triángulo es: ${area} cm²`;
};