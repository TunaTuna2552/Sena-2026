let colorActual = 0;


function cambiarColor() {
    let colores = ["#121212", "white", "lightgreen", "lightpink", "lavender"];
    document.body.style.backgroundColor = colores[colorActual];
    colorActual = colorActual + 1;
    if (colorActual >= colores.length) {
        colorActual = 0;
    }
}
