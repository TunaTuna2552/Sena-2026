document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Simular envío de datos
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('message');
    
    btn.disabled = true;
    btn.innerText = "Enviando...";

    setTimeout(() => {
        // Ocultar formulario y mostrar éxito
        document.getElementById('registrationForm').classList.add('hidden');
        msg.classList.remove('hidden');
        msg.innerHTML = `<strong>¡Registro Exitoso!</strong><br>Gracias por inscribirte. Revisa tu correo para más detalles.`;
    }, 1500);
});
