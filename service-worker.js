importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox Berhasil Dimuat`);

  workbox.precaching.precacheAndRoute([{
      url: "/",
      revision: "1",
    },
    {
      url: "/index.html",
      revision: "1",
    },
    {
      url: "/detail-club.html",
      revision: "1",
    },
    {
      url: "/detail-pemain.html",
      revision: "1",
    },
    {
      url: "/manifest.json",
      revision: "2",
    },
    {
      url: "/push.js",
      revision: "1",
    },
    {
      url: "/pages/home.html",
      revision: "1",
    },
    {
      url: "/pages/club.html",
      revision: "1",
    },
    {
      url: "/pages/matches.html",
      revision: "1",
    },
    {
      url: "/pages/favorit.html",
      revision: "1",
    },
    {
      url: "/css/materialize.min.css",
      revision: "1",
    },
    {
      url: "/js/components/preloader.js",
      revision: "1",
    },
    {
      url: "/js/api.js",
      revision: "1",
    },
    {
      url: "/js/cek-club.js",
      revision: "1",
    },
    {
      url: "/js/cek-pemain.js",
      revision: "1",
    },
    {
      url: "/js/db.js",
      revision: "1",
    },
    {
      url: "/js/detail.js",
      revision: "1",
    },
    {
      url: "/js/favorit.js",
      revision: "2",
    },
    {
      url: "/js/idb.js",
      revision: "1",
    },
    {
      url: "/js/indexeddb.js",
      revision: "1",
    },
    {
      url: "/js/materialize.min.js",
      revision: "1",
    },
    {
      url: "/js/nav.js",
      revision: "1",
    },
    {
      url: "/js/page-fav.js",
      revision: "1",
    },
    {
      url: "/js/pwa.js",
      revision: "1",
    },
    {
      url: "/js/view.js",
      revision: "1",
    },
    {
      url: "/images/favicon.png",
      revision: "1",
    },
    {
      url: "/images/logo-pl-white.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-72x72.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-96x96.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-128x128.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-144x144.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-152x152.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-192x192.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-384x384.png",
      revision: "1",
    },
    {
      url: "/images/icons/icon-512x512.png",
      revision: "1",
    },
    {
      url: "/images/slider/1.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/2.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/3.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/4.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/5.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/6.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/7.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/8.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/9.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/10.jpg",
      revision: "1",
    },
    {
      url: "/images/slider/11.jpg",
      revision: "1",
    },
  ], {
    ignoreURLParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    new workbox.strategies.StaleWhileRevalidate()
  );

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "pages",
    })
  );
} else {
  console.log(`Workbox Gagal Dimuat`);
}

// Push Notification
self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
    body: body,
    icon: "images/favicon.png",
    badge: "images/favicon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});