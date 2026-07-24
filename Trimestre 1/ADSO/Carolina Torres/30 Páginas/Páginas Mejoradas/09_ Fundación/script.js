document.addEventListener('DOMContentLoaded', function() {
    
    const formulario = document.getElementById('form-contacto');
    const mensaje = document.getElementById('mensaje-exito');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        formulario.style.display = 'none';
        mensaje.style.display = 'block'; 
    });

});
