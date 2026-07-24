const botones = document.querySelectorAll('.tarjeta');

function avisarInscripcion() {
    alert("¡Excelente elección! Un asesor se contactará contigo para las clases de música.");
}

botones.forEach(boton => {
    boton.onclick = avisarInscripcion;
});
