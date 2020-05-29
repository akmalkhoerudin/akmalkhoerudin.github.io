// Tampil Data Club By Id
const detailClub = data => {
  let detailClubHTML = "";
  detailClubHTML += `
    <div class="col s12 centered">
      <img src="${data.crestUrl}" class="responsive-img" style="width:250px; height:250px;" alt="${data.name}">
      <h3 class="light">${data.name}</h3>
    </div>
    
    <div class="col s12 m4">
      <div class="card-panel purple darken-4">
        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Nama</th>
          </tr>
          <tr>
            <td class="white-text">${data.name}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Alamat</th>
          </tr>
          <tr>
            <td class="white-text">${data.address}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">No Telp</th>
          </tr>
          <tr>
            <td class="white-text">${data.phone}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Email</th>
          </tr>
          <tr>
            <td class="white-text">${data.email}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Stadion</th>
          </tr>
          <tr>
            <td class="white-text">${data.venue}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Warna Club</th>
          </tr>
          <tr>
            <td class="white-text">${data.clubColors}</td>
          </tr>
        </table>
        <hr style="margin: 0px;">

        <table class="striped">
          <tr>
            <th class="purple darken-4 orange-text">Website</th>
          </tr>
          <tr>
            <td class="white-text">${data.website}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="col s12 m8">
      <div class="card-panel">
        <h4 class="light left-align">SQUAD</h4>
        <hr><br>
        <table class="striped higlight">
          <thead>
            <tr>
              <th>Nama</th>
              <th class="right-align">Posisi</th>
            </tr>
          </thead>
          <tbody id="squad">

          </tbody>
        </table>
      </div>
    </div>
  `;
  document.getElementById("club").innerHTML = detailClubHTML;
}
// Tampil Data Pemain
const detailClubSquad = data => {
  data = data.squad;
  let detailSquadHTML = "";
  data.forEach(squadTeam => {
    detailSquadHTML += `
      <tr>
        <td>
          <a href="./detail-pemain.html?id=${squadTeam.id}">
            ${squadTeam.name}
          </a>
        </td>
        <td class="right-align">
          <a href="./detail-pemain.html?id=${squadTeam.id}">
            ${squadTeam.position}
          </a>
        </td>
      </tr>
    `;
  });
  document.getElementById("squad").innerHTML = detailSquadHTML;
}

// Tampil Data Detail Pemain
const detailPlayer = data => {
  let detailPlayerHTML = "";

  detailPlayerHTML += `
    <div class="card-panel">
      <table class="striped centered highlight">
        <tr>
          <th>Nama</th>
          <td>:</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <th>Tempat Lahir</th>
          <td>:</td>
          <td>${data.countryOfBirth}</td>
        </tr>
        <tr>
          <th>Tanggal Lahir</th>
          <td>:</td>
          <td>${data.dateOfBirth}</td>
        </tr>
        <tr>
          <th>Kebangsaan</th>
          <td>:</td>
          <td>${data.nationality}</td>
        </tr>
        <tr>
          <th>Posisi</th>
          <td>:</td>
          <td>${data.position}</td>
        </tr>
        <tr>
          <th>No Punggung</th>
          <td>:</td>
          <td>${data.shirtNumber}</td>
        </tr>
      </table>
    </div>
  `;
  document.getElementById("detPemain").innerHTML = detailPlayerHTML;
}

export default {
  detailClub,
  detailClubSquad,
  detailPlayer
}