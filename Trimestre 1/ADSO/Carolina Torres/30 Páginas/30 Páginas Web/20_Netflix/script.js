// Seleccionamos todas las filas de películas
const filas = document.querySelectorAll('.fila');

filas.forEach(fila => {

    // 2. Alerta al hacer clic en una película
    fila.addEventListener('click', (e) => {
        if (e.target.classList.contains('pelicula')) {
            alert("Preparando reproducción...");
        }
    });
});
