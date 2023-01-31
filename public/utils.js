function arrayToGeoJSON(data) {
  var geojson = {
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

  return geojson
}

function marcadorCircular(feature, latlng) {
  return new L.CircleMarker(latlng, {
    radius: 7,
    color: '#0a75ad',
    fillOpacity: 0.5
  });
}

function popupObservacio(feature, layer) {
  var info = "<h3>" + feature.properties.NAME_SPECIES + "</h3>" +
    feature.properties.LATIN_SPECIES + "<br/>" +
    "Data: " + feature.properties.DATE + "<br/>" +
    "Observador: " + feature.properties.NAME + " " + feature.properties.SURNAME + "<br/>" +
    "Localitat: " + feature.properties.PLACE + "<br/>" +
    "Nombre: " + feature.properties.TOTAL_COUNT

  layer.bindPopup(info)
}