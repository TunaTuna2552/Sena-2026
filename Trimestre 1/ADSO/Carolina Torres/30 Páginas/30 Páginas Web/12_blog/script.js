function leerMas(id) {
    const noticia = document.getElementById(id);
    
    // Agregamos la clase de estilo expandido
    noticia.classList.add('caja-expandida');

    // Solicitamos pantalla completa según el navegador
    if (noticia.requestFullscreen) {
        noticia.requestFullscreen();
    } else if (noticia.webkitRequestFullscreen) { // Safari
        noticia.webkitRequestFullscreen();
    } else if (noticia.msRequestFullscreen) { // IE11
        noticia.msRequestFullscreen();
    }
}

function cerrarNoticia() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Detectar cuando se sale de pantalla completa (tecla ESC)
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        // Buscamos cualquier noticia que tenga la clase y se la quitamos
        const noticiaExpandida = document.querySelector('.caja-expandida');
        if (noticiaExpandida) {
            noticiaExpandida.classList.remove('caja-expandida');
        }
    }
});
