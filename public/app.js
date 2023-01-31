
var map = L.map('map').setView([41.485522995425, 2.2745480117798], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  preferCanvas: true,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("get_data.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtenir les dades!");
    }
    return response.json();
  })
  .then((data) => {
    geojson = {
      type: "FeatureCollection",
      features: [],
    };

    for (i = 0; i < data.length; i++) {
      geojson.features.push({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [data[i].COORD_LON, data[i].COORD_LAT]
        },
        "properties": data[i]
      });
    }

    var markers = L.markerClusterGroup();
    markers.addLayer(L.geoJson(geojson, {
      pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
          radius: 7,
          color: '#0a75ad',
          fillOpacity: 0.5
        });
      },
    }));
    map.addLayer(markers);

  })