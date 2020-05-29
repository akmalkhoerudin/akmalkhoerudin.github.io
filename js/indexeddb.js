import db from './db.js';
import detail from './detail.js';

// Cek Data Dari IndexedDB
const cekData = (storeName, id) => {
  return new Promise((resolve, reject) => {
    db.databasePromise(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(data => {
        if (data != undefined) {
          resolve("Data Favorit");
        } else {
          reject("Bukan Data Favorit");
        }
      });
  });
}

// Menyiapkan Data Club Dan Pemain 
const createDataFav = (dataType, data) => {
  let storeName = "";
  let dataToSave = {};
  if (dataType === "pemain") {
    storeName = "pemain_favorit"
    dataToSave = {
      id: data.id,
      name: data.name,
      countryOfBirth: data.countryOfBirth,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      position: data.position,
      shirtNumber: data.shirtNumber
    }
  } else if (dataType === "club") {
    storeName = "club_favorit"
    dataToSave = {
      id: data.id,
      name: data.name,
      crestUrl: data.crestUrl,
      address: data.address,
      phone: data.phone,
      email: data.email,
      venue: data.venue,
      clubColors: data.clubColors,
      website: data.website,
      squad: data.squad
    }
  }

  // console.log(`data : ${dataToSave}`);
  db.databasePromise(idb).then(db => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(dataToSave);

    return tx.complete;
  }).then(() => {
    console.log("Data Saved Successfully");
    document.getElementById("iFavorite").innerHTML = "favorite";
    M.toast({
      html: 'Data Berhasil Difavoritkan!'
    });
  }).catch(() => {
    M.toast({
      html: 'Maaf, Terjadi Kesalahan!'
    });
  });
}

// Ngambil Data Dari IndexedDB By Id
const getDataById = (storeName, id) => {
  return new Promise((resolve, reject) => {
    db.databasePromise(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(data => {
        resolve(data);
      });
  });
}

// Ngambil Semua Data Dari IndexedDB
const getAllData = storeName => {
  return new Promise((resolve, reject) => {
    db.databasePromise(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.getAll();
      })
      .then(data => {
        resolve(data);
      });
  });
}

// Simpan Data Favorit
const getSavedDataById = dataType => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = Number(urlParams.get("id"));

  if (dataType === "club") {
    getDataById("club_favorit", idParam).then(data => {
      detail.detailClub(data);
      detail.detailClubSquad(data);
    })
  } else if (dataType === "pemain") {
    getDataById("pemain_favorit", idParam).then(player => {
      detail.detailPlayer(player);
    });
  }
}

// Hapus Data Dari IndexedDB
const deleteDatafav = (storeName, data) => {
  db.databasePromise(idb).then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.delete(data);
    return tx.complete;
  }).then(() => {
    console.log('Data Deleted Successfully');
    document.getElementById("iFavorite").innerHTML = "favorite_border";
    M.toast({
      html: 'Data Berhasil Dihapus Dari Favorit!'
    });
  }).catch(() => {
    M.toast({
      html: 'Maaf! Terjadi Kesalahan.!'
    });
  });
}


export default {
  cekData,
  createDataFav,
  getDataById,
  getAllData,
  getSavedDataById,
  deleteDatafav
}