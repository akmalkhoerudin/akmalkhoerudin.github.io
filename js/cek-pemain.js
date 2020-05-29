import index from './indexeddb.js';
import api from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = Number(urlParams.get("id"));
  const iconFavorite = document.getElementById("iFavorite");
  let isFavorit = false;
  index.cekData("pemain_favorit", id).then(data => {
    console.log("statusData: resolve = " + data);
    iconFavorite.innerHTML = "favorite";
    index.getSavedDataById("pemain");
    isFavorit = true;
  }).catch(data => {
    console.log("statusData: reject = " + data)
    iconFavorite.innerHTML = "favorite_border"
    api.getPlayer()
    isFavorit = false;
  })

  iconFavorite.onclick = () => {
    // console.log("Tombol FAB di klik.");
    if (isFavorit) {
      index.deleteDatafav("pemain_favorit", id);
      isFavorit = false;
    } else {
      const item = api.getPlayer();
      item.then(function (pemain) {
        index.createDataFav("pemain", pemain);
      });
      isFavorit = true
    }
  };
});