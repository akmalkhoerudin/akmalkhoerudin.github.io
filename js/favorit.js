// Tampil Data Club Favorit
const clubFav = data => {
  let clubFavHtml = `
    <li class="collection-header purple darken-4 white-text">
      <h4>Data Club Favorite </h4>
    </li>
  `;

  if (data.length === 0) {
    clubFavHtml += `
      <li class="collection-item left-align">
        <div>Club Favorite Tidak Ada.</div>
      </li>
    `;
  } else {
    data.forEach(club => {
      clubFavHtml += `
          <li class="collection-item left-align">
            <div>${club.name}<a href="./detail-club.html?id=${club.id}" class="secondary-content"><i class="material-icons">arrow_forward</i></a></div>
          </li>
        `;
    });
  }
  document.getElementById("preloader").style.display = 'none';
  document.getElementById("club-favorit").innerHTML = clubFavHtml;
}

// Tampil Data Pemain Favorit
const playerFav = data => {
  let playerFavHtml = `
    <li class="collection-header purple darken-4 white-text">
      <h4>Data Player Favorite </h4>
    </li>
  `;

  if (data.length === 0) {
    playerFavHtml += `
      <li class="collection-item left-align">
        <div>Player Favorite Tidak Ada.</div>
      </li>
    `;
  } else {
    data.forEach(pemain => {
      playerFavHtml += `
        <li class="collection-item left-align">
          <div>${pemain.name}<a href="./detail-pemain.html?id=${pemain.id}" class="secondary-content"><i class="material-icons">arrow_forward</i></a></div>
        </li>
      `;
    });
  }
  document.getElementById("preloader").style.display = 'none';
  document.getElementById("player-favorit").innerHTML = playerFavHtml;
}

export default {
  clubFav,
  playerFav
}