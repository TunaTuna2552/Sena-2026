document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('cvForm');
    const feedback = document.getElementById('responseMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;

        feedback.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado con éxito.`;
        feedback.classList.remove('hidden');

        form.reset();

        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 4000);
    });
});
