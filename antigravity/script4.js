document.addEventListener('DOMContentLoaded', () => {
    // 20 objetos de JavaScript predefinidos (Mock Data)
    const usuarios = [
        { nombre: 'Ana García', edad: 25, habilidad: 'React' },
        { nombre: 'Carlos López', edad: 17, habilidad: 'JavaScript' }, // Menor de edad
        { nombre: 'Elena Ruiz', edad: 30, habilidad: 'Python' },
        { nombre: 'David Martínez', edad: 22, habilidad: 'Node.js' },
        { nombre: 'Sofía Torres', edad: 19, habilidad: 'React' },
        { nombre: 'Javier Morales', edad: 35, habilidad: 'Java' },
        { nombre: 'Lucía Fernández', edad: 28, habilidad: 'JavaScript' },
        { nombre: 'Miguel Sánchez', edad: 16, habilidad: 'Python' }, // Menor de edad
        { nombre: 'Paula Gómez', edad: 24, habilidad: 'Figma' },
        { nombre: 'Jorge Díaz', edad: 29, habilidad: 'React' },
        { nombre: 'Carmen Román', edad: 21, habilidad: 'CSS' },
        { nombre: 'Raúl Castro', edad: 32, habilidad: 'Node.js' },
        { nombre: 'Andrea Navarro', edad: 26, habilidad: 'JavaScript' },
        { nombre: 'Pedro Ramos', edad: 15, habilidad: 'HTML' }, // Menor de edad
        { nombre: 'Teresa Blanco', edad: 23, habilidad: 'Python' },
        { nombre: 'Víctor Molina', edad: 40, habilidad: 'C++' },
        { nombre: 'Marta Ortiz', edad: 27, habilidad: 'Figma' },
        { nombre: 'Jesús Silva', edad: 31, habilidad: 'JavaScript' },
        { nombre: 'Rosa Gil', edad: 18, habilidad: 'React' }, // No es mayor estricto, o según criterio >= 18 o > 18. "Mayores de 18 años". Lo tomaremos como edad >= 18 (Criterio común, o podemos usar estricto > 18. Usaremos > 18 según "mayores de 18", o >= 18 para "mayor de edad", usaremos > 18 como dice el prompt o >= 18. Tomaré > 18 por ser literal, o mejor >= 18 para incluir adultos. Cambiaré a 19 para evadir ambigüedad).
        { nombre: 'Roberto Vargas', edad: 33, habilidad: 'Python' },
        // Actualizamos a un par de 18 para ser precisos.
    ];
    // Ajuste por la lectura literal "mayores de 18"
    usuarios[18].edad = 20;

    const form = document.getElementById('searchForm');
    const inputBusqueda = document.getElementById('inputBusqueda');
    const gridResultados = document.getElementById('gridResultados');
    const contadorResultados = document.getElementById('contadorResultados');
    
    // UI Elements for Directory Table
    const toggleDirectorio = document.getElementById('toggleDirectorio');
    const iconoToggle = document.getElementById('iconoToggle');
    const contenedorDirectorio = document.getElementById('contenedorDirectorio');
    const tablaDirectorio = document.getElementById('tablaDirectorio');

    // UI Elements for Empty / Messages
    const estadoMensaje = document.getElementById('estadoMensaje');
    const estadoIcono = document.getElementById('estadoIcono');
    const estadoTexto = document.getElementById('estadoTexto');

    // Popular tabla de referencia (Directorio)
    usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-700/30 transition-colors';
        tr.innerHTML = `
            <td class="px-4 py-2"><span class="text-slate-200">${u.nombre}</span></td>
            <td class="px-4 py-2">${u.edad} ${u.edad <= 18 ? '<span class="text-xs text-red-400 font-semibold ml-1">(Menor)</span>' : ''}</td>
            <td class="px-4 py-2"><span class="bg-blue-900/30 border border-blue-800/50 px-2 py-0.5 rounded text-xs text-blue-300">${u.habilidad}</span></td>
        `;
        tablaDirectorio.appendChild(tr);
    });

    // Control del acordeón de la tabla
    toggleDirectorio.addEventListener('click', () => {
        contenedorDirectorio.classList.toggle('hidden');
        iconoToggle.classList.toggle('rotate-180');
    });

    const mostrarMensaje = (texto, iconClass, isError = false) => {
        gridResultados.classList.add('hidden');
        estadoMensaje.classList.remove('hidden');
        
        estadoTexto.textContent = texto;
        estadoIcono.className = `fa-solid ${iconClass} text-5xl mb-4`;
        
        if (isError) {
            estadoIcono.classList.add('text-red-400', 'opacity-80');
            estadoIcono.classList.remove('text-slate-500', 'opacity-30');
            estadoTexto.classList.add('text-red-300');
            estadoTexto.classList.remove('text-slate-400');
            contadorResultados.textContent = '0 Resultados';
        } else {
            estadoIcono.classList.add('text-slate-500', 'opacity-30');
            estadoIcono.classList.remove('text-red-400', 'opacity-80');
            estadoTexto.classList.add('text-slate-400');
            estadoTexto.classList.remove('text-red-300');
        }
    };

    const renderCard = (usuario, animDelay) => {
        const card = document.createElement('div');
        card.className = `bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-start gap-4 animate-fade-in hover:bg-slate-800 transition-colors`;
        card.style.animationDelay = `${animDelay}ms`;
        card.style.opacity = '0'; // For animation
        
        // Avatar aleatorio visual
        const inicial = usuario.nombre.charAt(0);
        
        card.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-blue-500/30">
                ${inicial}
            </div>
            <div class="flex-col">
                <h4 class="text-white font-semibold text-sm">${usuario.nombre}</h4>
                <div class="flex items-center gap-3 mt-1.5 text-xs">
                    <span class="text-slate-400"><i class="fa-solid fa-cake-candles mr-1 opacity-70"></i> ${usuario.edad} años</span>
                    <span class="bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-md border border-blue-800/50"><i class="fa-solid fa-code mr-1"></i> ${usuario.habilidad}</span>
                </div>
            </div>
        `;
        return card;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const termino = inputBusqueda.value.trim().toLowerCase();
        
        if (!termino) {
            mostrarMensaje('Introduce una habilidad para ver a los candidatos.', 'fa-users');
            contadorResultados.textContent = 'Esperando...';
            return;
        }

        // LÓGICA DE FILTRADO (Habilidad igual y edad estricta mayor a 18)
        const filtrados = usuarios.filter(u => 
            u.habilidad.toLowerCase() === termino && u.edad > 18
        );

        // Limpiar contenedor
        gridResultados.innerHTML = '';

        if (filtrados.length === 0) {
            // Manejo de excepción según prompt
            mostrarMensaje('No se encontraron perfiles con esos criterios', 'fa-user-xmark', true);
        } else {
            // Mostrar resultados
            estadoMensaje.classList.add('hidden');
            gridResultados.classList.remove('hidden');
            gridResultados.classList.add('grid');
            
            contadorResultados.textContent = `${filtrados.length} Encontrados`;
            
            filtrados.forEach((user, index) => {
                const delay = Math.min(index * 100, 500); // Staggered animation
                const element = renderCard(user, delay);
                gridResultados.appendChild(element);
                
                // Trigger reflow for fade in
                setTimeout(() => {
                    element.style.opacity = '1';
                }, delay + 10);
            });
        }
    });
});
