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
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

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

    if (tarea.completada) {
      botonEstado.textContent = 'Marcar pendiente';
    } else {
      botonEstado.textContent = 'Completar';
    }

    // Añadir el título y el botón al <li>
    elementoTarea.appendChild(textoTarea);
    elementoTarea.appendChild(botonEstado);

    // Añadir el <li> a la lista
    listaContenedor.appendChild(elementoTarea);
  });
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // TODO: Capturar los valores de los inputs de forma segura
  // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  // TODO: Volver a invocar pintarTareas() y resetear el formulario
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (event) => {
    // Quitar clase active al botón anterior y ponérsela al pulsado
    document.querySelector('.btn-filtro.active').classList.remove('active');
    event.target.classList.add('active');

    // TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
    // TODO: Invocar pintarTareas() para refrescar la pantalla
  });
});

// Arrancar la aplicación
inicializarApp();