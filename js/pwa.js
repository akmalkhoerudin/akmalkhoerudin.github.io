// REGISTER SERVICE WORKER
const regSw = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => console.log('Register Berhasil'))
        .catch(() => console.log('Register Tidak Berhasil'))
    })
  } else {
    console.log('Service Worker it is not supported!')
  }
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Request Notification
const requestPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission()
      .then(result => {
        if (result === "denied") {
          console.log("Fitur Notifikasi Tidak Diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna Menutup Kotak Dialog Permintaan Ijin.");
          return;
        }

        if (('PushManager' in window)) {
          navigator.serviceWorker.getRegistration().then(function (registration) {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BA9IARuSQ111GAGmkGq1kzYKGojkrkB0gnVQQkB0a7C3iVNUR5As3VZ0_7H8Emyv8QDyqmPBATQ2ir45C6O0JZo")
            }).then(function (subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function (e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
            });
          });
        }
      });
  }
}

export default {
  regSw,
  requestPermission
}