function $(id){return document.getElementById(id);} 
function setHTML(id, html){$(id).innerHTML = html;}
function setText(id, txt){$(id).textContent = txt;}

function problema1(){
  const carnet = $('carnet').value.trim();
  const nombre = $('nombre').value.trim();
  const msg = `Carnet: ${carnet}\nNombre: ${nombre}`;
  alert(msg);
  console.log(msg);
  setText('resultado', msg);
}

function problema2(){
  const a = parseFloat($('catetoA').value);
  const b = parseFloat($('catetoB').value);
  if(isNaN(a)||isNaN(b)) return setText('resultado','Ingrese ambos catetos.');
  const h = Math.sqrt(a*a + b*b);
  setText('resultado', `Hipotenusa = ${h.toFixed(2)}`);
}

function problema3(){
  const nombre = $('nombre').value.trim();
  const curso = $('curso').value.trim();
  const notas = [1,2,3,4,5].map(n=>parseFloat($('n'+n).value));
  if(notas.some(isNaN)) return setText('resultado','Ingrese las 5 notas.');
  const promedio = notas.reduce((a,b)=>a+b,0)/5;
  const msg = `Curso: ${curso}\nNombre: ${nombre}\nPromedio: ${promedio.toFixed(2)}`;
  alert(msg);
  setText('resultado', msg);
}

function problema4(){
  const n = parseFloat($('numero').value);
  if(isNaN(n)) return setText('resultado','Ingrese un número válido.');
  let r = 'neutro';
  if(n>0) r='positivo';
  else if(n<0) r='negativo';
  setText('resultado', `El número ${n} es ${r}.`);
}

function problema5(){
  const nums = [parseFloat($('n1').value),parseFloat($('n2').value),parseFloat($('n3').value)];
  if(nums.some(isNaN)) return setText('resultado','Ingrese los 3 números.');
  const ordenados = [...nums].sort((a,b)=>a-b);
  setText('resultado', `Mayor: ${ordenados[2]}\nMedio: ${ordenados[1]}\nMenor: ${ordenados[0]}`);
}

function problema6(){
  const n = parseInt($('numero').value);
  if(isNaN(n)) return setText('resultado','Ingrese un número entero.');
  let salida = `Tabla del ${n}\n`;
  for(let i=1;i<=10;i++) salida += `${n} x ${i} = ${n*i}\n`;
  setText('resultado', salida);
}

function problema7(){
  let a = parseInt($('a').value), b = parseInt($('b').value);
  if(isNaN(a)||isNaN(b)) return setText('resultado','Ingrese ambos valores.');
  if(a>b) [a,b]=[b,a];
  const pares=[];
  for(let i=a;i<=b;i++) if(i%2===0) pares.push(i);
  setText('resultado', pares.length?`Pares entre ${a} y ${b}: ${pares.join(', ')}`:'No hay pares en ese rango.');
}

function mcd(a,b){
  a=Math.abs(a); b=Math.abs(b);
  while(b!==0){ let temp=b; b=a%b; a=temp; }
  return a;
}
function problema8(){
  const a = parseInt($('a').value), b = parseInt($('b').value);
  if(isNaN(a)||isNaN(b)) return setText('resultado','Ingrese ambos valores.');
  const r = `El MCD de ${a} y ${b} es ${mcd(a,b)}`;
  alert(r); console.log(r); setText('resultado', r);
}

function problema9(){
  const texto = $('texto').value;
  let salida = '';
  for(let i=0;i<texto.length;i+=2){
    salida += texto.substring(i, i+2) + '\n';
  }
  setText('resultado', salida || 'Ingrese un texto.');
}

