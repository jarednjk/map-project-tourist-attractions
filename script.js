// Create map
function initMap() {
    let map = L.map('map').setView([1.3521, 103.8198], 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

map.locate({setView: false});

function onLocationFound(e) {
    var radius = e.accuracy;
    L.marker(e.latlng,).addTo(map).bindPopup(`<h1>YOU ARE HERE</h1>`).openPopup();
    L.circle(e.latlng, 2000).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);
    return map;
}

let map = initMap();

async function main() {
    let attractionResponse = await axios.get('data/tourism.geojson');

    let attractionLayer = L.geoJson(attractionResponse.data, {
        "onEachFeature": function(feature, layer) {
            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.description;
            let columns = divElement.querySelectorAll('td');
            let photo = columns[6].innerHTML;
            let attractionName = columns[13].innerHTML;
            let address = columns[21].innerHTML;
            let description = columns[9].innerHTML;
            let openingHours = columns[31].innerHTML;
            layer.bindPopup(`
            <img src='${photo}'>
            <h2>${attractionName}</h2>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Opening Hours:</strong> ${openingHours}</p>
            <p><strong>Description:</strong> ${description}</p>
            `);
        }
    }).addTo(map);

}
main();