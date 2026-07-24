const formulario = document.getElementById('formulario');
const mensajeExito = document.getElementById('mensaje');

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (nombre.trim() === "" || email.trim() === "") {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    mensajeExito.classList.remove('oculto');
    mensajeExito.innerText = `¡Gracias por inscribirte, ${nombre}! Te enviaremos un correo a ${email}.`;

    formulario.reset();
});
