const botones = document.querySelectorAll('.boton-leer');

function abrirNoticia() {
    alert("Su noticia cargará en breve.");
}

botones.forEach(boton => {
    boton.onclick = abrirNoticia;
});
