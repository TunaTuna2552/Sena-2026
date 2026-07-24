const formCliente = document.getElementById("formCliente");
const tablaClientes = document.getElementById("tablaClientes");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnTema = document.getElementById("btnTema");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

renderizarClientes();

formCliente.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const empresa = document.getElementById("empresa").value.trim();

  if (nombre === "" || correo === "" || empresa === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  const cliente = {
    nombre: nombre,
    correo: correo,
    empresa: empresa
  };

  clientes.push(cliente);

  localStorage.setItem("clientes", JSON.stringify(clientes));

  formCliente.reset();

  renderizarClientes();
});

function renderizarClientes() {
  tablaClientes.innerHTML = "";

  clientes.forEach((cliente, index) => {
    tablaClientes.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.correo}</td>
        <td>${cliente.empresa}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  });
}

function eliminarCliente(index) {
  clientes.splice(index, 1);

  localStorage.setItem("clientes", JSON.stringify(clientes));

  renderizarClientes();
}

btnLimpiar.addEventListener("click", function() {
  clientes = [];

  localStorage.removeItem("clientes");

  renderizarClientes();
});

btnTema.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "oscuro");
    btnTema.textContent = "Modo claro";
  } else {
    localStorage.setItem("tema", "claro");
    btnTema.textContent = "Modo oscuro";
  }
});

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
  document.body.classList.add("dark");
  btnTema.textContent = "Modo claro";
}