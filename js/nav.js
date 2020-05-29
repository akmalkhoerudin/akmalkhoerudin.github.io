import './components/preloader.js';
import api from "./api.js";
import pwa from "./pwa.js";
import setDataFav from "./page-fav.js";

document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  let typeFavorit = "";

  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });


        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              //console.log("cek halaman yang dimuat: loadNav: " + page);

              loadPage(setupPage(page));
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);

  loadPage(setupPage(page));

  function setupPage(page) {
    if (page == "" || page == "#") {
      page = "home";
    } else if (page == "#club") {
      page = "club";
    } else if (page == "#matches") {
      page = "matches";
    } else if (page === "favorit") {
      page = "favorit";
    } else {
      typeFavorit = "";
    }
    return page;
  }

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      const content = document.querySelector("#body-content");

      if (this.readyState == 4) {
        if (page === "home") {
          api.getStandings();
        } else if (page === "club") {
          api.getClubs();
        } else if (page === "matches") {
          api.getMatches();
        } else if (page === "favorit") {
          setDataFav("club");
          setDataFav("pemain");
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page === 'home') {
            const slider = document.querySelectorAll('.slider');
            M.Slider.init(slider, {
              indicators: false,
              duration: 300,
              interval: 3000
            });
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  pwa.regSw();
  pwa.requestPermission();
});