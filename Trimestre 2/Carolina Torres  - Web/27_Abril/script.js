// Esperar a que todo el documento cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionar todos los botones de compra
    const botonesCompra = document.querySelectorAll('.boton-compra');

    // 2. Agregar el evento de clic a cada botón
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Obtener el nombre del producto de la tarjeta actual
            const tarjeta = e.target.closest('.producto-card');
            const nombreProducto = tarjeta.querySelector('.nombre').innerText;
            const precioProducto = tarjeta.querySelector('.precio').innerText;

            // Mostrar una alerta personalizada (puedes cambiar esto por un modal más adelante)
            alert(`¡Excelente elección! \n\nHas seleccionado el ${nombreProducto}.\nPrecio: ${precioProducto}\n\nUn asesor se pondrá en contacto contigo.`);
            
            // Efecto visual al presionar
            boton.innerText = "¡AÑADIDO!";
            boton.style.backgroundColor = "#28a745"; // Cambia a verde
            boton.style.color = "white";

            setTimeout(() => {
                boton.innerText = "Comprar";
                boton.style.backgroundColor = ""; // Vuelve al color original del CSS
                boton.style.color = "";
            }, 2000);
        });
    });

    // 3. Manejo del formulario de contacto
    const formContacto = document.querySelector('.form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            const email = formContacto.querySelector('input').value;
            alert(`¡Gracias por suscribirte!\nEnviaremos nuestras ofertas a: ${email}`);
            formContacto.reset(); // Limpia el campo
        });
    }
});
