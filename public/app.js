
var map = L.map('map').setView([41.483022995325, 2.2685480117798], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
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

    //de moment mostra de 100 marcadors, no pot carregar 13k.
    const slicedArray = geojson.features.slice(0, 100);
    L.geoJSON(slicedArray).addTo(map);
  })