function nuevo() {
    let entrada = document.getElementById("nombre-ganador");
    let valor = entrada.value;

    if (valor !== "") {
        let lista = document.querySelector(".lista-resultados");
        let item = document.createElement("div");
        item.className = "resultado-tarjeta";
        
        item.innerHTML = `
            <div class="marcador">
                <div class="equipo-fila ganador">
                    <div class="nombre">${valor}</div>
                    <div class="puntos">W</div>
                </div>
            </div>
            <div class="etiqueta-ganador">NUEVO RESULTADO</div>
        `;

        lista.prepend(item);
        entrada.value = "";
    }
}
