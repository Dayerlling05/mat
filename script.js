const gradoSelect = document.getElementById("grado");
const temaSelect = document.getElementById("tema");
const tituloTema = document.getElementById("titulo-tema");
const descripcion = document.getElementById("descripcion");
const ejerciciosDiv = document.getElementById("ejercicios");

function guardarDatos(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function cargarDatos(key) {
  const datos = localStorage.getItem(key);
  return datos ? JSON.parse(datos) : null;
}

// Obtener grados (users)
async function obtenerGrados() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Error al obtener nombres');
    const data = await res.json();
    guardarDatos('grados', data);
    return data;
  } catch {
    const offline = cargarDatos('grados');
    if (offline) return offline;
    alert('No hay conexión ni datos guardados para grados.');
    return [];
  }
}

// Obtener temas (posts) por userId = grado id
async function obtenerTemas(gradoId) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${gradoId}`);
    if (!res.ok) throw new Error('Error al obtener temas');
    const data = await res.json();
    guardarDatos(`temas_${gradoId}`, data);
    return data;
  } catch {
    const offline = cargarDatos(`temas_${gradoId}`);
    if (offline) return offline;
    alert('No hay conexión ni datos guardados para temas.');
    return [];
  }
}

// No hay ejercicios reales en esta API, pero usamos posts como "ejercicios" con título y body

// Al iniciar carga los grados
async function iniciar() {
  const grados = await obtenerGrados();

  gradoSelect.innerHTML = '<option value="">-- Elige un nombre --</option>';
  grados.forEach(grado => {
    const option = document.createElement('option');
    option.value = grado.id;
    option.textContent = grado.name; // simula nombre del grado
    gradoSelect.appendChild(option);
  });

    for (const grado of grados) {
    await obtenerTemas(grado.id); // Esto ya guarda en localStorage internamente
  }

  temaSelect.innerHTML = '<option value="">-- Primero elige un nombre --</option>';
  temaSelect.disabled = true;
  tituloTema.textContent = '';
  descripcion.textContent = '';
  ejerciciosDiv.innerHTML = '';
}

gradoSelect.addEventListener('change', async () => {
  const gradoId = gradoSelect.value;
  temaSelect.innerHTML = '<option value="">-- Elige un tema --</option>';
  temaSelect.disabled = true;
  tituloTema.textContent = '';
  descripcion.textContent = '';
  ejerciciosDiv.innerHTML = '';

  if (gradoId) {
    const temas = await obtenerTemas(gradoId);
    temas.forEach(tema => {
      const option = document.createElement('option');
      option.value = tema.id;
      option.textContent = tema.title.substring(0, 30); // tema corto
      temaSelect.appendChild(option);
    });
    temaSelect.disabled = false;
  }
});

temaSelect.addEventListener('change', () => {
  const temaId = temaSelect.value;
  const gradoId = gradoSelect.value;
  tituloTema.textContent = '';
  descripcion.textContent = '';
  ejerciciosDiv.innerHTML = '';

  if (!temaId) return;

  // Buscar el tema en localStorage (temas por grado)
  const temas = cargarDatos(`temas_${gradoId}`);
  if (!temas) return;

  const tema = temas.find(t => t.id == temaId);
  if (!tema) return;

  tituloTema.textContent = tema.title;
  descripcion.textContent = tema.body;

  // Como no hay ejercicios reales, solo mostramos el body como info
  ejerciciosDiv.innerHTML = '<p>(Esta API no tiene ejercicios reales)</p>';
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.log('Error registrando Service Worker:', err));

  // Código para eliminar service workers
  
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for(let registration of registrations) {
      if (registration.scope !== window.location.origin + '/') {
        registration.unregister();
    }
  }
  });
}
window.onload = iniciar;
