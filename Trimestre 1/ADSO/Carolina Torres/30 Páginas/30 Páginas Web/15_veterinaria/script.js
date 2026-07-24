function mostrarSeccion(id) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('section');
    secciones.forEach(s => s.classList.remove('active'));

    // Mostrar la sección seleccionada
    const seleccionada = document.getElementById(id);
    seleccionada.classList.add('active');
}
