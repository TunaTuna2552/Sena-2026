function mostrar(id) {
    // 1. Obtenemos las secciones por su ID
    const seccionCalendario = document.getElementById('sec1');
    const seccionJugadores = document.getElementById('sec2');
    const seccionResultados = document.getElementById('sec3');


    // 2. Ocultamos ambas secciones por defecto
    seccionCalendario.style.display = 'none';
    seccionJugadores.style.display = 'none';
    seccionResultados.style.display = 'none';

    // 3. Mostramos solo la sección que el usuario pidió
    const seccionActiva = document.getElementById(id);
    seccionActiva.style.display = 'flex';
}

 

