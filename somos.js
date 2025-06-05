document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('botonPresentacion');

    if (boton) {
        boton.addEventListener('click', function() {
            // Reemplaza esta URL con el enlace real de tu presentación en Canva
            const urlCanva = 'https://www.canva.com/design/DAF0_example/view?utm_content=DAF0_example&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink'; // ¡IMPORTANTE: Reemplazar con tu URL de Canva!
            window.open(urlCanva, '_blank'); // Abre la URL en una nueva pestaña
        });
    } else {
        console.error('El botón con el ID "botonPresentacion" no se encontró en el DOM.');
    }
});
