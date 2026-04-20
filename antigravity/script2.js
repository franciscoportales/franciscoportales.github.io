document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('conversorForm');
    const inputNumero = document.getElementById('numeroDecimal');
    const inputSistema = document.getElementById('sistemaDestino');
    
    // UI Elements for Results
    const resultadoInicial = document.getElementById('resultadoInicial');
    const resultadoActivo = document.getElementById('resultadoActivo');
    const displayDecimal = document.getElementById('displayDecimal');
    const etiquetaSistema = document.getElementById('etiquetaSistema');
    const resultadoFinal = document.getElementById('resultadoFinal');
    
    // UI Elements for Error
    const mensajeError = document.getElementById('mensajeError');
    const errorTexto = document.getElementById('errorTexto');
    
    let errorTimeout;

    const showError = (message) => {
        errorTexto.textContent = message;
        mensajeError.classList.remove('hidden');
        mensajeError.classList.add('animate-fade-in');
        
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            mensajeError.classList.add('hidden');
        }, 4000);
    };

    const resetUI = () => {
        resultadoActivo.classList.add('hidden');
        resultadoInicial.classList.remove('hidden');
        resultadoFinal.classList.remove('animate-pop');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const valorRaw = inputNumero.value.trim();
        const sistemaBase = inputSistema.value;
        
        // Validación 1: Campos vacíos
        if (!valorRaw || !sistemaBase) {
            showError('Por favor ingresa un número y selecciona un sistema.');
            resetUI();
            return;
        }

        // Validación 2: Número entero
        const numero = parseInt(valorRaw, 10);
        if (isNaN(numero) || numero.toString() !== valorRaw) {
            showError('El valor ingresado no es un número entero decimal válido.');
            resetUI();
            return;
        }

        // Conversión Lógica
        let valorConvertido = '';
        let nombreSistema = '';

        switch (sistemaBase) {
            case '2':
                valorConvertido = numero.toString(2);
                nombreSistema = 'Binario (Base 2)';
                break;
            case '8':
                valorConvertido = numero.toString(8);
                nombreSistema = 'Octal (Base 8)';
                break;
            case '16':
                valorConvertido = numero.toString(16).toUpperCase();
                nombreSistema = 'Hexadecimal (Base 16)';
                break;
            default:
                showError('Sistema destino no reconocido.');
                resetUI();
                return;
        }
            
        // Actualización de UI
        resultadoInicial.classList.add('hidden');
        resultadoActivo.classList.remove('hidden');
        resultadoActivo.classList.add('flex');
        
        displayDecimal.textContent = numero;
        etiquetaSistema.textContent = nombreSistema;
        resultadoFinal.textContent = valorConvertido;
        
        // Reiniciar animación
        resultadoFinal.classList.remove('animate-pop');
        void resultadoFinal.offsetWidth;
        resultadoFinal.classList.add('animate-pop');
    });
    
    // Limpiar errores visuales
    [inputNumero, inputSistema].forEach(input => {
        input.addEventListener('input', () => {
            mensajeError.classList.add('hidden');
        });
    });
});
