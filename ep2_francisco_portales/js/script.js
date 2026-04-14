function guardarEmpleado() {
  const nombre = document.getElementById("nombre").value.trim();
  const fechaIngreso = document.getElementById("fechaIngreso").value;
  const puesto = document.getElementById("puesto").value.trim();
  const salario = document.getElementById("salario").value;

  if (nombre === "" || fechaIngreso === "" || puesto === "" || salario === "") {
    alert("Por favor complete todos los campos.");
    return;
  }

  const tabla = document.getElementById("tablaEmpleados");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${fechaIngreso}</td>
    <td>${puesto}</td>
    <td>Q ${parseFloat(salario).toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
  `;

  tabla.appendChild(fila);

  document.getElementById("nombre").value = "";
  document.getElementById("fechaIngreso").value = "";
  document.getElementById("puesto").value = "";
  document.getElementById("salario").value = "";
}

function eliminarPrimero() {
  const tabla = document.getElementById("tablaEmpleados");

  if (tabla.rows.length > 0) {
    tabla.deleteRow(0);
  } else {
    alert("No hay registros para eliminar.");
  }
}

function eliminarUltimo() {
  const tabla = document.getElementById("tablaEmpleados");

  if (tabla.rows.length > 0) {
    tabla.deleteRow(tabla.rows.length - 1);
  } else {
    alert("No hay registros para eliminar.");
  }
}

function calcularSueldo() {
  const salario = parseFloat(document.getElementById("salarioBase").value) || 0;
  const bonificacion = parseFloat(document.getElementById("bonificacion").value) || 0;
  const comisiones = parseFloat(document.getElementById("comisiones").value) || 0;
  const ahorro = parseFloat(document.getElementById("ahorro").value) || 0;
  const prestamos = parseFloat(document.getElementById("prestamos").value) || 0;

  const totalGanado = salario + bonificacion + comisiones;
  const igss = salario * 0.0483;
  const totalDescuentos = ahorro + igss + prestamos;
  const sueldoLiquido = totalGanado - totalDescuentos;

  document.getElementById("resultadoSueldo").innerHTML = `
    <h3 class="mb-3">Resultados</h3>
    <p><strong>Total ganado:</strong> Q ${totalGanado.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    <p><strong>IGSS:</strong> Q ${igss.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    <p><strong>Total descuentos:</strong> Q ${totalDescuentos.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    <p><strong>Sueldo líquido:</strong> Q ${sueldoLiquido.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
  `;
}


document.addEventListener("DOMContentLoaded", function () {
  const hoy = new Date();

  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');

  const fechaActual = `${año}-${mes}-${dia}`;

  document.getElementById("fechaIngreso").value = fechaActual;
});


function calcularSueldo() {
  const salario = parseFloat(document.getElementById("salarioBase").value) || 0;
  const bonificacion = parseFloat(document.getElementById("bonificacion").value) || 0;
  const comisiones = parseFloat(document.getElementById("comisiones").value) || 0;
  const ahorro = parseFloat(document.getElementById("ahorro").value) || 0;
  const prestamos = parseFloat(document.getElementById("prestamos").value) || 0;

  const totalGanado = salario + bonificacion + comisiones;
  const igss = salario * 0.0483;
  const totalDescuentos = ahorro + igss + prestamos;
  const sueldoLiquido = totalGanado - totalDescuentos;

  document.getElementById("resultadoSueldo").innerHTML = `
    <h3 class="mb-3">Resultados</h3>
    <p><strong>Total ganado:</strong> Q ${totalGanado.toFixed(2)}</p>
    <p><strong>IGSS:</strong> Q ${igss.toFixed(2)}</p>
    <p><strong>Total descuentos:</strong> Q ${totalDescuentos.toFixed(2)}</p>
    <p><strong>Sueldo líquido:</strong> Q ${sueldoLiquido.toFixed(2)}</p>
  `;
}