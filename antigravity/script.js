document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wordForm');
    const inputTexto = document.getElementById('textoFuente');
    const inputPalabra = document.getElementById('palabraBuscar');
    
    // UI Elements for Results
    const resultadoInicial = document.getElementById('resultadoInicial');
    const resultadoActivo = document.getElementById('resultadoActivo');
    const displayPalabra = document.getElementById('displayPalabra');
    const displayConteo = document.getElementById('displayConteo');
    
    // UI Elements for Error
    const mensajeError = document.getElementById('mensajeError');
    const errorTexto = document.getElementById('errorTexto');
    
    let errorTimeout;

    // Función para mostrar errores
    const showError = (message) => {
        errorTexto.textContent = message;
        mensajeError.classList.remove('hidden');
        mensajeError.classList.add('animate-fade-in');
        
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            mensajeError.classList.add('hidden');
        }, 4000);
    };

    // Ocultar resultados y volver al estado inicial
    const resetUI = () => {
        resultadoActivo.classList.add('hidden');
        resultadoInicial.classList.remove('hidden');
        displayConteo.classList.remove('animate-pop');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const texto = inputTexto.value.trim();
        const palabra = inputPalabra.value.trim();
        
        // Validación básica
        if (!texto || !palabra) {
            showError('Por favor, ingresa tanto el texto como la palabra a buscar.');
            resetUI();
            return;
        }

        // Validación: Asegurar que la palabra a buscar no contenga múltiples palabras o espacios raros
        const palabrasABuscar = palabra.split(/\s+/);
        if (palabrasABuscar.length > 1) {
            showError('Por favor, ingresa solo una palabra para buscar, no una frase.');
            resetUI();
            return;
        }

        // Lógica de conteo de palabras exacta
        // Usamos \b para indicar límites de palabra (word boundaries)
        // 'g' para global, 'i' para case-insensitive (ignorar mayúsculas y minúsculas)
        // Se escapan los caracteres especiales de la palabra por seguridad en la expresión regular
        
        try {
            const palabraEscapada = palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${palabraEscapada}\\b`, 'gi');
            
            // Array con todas las coincidencias
            const coincidencias = texto.match(regex);
            
            // La cantidad será la longitud del array o 0 si no hay coincidencias (es null)
            const cantidad = coincidencias ? coincidencias.length : 0;
            
            // Actualización de la Interfaz
            resultadoInicial.classList.add('hidden');
            resultadoActivo.classList.remove('hidden');
            resultadoActivo.classList.add('flex');
            
            displayPalabra.textContent = palabra;
            displayConteo.textContent = cantidad;
            
            // Reiniciar y aplicar la animación al número para que resalte
            displayConteo.classList.remove('animate-pop');
            void displayConteo.offsetWidth; // Trigger reflow for animation restart
            displayConteo.classList.add('animate-pop');
            
        } catch (error) {
            showError('Ocurrió un error al procesar el texto.');
            console.error(error);
        }
    });
    
    // Limpiar error visual si el usuario empieza a escribir nuevamente
    [inputTexto, inputPalabra].forEach(input => {
        input.addEventListener('input', () => {
            mensajeError.classList.add('hidden');
        });
    });
});
