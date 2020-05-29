var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BA9IARuSQ111GAGmkGq1kzYKGojkrkB0gnVQQkB0a7C3iVNUR5As3VZ0_7H8Emyv8QDyqmPBATQ2ir45C6O0JZo",
  privateKey: "VuqNW2fGYpVEKy7Ul983nRsi9yPiL-mQafkToiQ7KAs",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fGd3ZpeK_7M:APA91bHalT_qLSiycVGIjBP8Dxv0pALBuQA0YmMV1houeXzr-4maYOMVdwadSbkuelVh_kjkhy_TtTQrdS8nk-6q6BBiB-4kHDAJ4ivCcJgTgx0XNDl4fdOJAcm6FYC6nUZ7JR84S8k2",
  keys: {
    p256dh:
      "BON871cP/T2xdH7HCWKZMqU4DWRyp5YE/G/pcYJ9qSaMPjC9h1ix+nxZ8jqIYkvSANdxe/OJmC/SbUaZ4mvZqDI=",
    auth: "y5lK+4CgNbXvyqbC3I6rjA==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "209685756573",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
