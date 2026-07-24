const botonSub = document.querySelector('.boton-sub');

botonSub.addEventListener('click', () => {
    if (botonSub.textContent === 'Suscribirse') {
        botonSub.textContent = 'Suscrito';
        botonSub.style.backgroundColor = '#333';
        botonSub.style.color = 'white';
    } else {
        botonSub.textContent = 'Suscribirse';
        botonSub.style.backgroundColor = 'white';
        botonSub.style.color = 'black';
    }
});


const pantallaVideo = document.getElementById('reproductor');
const video = document.getElementById('video-activo');
const cerrar = document.querySelector('.cerrar-reproductor');
const tarjetas = document.querySelectorAll('.tarjeta-video');

tarjetas.forEach(t => {
    t.onclick = () => {
        const rutaVideo = t.getAttribute('data-video');
        video.src = rutaVideo;
        pantallaVideo.style.display = 'block';
        video.play();
    };
});

cerrar.onclick = () => {
    pantallaVideo.style.display = 'none';
    video.pause();
    video.src = "";
};

window.onclick = (e) => {
    if (e.target == pantallaVideo) {
        pantallaVideo.style.display = 'none';
        video.pause();
        video.src = "";
    }
};
