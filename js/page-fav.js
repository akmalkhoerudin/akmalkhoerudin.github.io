import index from "./indexeddb.js";
import favorit from "./favorit.js";

function setDataFav(dataType) {
  if (dataType === "pemain") {
    index.getAllData("pemain_favorit").then((data) => {
      favorit.playerFav(data);
    });
  } else if (dataType === "club") {
    index.getAllData("club_favorit").then((data) => {
      favorit.clubFav(data);
    });
  }
}
export default setDataFav;