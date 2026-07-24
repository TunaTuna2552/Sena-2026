// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear el contenedor del modal y añadirlo al body
    const modal = document.createElement('div');
    modal.id = 'modal-expandir';
    document.body.appendChild(modal);

    // 2. Estilos básicos para el modal (puedes mover esto a tu styles.css)
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        cursor: 'zoom-out'
    });

    // 3. Crear el elemento de imagen dentro del modal
    const modalImg = document.createElement('img');
    modalImg.style.maxHeight = '90%';
    modalImg.style.maxWidth = '90%';
    modalImg.style.objectFit = 'contain';
    modalImg.style.borderRadius = '10px';
    modal.appendChild(modalImg);

    // 4. Seleccionar todas las imágenes de los productos
    const imagenes = document.querySelectorAll('.img-contenedor img');

    imagenes.forEach(img => {
        img.style.cursor = 'zoom-in'; // Cambiar cursor para indicar que es clickeable
        
        img.addEventListener('click', () => {
            modalImg.src = img.src; // Copiar la fuente de la imagen
            modal.style.display = 'flex'; // Mostrar modal
        });
    });

    // 5. Cerrar el modal al hacer clic en cualquier parte
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
