document.getElementById('formContacto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const mensajeExito = document.getElementById('mensajeExito');

    if (nombre.trim() !== "") {
        mensajeExito.innerHTML = `
            <div style="background: #fff; border: 2px solid #cd853f; padding: 20px; border-radius: 15px; margin-top: 20px;">
                <h3 style="color: #4b3621;">¡Mensaje recibido!</h3>
                <p>Gracias, ${nombre}. Lupita te responderá en breve.</p>
            </div>
        `;
        mensajeExito.classList.remove('hidden');
        this.style.display = 'none'; 
    }
});
