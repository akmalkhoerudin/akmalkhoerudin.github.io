import index from './indexeddb.js';
import api from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = Number(urlParams.get("id"));
  const iconFavorite = document.getElementById("iFavorite");
  let isFavorit = false;
  index.cekData("club_favorit", id).then(data => {
    console.log("statusData: resolve = " + data);
    iconFavorite.innerHTML = "favorite";
    index.getSavedDataById("club");
    isFavorit = true;
  }).catch(data => {
    console.log("statusData: reject = " + data);
    iconFavorite.innerHTML = "favorite_border";
    api.getClubById();
    isFavorit = false;
  })

  iconFavorite.onclick = () => {
    // console.log("Tombol FAB di klik.");
    if (isFavorit) {
      index.deleteDatafav("club_favorit", id);
      isFavorit = false;
    } else {
      const item = api.getClubById();
      item.then(club => {
        index.createDataFav("club", club);
      });
      isFavorit = true;
    }
  };
});