function escaparRegex(txt){return txt.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function problema10(){
  const texto = $('texto').value.trim();
  const palabra = $('palabra').value.trim();
  if(!texto || !palabra) return setText('resultado','Ingrese el texto y la palabra.');
  const regex = new RegExp(escaparRegex(palabra), 'gi');
  const coincidencias = texto.match(regex);
  const total = coincidencias ? coincidencias.length : 0;
  setText('resultado', `La palabra "${palabra}" se repite ${total} vez/veces.`);
}

function mostrarContinuos(valor){
  valor = parseInt(valor);
  if(isNaN(valor) || valor < 1) return setText('resultado','Ingrese un número mayor que 0.');
  let salida = '';
  for(let i=1;i<=valor;i++) salida += i + '\n';
  setText('resultado', salida);
}

function primerDigito(texto){
  return texto ? texto.charAt(0) : '';
}
function ultimoDigito(texto){
  return texto ? texto.charAt(texto.length-1) : '';
}
function mostrarEnTabla(datos){
  let html = '<table class="table"><tbody>';
  datos.forEach(d=> html += `<tr><td>${d}</td></tr>`);
  html += '</tbody></table>';
  setHTML('resultadoTabla', html);
}
function ejecutarPrimer(){
  const texto = $('palabra').value;
  mostrarEnTabla([primerDigito(texto)]);
}
function ejecutarUltimo(){
  const texto = $('palabra').value;
  mostrarEnTabla([ultimoDigito(texto)]);
}
function ejecutarCaracteres(){
  const texto = $('palabra').value;
  mostrarEnTabla(texto.split(''));
}


function contarS(texto){
  return (texto.match(/s/gi) || []).length;
}

function cantidadCaracteres(){
  const texto1 = $('texto1').value;
  const texto2 = $('texto2').value;
  const total1 = texto1.length;
  const total2 = texto2.length;
  const total = total1 + total2;

  const html = `
    <table class="table">
      <thead>
        <tr><th>TEXTO</th><th>CANTIDAD</th></tr>
      </thead>
      <tbody>
        <tr><td>No. 1</td><td>${total1}</td></tr>
        <tr><td>No. 2</td><td>${total2}</td></tr>
        <tr><td><strong>TOTAL</strong></td><td><strong>${total}</strong></td></tr>
      </tbody>
    </table>
    <div class="result">Texto concatenado: ${texto1 + texto2}</div>
  `;
  setHTML('resultado13', html);
}

function contarLetraS(){
  const texto1 = $('texto1').value;
  const texto2 = $('texto2').value;
  const s1 = contarS(texto1);
  const s2 = contarS(texto2);
  const total = s1 + s2;

  const html = `
    <table class="table">
      <thead>
        <tr><th>TEXTO</th><th>CANTIDAD DE "S" o "s"</th></tr>
      </thead>
      <tbody>
        <tr><td>No. 1</td><td>${s1}</td></tr>
        <tr><td>No. 2</td><td>${s2}</td></tr>
        <tr><td><strong>TOTAL</strong></td><td><strong>${total}</strong></td></tr>
      </tbody>
    </table>
  `;
  setHTML('resultado13', html);
}

function caracteresEnPosicionPar(texto){
  const lista = [];
  let correlativo = 1;
  for(let i = 1; i < texto.length; i += 2){
    lista.push({ correlativo: correlativo++, valor: texto.charAt(i) });
  }
  return lista;
}

function digitosPares(){
  const texto1 = $('texto1').value;
  const texto2 = $('texto2').value;
  const combinado = texto1 + texto2;
  const lista = caracteresEnPosicionPar(combinado);

  let html = `<table class="table">
    <thead>
      <tr><th>CORRELATIVO</th><th>VALOR</th></tr>
    </thead>
    <tbody>`;

  if(lista.length === 0){
    html += `<tr><td colspan="2">No hay caracteres en posición par.</td></tr>`;
  } else {
    lista.forEach(item => {
      html += `<tr><td>${item.correlativo}</td><td>${item.valor}</td></tr>`;
    });
  }

  html += `<tr><td><strong>TOTAL</strong></td><td><strong>${lista.length}</strong></td></tr></tbody></table>`;
  setHTML('resultado13', html);
}

function contarVocales(){
  const texto = $('textoVocales').value;
  const vocales = [
    { nombre: 'A,a', regex: /a/gi },
    { nombre: 'E,e', regex: /e/gi },
    { nombre: 'I,i', regex: /i/gi },
    { nombre: 'O,o', regex: /o/gi },
    { nombre: 'U,u', regex: /u/gi }
  ];

  let total = 0;
  let html = `<table class="table">
    <thead><tr><th>VOCAL</th><th>CANTIDAD</th></tr></thead>
    <tbody>`;

  vocales.forEach(v => {
    const cantidad = (texto.match(v.regex) || []).length;
    total += cantidad;
    html += `<tr><td>${v.nombre}</td><td>${cantidad}</td></tr>`;
  });

  html += `<tr><td><strong>TOTAL</strong></td><td><strong>${total}</strong></td></tr></tbody></table>`;
  setHTML('resultado14', html);
}

function crearTablaDinamica(){
  const filas = parseInt($('filas').value);
  const columnas = parseInt($('columnas').value);

  if(isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1){
    return setHTML('resultado15', '<div class="result">Ingrese una cantidad válida de filas y columnas.</div>');
  }

  let html = '<table class="table"><tbody>';
  for(let i = 1; i <= filas; i++){
    html += '<tr>';
    for(let j = 1; j <= columnas; j++){
      html += `<td>Fila ${i}, Columna ${j}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  setHTML('resultado15', html);
}
