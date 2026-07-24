const buscador = document.getElementById("buscar");
const fichas = document.querySelectorAll(".ficha");

buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();
    
    fichas.forEach(ficha => {
        const nombre = ficha.querySelector(".nombre").textContent.toLowerCase();
        const zona = ficha.querySelector(".zona").textContent.toLowerCase();
        
        if (nombre.includes(filtro) || zona.includes(filtro)) {
            ficha.style.display = "block";
        } else {
            ficha.style.display = "none";
        }
    });
});
