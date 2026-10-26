// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

// Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const listaEspejo = document.querySelector('#lista-espejo');
const loadingState = document.querySelector('#loading-state');
const seccionFiltros = document.querySelector('.filter-section');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {

  // Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Una vez pasada la espera, ocultar el div #loading-state
  loadingState.style.display = 'none';

  // Invocar a la función pintarTareas()
  pintarTareas();
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {

  // Limpiar el contenedor de la lista
  listaContenedor.replaceChildren();
  listaEspejo.replaceChildren();

  // Filtrar las tareas según el filtro actual
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroActual === 'Pendientes') {
      return !tarea.completada;
    }

    if (filtroActual === 'Completadas') {
      return tarea.completada;
    }

    return true;
  });

  // Recorrer las tareas filtradas
  tareasFiltradas.forEach(tarea => {

    // Crear el elemento <li>
    const elementoTarea = document.createElement('li');

    // Añadir las clases correspondientes a la tarea
    elementoTarea.classList.add('item-tarea', tarea.prioridad);

    // Crear el elemento <span> para el título
    const textoTarea = document.createElement('span');
    textoTarea.textContent = tarea.titulo;

    // Si la tarea está completada, añadir la clase correspondiente
    if (tarea.completada) {
      elementoTarea.classList.add('completada');
    }

    // Crear el botón para cambiar el estado de la tarea
    const botonEstado = document.createElement('button');
    botonEstado.type = 'button';
    botonEstado.classList.add('btn-accion');
    botonEstado.dataset.id = tarea.id;

    if (tarea.completada) {
      botonEstado.textContent = 'Marcar pendiente';
    } else {
      botonEstado.textContent = 'Completar';
    }

    // El listener delegado de la lista identifica la tarea mediante data-id

    // Añadir el título y el botón al <li>
    elementoTarea.appendChild(textoTarea);
    elementoTarea.appendChild(botonEstado);

    // Añadir el <li> a la lista
    listaContenedor.appendChild(elementoTarea);
  });

  // La vista espejo refleja todas las tareas, sin controles ni filtro de gestión.
  tareas.forEach(tarea => {
    const elementoEspejo = document.createElement('li');
    elementoEspejo.classList.add('item-tarea', tarea.prioridad);
    elementoEspejo.classList.add(tarea.completada ? 'completada' : 'pendiente');

    const textoEspejo = document.createElement('span');
    textoEspejo.textContent = `[RÉPLICA] ${tarea.titulo} — Estado: ${tarea.completada ? 'Hecho' : 'Pendiente'}`;

    elementoEspejo.appendChild(textoEspejo);
    listaEspejo.appendChild(elementoEspejo);
  });
}

// Delegación: un único listener gestiona los botones actuales y futuros de la lista.
listaContenedor.addEventListener('click', (event) => {
  const boton = event.target.closest('.btn-accion');
  if (!boton || !listaContenedor.contains(boton)) return;

  const idBuscar = Number(boton.dataset.id);
  tareas = tareas.map(tarea => tarea.id === idBuscar
    ? { ...tarea, completada: !tarea.completada }
    : tarea
  );

  pintarTareas();
});

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // Capturar los valores de los inputs de forma segura
  const titulo = inputTitulo.value.trim();
  const prioridad = selectPrioridad.value;

  // Comprobar que el título no esté vacío
  if (titulo === '') {
    inputTitulo.focus();
    return;
  }

  // Crear un nuevo objeto tarea con un id único
  const nuevaTarea = {
    id: Date.now(),
    titulo: titulo,
    prioridad: prioridad,
    completada: false
  };

  // Añadir la tarea al array de forma inmutable usando spread
  tareas = [...tareas, nuevaTarea];

  // Volver a pintar las tareas
  pintarTareas();

  // Resetear el formulario
  formulario.reset();
});

// 6. MANEJO DE EVENTOS: Delegación de los botones de filtrado
seccionFiltros.addEventListener('click', (event) => {
  const boton = event.target.closest('.btn-filtro');
  if (!boton || !seccionFiltros.contains(boton)) return;

  seccionFiltros.querySelectorAll('.btn-filtro').forEach(botonFiltro => {
    botonFiltro.classList.toggle('active', botonFiltro === boton);
  });

  filtroActual = boton.dataset.filtro;
  pintarTareas();
});

// Arrancar la aplicación
inicializarApp();
