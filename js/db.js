// Membuat Database Di IndexedDB
const databasePromise = idb => {
  const dbPromise = idb.open("premier-league", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("club_favorit")) {
      const timObjectStore = upgradeDb.createObjectStore("club_favorit", {
        keyPath: "id"
      });
      timObjectStore.createIndex("nama_club", "name", {
        unique: false
      });
    }

    if (!upgradeDb.objectStoreNames.contains("pemain_favorit")) {
      const timObjectStore = upgradeDb.createObjectStore("pemain_favorit", {
        keyPath: "id"
      });
      timObjectStore.createIndex("nama_pemain", "name", {
        unique: false
      });
    }
  });
  return dbPromise;
}

export default {
  databasePromise
}