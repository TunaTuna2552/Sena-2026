const modoBtn = document.getElementById('modo-btn');
const cuerpo = document.body;

modoBtn.addEventListener('click', () => {
    cuerpo.classList.toggle('light-mode');
    localStorage.setItem('tema-gym', cuerpo.classList.contains('light-mode') ? 'claro' : 'oscuro');
});

document.querySelectorAll('.btn-p').forEach(boton => {
    boton.addEventListener('click', () => {
        const plan = boton.getAttribute('data-plan');
        alert(`Has elegido el Plan: ${plan}`);
        document.getElementById('meta').value = `Quiero inscribirme al Plan ${plan}.`;
        document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
    });
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("¡Datos enviados con éxito! Un coach te contactará pronto.");
    e.target.reset();
});

window.onload = () => {
    if (localStorage.getItem('tema-gym') === 'claro') cuerpo.classList.add('light-mode');
};
