const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LISTA;

//creacion de fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-mx", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

if (performance.getEntriesByType("navigation")[0].type === "reload") {
  localStorage.clear();
}

//funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";
  const num = id + 1;

  const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO} " data="realizado" id="${id}"></i>
                    <p class="text ${LINE}"> ${num}- ${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>
                    `;
  lista.insertAdjacentHTML("beforeend", elemento);
}
//Funcion de tarea realizada
function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LISTA[element.id].realizado = LISTA[element.id].realizado ? false : true;
}

//Funcion de tarea eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LISTA[element.id].eliminado = true;
}

//Evento para cunado se le de click al icono
botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LISTA.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  input.value = "";

  id++;
  localStorage.setItem("TAREAS", JSON.stringify(LISTA));
});

//Evento por si se le da enter en el iput de tarea para que lo agrege
document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LISTA.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    id++;
    input.value = "";
  }
  localStorage.setItem("TAREAS", JSON.stringify(LISTA));
});

//Evento para eliminar la tarea si se da click en el icono
lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TAREAS", JSON.stringify(LISTA));
});

//Local storage
let data = localStorage.getItem("TAREAS");
if (data) {
  LISTA = JSON.parse(data);
  id = LISTA.length;
  caragarLista(LISTA);
} else {
  LISTA = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
