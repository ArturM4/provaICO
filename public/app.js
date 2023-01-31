
var map = L.map('map').setView([41.485522995425, 2.2745480117798], 14);
var marcadors;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  preferCanvas: true,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//carrega inicial
fetch("get_data.php")
  .then((response) => {
    if (!response.ok)
      throw new Error("Error al obtenir les dades!");
    return response.json();
  })
  .then((data) => {
    carregarSelect(data)
    afegirMarcadors(data)
  })

document.getElementById('selectEspecie').addEventListener("change", filtrar);
document.getElementById('selectAny').addEventListener("change", filtrar);

function filtrar(e) {
  marcadors.clearLayers()
  var url = obtenirURL()

  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al obtenir les dades!");
      return response.json();
    })
    .then((data) => {
      afegirMarcadors(data)
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