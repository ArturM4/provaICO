
//init mapa
var map = L.map('map').setView([41.485522995425, 2.2745480117798], 14);
var marcadors;

//layer del mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  preferCanvas: true,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//carrega inicial dels marcadors
fetch("get_data.php")
  .then((response) => {
    if (!response.ok)
      throw new Error("Error al obtenir les dades!");
    return response.json();
  })
  .then((data) => {
    //omplir els selectors amb les possibles dades (anys i espècies)
    carregarSelect(data)
    //afegir els marcadors amb les dades obtingudes
    afegirMarcadors(data)
  })

//carrega inicial de la taula resum
fetch("get_count.php")
  .then((response) => {
    if (!response.ok)
      throw new Error("Error al obtenir les dades!");
    return response.json();
  })
  .then((data) => {
    omplirTaulaResum(data)
  })


document.getElementById('selectEspecie').addEventListener("change", filtrar);
document.getElementById('selectAny').addEventListener("change", filtrar);

//omplir la taula resum
function omplirTaulaResum(data) {
  var htmlTaula = "";
  data.forEach(fila => {
    htmlTaula += "<tr><td>" + fila.any + "</td><td>" + fila.setmana + "</td><td>" + fila.especie + "</td><td>" + fila.total + "</td></tr>"
  });
  document.getElementById('bodyTaulaResum').innerHTML = htmlTaula;
}

//al filtrar per un camp es criden les consultes a la base de dades i s'actualitza el mapa i la taula resum
function filtrar(e) {
  marcadors.clearLayers()
  var param = obtenirParametres()

  //marcadors
  fetch("get_data.php" + param)
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al obtenir les dades!");
      return response.json();
    })
    .then((data) => {
      afegirMarcadors(data)
    })


  //taula resum
  fetch("get_count.php" + param)
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al obtenir les dades!");
      return response.json();
    })
    .then((data) => {
      omplirTaulaResum(data)
    })
}

function afegirMarcadors(data) {
  var geojson = arrayToGeoJSON(data)
  marcadors = L.markerClusterGroup();
  marcadors.addLayer(L.geoJson(geojson, {
    pointToLayer: marcadorCircular,
    onEachFeature: popupObservacio
  }));
  map.addLayer(marcadors);
}