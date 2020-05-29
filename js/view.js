// View Data Standings Dari API
const vStandings = data => {
  let standingsHTML = "";
  data = data.standings[0].table;
  data.forEach(dataTeam => {
    let urlTeamImage = dataTeam.team.crestUrl;
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
    standingsHTML += `
      <tr>
        <td>${dataTeam.position}</td>
        <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
        <td>${dataTeam.team.name}</td>
        <td>${dataTeam.playedGames}</td>
        <td>${dataTeam.won}</td>
        <td>${dataTeam.draw}</td>
        <td>${dataTeam.lost}</td>
        <td>${dataTeam.goalsFor}</td>
        <td>${dataTeam.goalsAgainst}</td>
        <td>${dataTeam.goalDifference}</td>
        <td>${dataTeam.points}</td>
      </tr>
    `;
  });
  document.getElementById("preloader").style.display = 'none';
  document.getElementById("standings").innerHTML = standingsHTML;
}

// View Data Clubs Dari API
const vClubs = data => {
  let clubsHTML = "";
  data = data.teams;
  data.forEach(club => {
    clubsHTML += `
      <div class="col s12 l6 m6">
        <div class="card-panel center text-grey">
          <a href="./detail-club.html?id=${club.id}">
            <img src="${club.crestUrl}" alt="${club.crestUrl}" class="responsive-img" style="width:100px; height:100px">
            <h6 class="light text-grey">${club.name}</h6>
          </a>
        </div>
      </div>
    `;
  });
  document.getElementById("preloader").style.display = 'none';
  document.getElementById("clubs").innerHTML = clubsHTML;
}

// View Data Matches dari API
const vMatches = data => {
  let matchesHTML = "";
  data = data.matches;
  if (data.length === 0) {
    matchesHTML += `
      <div class="col s8 offset-s2">
        <div class="card-panel purple darken-4 center">
          <h4 class="white-text">Data MatchDay Tidak Ada</h4>
        </div>
      </div>
    `;
  } else {
    data.forEach((match) => {
      matchesHTML += `
          <div class="col s12">
            <div class="card-panel center">
              <div class="row">
                <div class="col m4 s4">
                    <u>${match.homeTeam.name}</u>
                </div>
                <div class="col m4 s4">
                    <strong><span> VS </span></strong>
                </div>
                <div class="col m4 s4">
                    ${match.awayTeam.name}
                </div>
              </div>
            </div>
          </div>
        `;
    });
  }
  document.getElementById("preloader").style.display = 'none';
  document.getElementById("matches").innerHTML = matchesHTML;
}

export default {
  vStandings,
  vClubs,
  vMatches
}