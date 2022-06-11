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
        L.marker(e.latlng, {icon:currentLocationIcon}).addTo(map).bindPopup(`<h4>YOU ARE HERE</h4>`).openPopup();
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

    // create weather group
    let weatherForecast = L.layerGroup();

    for (let attraction of attractionResponse.data.features) {
        // create coordinates of markers
        let lat = attraction.properties.Latitude;
        let lng = attraction.properties.Longtitude;
        // create img
        let photo = attraction.properties['PHOTOURL'].split('"')[3];

        // culture overlay
        if (attraction.properties['PHOTOURL'].includes('culture') || attraction.properties['PHOTOURL'].includes('places-to-see')) {
            L.marker([lat, lng], {icon:cultureIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(cultureMarker);
            cultureMarker.addTo(cultureGroup);
        }

        // recreation overlay
        else if (attraction.properties['PHOTOURL'].includes('recreation')) {
            L.marker([lat, lng], {icon: recreationIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(recreationMarker);
            recreationMarker.addTo(recreationGroup);
        }

        // arts overlay
        else if (attraction.properties['PHOTOURL'].includes('arts')) {
            L.marker([lat, lng], {icon:artsIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(artsMarker);
            artsMarker.addTo(artsGroup);
        }

        // history overlay
        else if (attraction.properties['PHOTOURL'].includes('history')) {
            L.marker([lat, lng], {icon:historyIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(historyMarker);
            historyMarker.addTo(historyGroup);
        }

        // nature overlay
        else if (attraction.properties['PHOTOURL'].includes('nature')) {
            L.marker([lat, lng], {icon:natureIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(natureMarker);
            natureMarker.addTo(natureGroup);
        }

        // architecture overlay
        else if (attraction.properties['PHOTOURL'].includes('architecture')) {
            L.marker([lat, lng], {icon:architectureIcon}).bindPopup(`
            <h4>${attraction.properties.Name}</h4>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Opening Hours:</strong> ${attraction.properties['Opening Hours']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(architectureMarker);
            architectureMarker.addTo(architectureGroup);
        }

    // add the overlays to checkboxes
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

    // document.querySelectorAll('.marker').addEventListener('click', function(){
    //     map.flyTo(coordinate, 16);
    //     marker.openPopup();
    // })

    // Weather API
    let weatherOverlay = L.layerGroup();
    let response = await axios.get(WEATHER_API_URL);

    let weatherArray = [];
    for (let weather of response.data.items[0].forecasts){
        weatherArray.push(weather.forecast);
    }

    let areaCoordinates = response.data.area_metadata;

    for (let i = 0; i < weatherArray.length; i++){
        areaCoordinates[i].forecast = weatherArray[i]; 
    }

    for (let area of areaCoordinates){
        let lat = area.label_location.latitude;
        let lng = area.label_location.longitude;
        
        if (area.forecast == 'Cloudy'){
            L.marker([lat,lng],{icon:cloudy}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair & Warm' || area.forecast == 'Fair (Day)'){
            L.marker([lat,lng],{icon:sunny}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Day)'){
            L.marker([lat,lng],{icon:cloudyDay}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Night)'){
            L.marker([lat,lng],{icon:cloudyNight}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair (Night)'){
            L.marker([lat,lng],{icon:night}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Light Showers' || area.forecast == 'Light Rain'){
            L.marker([lat,lng],{icon:drizzle}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Showers' || area.forecast == 'Moderate Rain'){
            L.marker([lat,lng],{icon:showers}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Thundery Showers' || area.forecast == 'Heavy Thundery Showers'){
            L.marker([lat,lng],{icon:thunder}).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        // create eventlistener for weather
        document.querySelector("#weather-toggle").addEventListener('click', function(){
            if (map.hasLayer(weatherOverlay)) {
                map.removeLayer(weatherOverlay);
            }
            else {
                weatherOverlay.addTo(map);
            }
        })

    }
   

}

main();

let map1 = document.querySelector('#map-container');
let landingPage = document.querySelector('#home');
document.querySelector('#btn-attraction-search').addEventListener('click', function(){
    // landingPage.style.display = 'none';
    map1.className = '';
})