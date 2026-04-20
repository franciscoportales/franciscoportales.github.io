document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    const btnSubmit = document.getElementById('btnSubmit');
    
    const contadorIntentosEl = document.getElementById('contadorIntentos');
    const statusAlert = document.getElementById('statusAlert');
    
    // Credenciales válidas predefinidas en JS
    const USER_BD = "admin@test.com";
    const PASS_BD = "12345";
    
    const MAX_INTENTOS = 5;
    let intentosActuales = 0;

    const setStatus = (message, type) => {
        statusAlert.className = 'rounded-lg p-3 mb-6 text-center text-sm font-medium border animate-pop block';
        
        if (type === 'success') {
            statusAlert.classList.add('bg-green-500/20', 'border-green-500/50', 'text-green-300');
            statusAlert.classList.remove('bg-red-500/20', 'border-red-500/50', 'text-red-300');
            statusAlert.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ${message}`;
        } else if (type === 'error') {
            statusAlert.classList.add('bg-red-500/20', 'border-red-500/50', 'text-red-300');
            statusAlert.classList.remove('bg-green-500/20', 'border-green-500/50', 'text-green-300');
            statusAlert.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2"></i> ${message}`;
             // Reiniciar animación reactiva
             statusAlert.classList.remove('animate-pop');
             void statusAlert.offsetWidth;
             statusAlert.classList.add('animate-pop');
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Prevención de seguridad extra
        if (intentosActuales >= MAX_INTENTOS) return;

        const email = inputEmail.value.trim();
        const password = inputPassword.value;

        // Validación de credenciales
        if (email === USER_BD && password === PASS_BD) {
            // Acceso Concedido
            setStatus("Acceso concedido. ¡Bienvenido!", "success");
            // Se asume que resetea intentos en login exitoso (opcional)
            intentosActuales = 0;
            contadorIntentosEl.textContent = intentosActuales;
            // Deshabilitar formulario como demostración de entrada exitosa
            inputEmail.disabled = true;
            inputPassword.disabled = true;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<i class="fa-solid fa-lock-open"></i> Acceso Permitido`;
            btnSubmit.classList.add('bg-green-600');
            btnSubmit.style.backgroundImage = 'none';

        } else {
            // Acceso Denegado
            intentosActuales++;
            contadorIntentosEl.textContent = intentosActuales;
            
            if (intentosActuales >= MAX_INTENTOS) {
                // Bloquear el sistema
                setStatus("Acceso denegado. Sistema bloqueado por demasiados intentos.", "error");
                inputEmail.disabled = true;
                inputPassword.disabled = true;
                btnSubmit.disabled = true;
                contadorIntentosEl.classList.add('text-red-500');
            } else {
                setStatus("Acceso denegado. Credenciales incorrectas.", "error");
            }
        }
    });
});
