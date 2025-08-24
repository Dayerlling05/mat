
function guardarDatos(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function cargarDatos(key) {
  const datos = localStorage.getItem(key);
  return datos ? JSON.parse(datos) : null;
}

let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');

btnInstall.hidden = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

btnInstall.addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('App instalada');
    }
    deferredPrompt = null;
    btnInstall.hidden = true;
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.log('Error registrando Service Worker:', err));

  navigator.serviceWorker.getRegistrations().then(registrations => {
    for(let registration of registrations) {
      if (registration.scope !== window.location.origin + '/') {
        registration.unregister();
    }
  }
  });

}

