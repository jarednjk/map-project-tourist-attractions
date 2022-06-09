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

    map.locate({ setView: false });

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

// create museum icon
let artsIcon = L.icon ({
    iconUrl: 'img/arts.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let cultureIcon = L.icon ({
    iconUrl: 'img/culture.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let historyIcon = L.icon ({
    iconUrl: 'img/culture.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let architectureIcon = L.icon ({
    iconUrl: 'img/culture.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let natureIcon = L.icon ({
    iconUrl: 'img/nature.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let recreationIcon = L.icon ({
    iconUrl: 'img/recreation.png',
    iconSize: [30, 30],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let map = initMap();

async function main() {

    // window.addEventListener('DOMContentLoaded', async function () {
    //     let searchResultLayer = L.layerGroup();
    //     searchResultLayer.addTo(map)

    //     document.querySelector('#btnSearch').addEventListener('click', async function () {

    //         // clear existing markers from the search result layer
    //         searchResultLayer.clearLayers(); //<-- will delete all layers inside it

    //         // clear existing search results
    //         document.querySelector('#results').innerHTML = "";

    //         let query = document.querySelector('#txtSearch').value;
    //         let latlng = map.getBounds().getCenter();
    //         let locations = await search(latlng.lat, latlng.lng, query, 4000);
    //         for (let result of locations.results) {

    //             // create markers and put on map
    //             let lat = result.geocodes.main.latitude;
    //             let lng = result.geocodes.main.longitude;

    //             let marker = L.marker([lat, lng]).addTo(searchResultLayer);

    //             marker.bindPopup(`<h1>${result.name}</h1>
    //            <p>${result.location.address} 
    //            ${result.location.address_extended ? ", " + result.location.address_extended
    //                     : ""}</p>`)

    //             // create the search result entry and display under the search
    //             let resultElement = document.createElement('div');
    //             resultElement.className = "search-result";
    //             resultElement.innerHTML = result.name;
    //             resultElement.addEventListener('click', function () {
    //                 map.flyTo([lat, lng], 16)
    //                 marker.openPopup();
    //             })

    //             document.querySelector("#results").appendChild(resultElement);
    //         }
    //     })
    // })

    let attractionResponse = await axios.get('data/tourism.geojson');


    // create culture group
    // places-to-see
    let cultureMarker = L.markerClusterGroup();
    let artsMarker = L.markerClusterGroup();
    let historyMarker = L.markerClusterGroup();
    let natureMarker = L.markerClusterGroup();
    let architectureMarker = L.markerClusterGroup();
    let recreationMarker = L.markerClusterGroup();

    let cultureGroup = L.layerGroup();
    let artsGroup = L.layerGroup();
    let historyGroup = L.layerGroup();
    let natureGroup = L.layerGroup();
    let architectureGroup = L.layerGroup();
    let recreationGroup = L.layerGroup();

    // <a target="_blank" href="http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/arts/1095-national-gallery-singapore-carousel-01-rec.jpg">www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/arts/1095-national-gallery-singapore-carousel-01-rec.jpg</a>

    for (let attraction of attractionResponse.data.features) {
        let lat = attraction.properties.Latitude;
        let lng = attraction.properties.Longtitude;
        let photo = attraction.properties['PHOTOURL'].split('"')[3];
        // let img = attraction.properties['PHOTOURL']
        if (attraction.properties['PHOTOURL'].includes('culture') || attraction.properties['PHOTOURL'].includes('places-to-see')) {
            L.marker([lat, lng], {icon:cultureIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(cultureMarker);
            cultureMarker.addTo(cultureGroup);
        }

        else if (attraction.properties['PHOTOURL'].includes('recreation')) {
            L.marker([lat, lng], {icon: recreationIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(recreationMarker);
            recreationMarker.addTo(recreationGroup);
        }

        else if (attraction.properties['PHOTOURL'].includes('arts')) {
            L.marker([lat, lng], {icon:artsIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(artsMarker);
            artsMarker.addTo(artsGroup);
        }

        else if (attraction.properties['PHOTOURL'].includes('history')) {
            L.marker([lat, lng], {icon:historyIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(historyMarker);
            historyMarker.addTo(historyGroup);
        }

        else if (attraction.properties['PHOTOURL'].includes('nature')) {
            L.marker([lat, lng], {icon:natureIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(natureMarker);
            natureMarker.addTo(natureGroup);
        }

        else if (attraction.properties['PHOTOURL'].includes('architecture')) {
            L.marker([lat, lng], {icon:architectureIcon}).bindPopup(`
            <h2>${attraction.properties.Name}</h2>
            <img src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(architectureMarker);
            architectureMarker.addTo(architectureGroup);
        }

    }
    let overlays = {
        'Culture': cultureGroup,
        'Arts': artsGroup,
        'History': historyGroup,
        'Nature': natureGroup,
        'Architecture': architectureGroup,
        'Recreation': recreationGroup
    }

    L.control.layers({}, overlays).addTo(map);
    cultureGroup.addTo(map);
    artsGroup.addTo(map);
    historyGroup.addTo(map);
    natureGroup.addTo(map);
    architectureGroup.addTo(map);
    recreationGroup.addTo(map);

}

main();
