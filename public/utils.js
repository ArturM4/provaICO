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
  var info = "<h5 class=text_negre>" + feature.properties.NAME_SPECIES + "</h5>" +
    feature.properties.LATIN_SPECIES + "<br/>" +
    "Data: " + feature.properties.DATE + "<br/>" +
    "Observador: " + feature.properties.SURNAME + " " + feature.properties.NAME + "<br/>" +
    "Localitat: " + feature.properties.PLACE + "<br/>" +
    "Nombre: " + feature.properties.TOTAL_COUNT

  layer.bindPopup(info)
}

function carregarSelect(data) {
  var especies = []
  var htmlEspeies = "<option value=tot>Selecciona una espècie</option>"
  var anys = []
  var htmlAnys = "<option value=tot>Selecciona un any</option>"
  data.forEach(obs => {
    if (!especies.includes(obs.NAME_SPECIES)) {
      especies.push(obs.NAME_SPECIES)
      htmlEspeies += '<option value="' + obs.ID_SPECIES + '">' + obs.NAME_SPECIES + '</option>'
    }
    var any = new Date(obs.DATE).getFullYear()
    if (!anys.includes(any)) {
      htmlAnys += '<option>' + any + '</option>'
      anys.push(any)
    }
  });

  document.getElementById('selectEspecie').innerHTML = htmlEspeies
  document.getElementById('selectAny').innerHTML = htmlAnys
}

function obtenirParametres() {
  var any = document.getElementById('selectAny').value
  var especie = document.getElementById('selectEspecie').value
  if (any == 'tot') any = null
  if (especie == 'tot') especie = null

  var url = ""
  if (any && especie)
    url += "?any=" + any + "&especie=" + especie
  else if (any)
    url += "?any=" + any
  else if (especie)
    url += "?especie=" + especie
  return url
}