document.getElementById('formBogota').addEventListener('submit', function(event) {

    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre').value;
    const mensajeRespuesta = document.getElementById('respuesta');

    mensajeRespuesta.innerHTML = "¡Gracias <strong>" + nombreUsuario + "</strong>! Hemos recibido tu mensaje correctamente.";

    mensajeRespuesta.classList.remove('oculto');

    this.reset();
});
