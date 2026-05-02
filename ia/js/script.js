// Proyecto: IA para el desarrollo de aplicaciones web
// Autor: José Francisco Portales Solval

document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

  const cards = document.querySelectorAll('.card-pro');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated','animate__fadeInUp');
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(card => observer.observe(card));
});

function generarDatoSintetico(){
  const nombres = ['Ana López','Carlos Méndez','María García','Luis Ramos','Sofía Pérez','José Portales'];
  const roles = ['Tester QA','Frontend Dev','Backend Dev','Scrum Master','Diseñador UI','DevOps'];
  const estados = ['Activo','En revisión','Pendiente','Aprobado'];

  const dato = {
    id: Math.floor(Math.random() * 9000) + 1000,
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    rol: roles[Math.floor(Math.random() * roles.length)],
    estado: estados[Math.floor(Math.random() * estados.length)],
    correo: 'usuario' + Math.floor(Math.random() * 100) + '@demo.com'
  };

  const salida = document.querySelector('#resultadoDatos');
  if(salida){
    salida.innerHTML = `
      <div class="result-card">
        <h5 class="fw-bold mb-2"><i class="fa-solid fa-database me-2"></i>Dato sintético generado</h5>
        <pre class="mb-0"><code>${JSON.stringify(dato, null, 2)}</code></pre>
      </div>
    `;
  }
}

function evaluarPrompt(){
  const prompt = document.querySelector('#promptInput')?.value.trim();
  const salida = document.querySelector('#promptResultado');
  if(!salida) return;

  if(!prompt){
    salida.innerHTML = '<div class="alert alert-warning rounded-4">Escribe un prompt para evaluarlo.</div>';
    return;
  }

  const criterios = [
    { texto:'Define contexto', ok: /actúa|eres|contexto|rol/i.test(prompt) },
    { texto:'Indica formato de salida', ok: /tabla|lista|html|json|código|codigo|markdown/i.test(prompt) },
    { texto:'Incluye objetivo claro', ok: /crear|generar|explicar|comparar|diseñar|resolver/i.test(prompt) },
    { texto:'Agrega restricciones', ok: /sin|con|máximo|minimo|responsive|bootstrap|tailwind/i.test(prompt) }
  ];

  const puntos = criterios.filter(c => c.ok).length;
  salida.innerHTML = `
    <div class="result-card">
      <h5 class="fw-bold">Puntaje del prompt: ${puntos}/4</h5>
      <ul class="mb-0">
        ${criterios.map(c => `<li>${c.ok ? '✅' : '⚠️'} ${c.texto}</li>`).join('')}
      </ul>
    </div>`;
}
