import view from './view.js';
import detail from './detail.js';

const baseUrl = "https://api.football-data.org/v2/";
const apiKey = "fee9fb44e0e44ad1bb7dbc6daeb2b1fd";
const idLiga = "2021";
const urlKlasemen = `${baseUrl}competitions/${idLiga}/standings?standingType=TOTAL`;
const urlTim = `${baseUrl}competitions/${idLiga}/teams/`;
const urlDetail = `${baseUrl}teams/`;
const urlPemain = `${baseUrl}players/`;
const urlMatches = `${baseUrl}matches?competitions=${idLiga}`;

// Fetch API
const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  });
};

// Status dari Fetch API
const status = (res) => {
  if (res.status !== 200) {
    console.log(`Error : ${res.status}`);
    return Promise.reject(new Error(res.statusText));
  } else {
    return Promise.resolve(res);
  }
};

// Parsing JSON To Array
const json = (res) => {
  return res.json();
};

// Blok Menangani Bagian Error 
const error = (err) => {
  console.log(`Error : ${err}`);
};

// Mengambil data Klasmen Dari Server
const getStandings = () => {
  // Ngambil Asset/Data Dari Cache
  if ('caches' in window) {
    caches.match(urlKlasemen).then(res => {
      if (res) {
        res.json().then(data => {
          view.vStandings(data);
        })
      }
    })
  }
  // Ngambil Data Dari Server
  fetchApi(urlKlasemen)
    .then(status)
    .then(json)
    .then(data => {
      view.vStandings(data);
    })
    .catch(error);
};

// Mengambil Data Clubs Dari Server
const getClubs = () => {
  // Mengambil Data/Asset Dari Cache
  if ('caches' in window) {
    caches.match(urlTim).then(res => {
      if (res) {
        res.json().then(data => {
          view.vClubs(data);
        })
      }
    })
  }
  // Ambil Data Dari Server
  fetchApi(urlTim)
    .then(status)
    .then(json)
    .then(data => {
      view.vClubs(data)
    })
    .catch(error);
}

// Mengambil Data Detail Club Dengan ID
const getClubById = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(urlDetail + idParam).then(res => {
        if (res) {
          res.json().then(data => {
            detail.detailClub(data);
            detail.detailClubSquad(data);
            resolve(data);
          })
        }
      })
    }
    fetchApi(urlDetail + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        detail.detailClub(data);
        detail.detailClubSquad(data);
        resolve(data)
      })
      .catch(error);
  });
}

// Mengambil Data Pemain Dari Server
const getPlayer = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(urlPemain + idParam).then(res => {
        if (res) {
          res.json().then(data => {
            detail.detailPlayer(data);
            resolve(data);
          })
        }
      })
    }
    fetchApi(urlPemain + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        detail.detailPlayer(data);
        resolve(data);
      })
      .catch(error);
  });
}

// Mengambil Data Matches Dari Sever
const getMatches = () => {
  // Ambil Data/Asset Dari Cache
  if ('caches' in window) {
    caches.match(urlMatches).then(res => {
      if (res) {
        res.json().then(data => {
          view.vMatches(data);
        })
      }
    })
  }
  // Ngambil Data/Asset Dari Server
  fetchApi(urlMatches)
    .then(status)
    .then(json)
    .then((data) => {
      view.vMatches(data);
    })
    .catch(error);
}

export default {
  getStandings,
  getClubs,
  getClubById,
  getPlayer,
  getMatches
}