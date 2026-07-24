function mostrar(id) {
    // 1. Obtenemos las dos secciones por su ID
    const seccionServicios = document.getElementById('sec1');
    const seccionTestimonios = document.getElementById('sec2');

    // 2. Ocultamos ambas secciones por defecto
    seccionServicios.style.display = 'none';
    seccionTestimonios.style.display = 'none';

    // 3. Mostramos solo la sección que el usuario pidió
    const seccionActiva = document.getElementById(id);
    seccionActiva.style.display = 'flex';
}

function mostrarTodo() {
    document.getElementById('sec1').style.display = 'flex';
    document.getElementById('sec2').style.display = 'flex';
}

