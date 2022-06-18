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
        L.marker(e.latlng, { icon: currentLocationIcon }).addTo(map).bindPopup(`<h4>YOU ARE HERE</h4>`).openPopup();
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

 // email

    document.querySelector('#email-submit').addEventListener('click', function(){
        let isEmailInvalid = false;
        let email = document.querySelector('#txt-email').value;

        if (!email.includes('@') || !email.includes('.')) {
            isEmailInvalid = true;
        }

        if (isEmailInvalid) {
            document.querySelector('#txtEmailError').innerHTML = `<small>Please enter a valid email</small>`;
            document.querySelector('#txtEmailError').style.color = "red";
        }
        else {
            document.querySelector('#txtEmailError').innerHTML = "";   
        }
    })

    let attractionResponse = await axios.get('data/tourism.geojson');

    // create attraction cluster and group
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
    
    let attractionArray = attractionResponse.data.features.map((obj)=>{
        return {
            name: obj.properties.Name,
            coordinates: [obj.properties.Latitude, obj.properties.Longtitude]
        }
    });

    // create search bar 
    let searchBar = document.querySelector('#attraction-search');
    
    // see if searchstring is found in the array
    searchBar.addEventListener('keyup', (e) => {
        const resultsHeader = document.getElementById("results-header");
        resultsHeader.innerHTML = '';
        
        let searchString = e.target.value.toLowerCase();
        let filteredAttractions = attractionArray.filter(function(elem){
            return (elem.name.toLowerCase().includes(searchString));
        });
        console.log(filteredAttractions);
        
        if (searchString.length <= 1) {
            document.querySelector('#results-header').innerHTML = "";
        } else {
            if (filteredAttractions.length >= 1) {
                for (let i=0; i<filteredAttractions.length; i++) {
                    // let marker = L.marker(filteredAttractions[i].coordinates);
                    // marker.bindPopup(`<h4>${filteredAttractions[i].name}</h4>`)
                    // marker.addTo(map);

                    let searchResults = document.createElement('li');
                    searchResults.style.listStyleType = 'none';
                    document.querySelector('#results-header').appendChild(searchResults);
                    searchResults.id = 'attraction-' + i
                    searchResults.innerHTML = `${filteredAttractions[i].name}`;
                    
                    // flyto coordinates
                    document.querySelector(`#attraction-${i}`).addEventListener('click', function(){
                        map.flyTo(filteredAttractions[i].coordinates , 16)
                        marker.openPopup();
                    })
                }
            } 
            else {
                document.querySelector('#results-header').innerHTML = "";
            }
        }
    });



    for (let attraction of attractionResponse.data.features) {
        // create coordinates of markers
        let lat = attraction.properties.Latitude;
        let lng = attraction.properties.Longtitude;
        // create img
        let photo = attraction.properties['PHOTOURL'].split('"')[3];

        // culture overlay
        if (attraction.properties['PHOTOURL'].includes('culture') || attraction.properties['PHOTOURL'].includes('places-to-see')) {
            let marker = L.marker([lat, lng], { icon: cultureIcon}).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(cultureMarker);
            cultureMarker.addTo(cultureGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }

        // recreation overlay
        else if (attraction.properties['PHOTOURL'].includes('recreation')) {
            let marker = L.marker([lat, lng], { icon: recreationIcon, autoPanOnFocus: true }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(recreationMarker);
            recreationMarker.addTo(recreationGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }

        // arts overlay
        else if (attraction.properties['PHOTOURL'].includes('arts')) {
            let marker = L.marker([lat, lng], { icon: artsIcon, autoPanOnFocus: true }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(artsMarker);
            artsMarker.addTo(artsGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }

        // history overlay
        else if (attraction.properties['PHOTOURL'].includes('history')) {
            let marker = L.marker([lat, lng], { icon: historyIcon, autoPanOnFocus: true }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(historyMarker);
            historyMarker.addTo(historyGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }

        // nature overlay
        else if (attraction.properties['PHOTOURL'].includes('nature')) {
            let marker = L.marker([lat, lng], { icon: natureIcon, autoPanOnFocus: true }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(natureMarker);
            natureMarker.addTo(natureGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }

        // architecture overlay
        else if (attraction.properties['PHOTOURL'].includes('architecture')) {
            let marker = L.marker([lat, lng], { icon: architectureIcon, autoPanOnFocus: true }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            `).addTo(architectureMarker);
            architectureMarker.addTo(architectureGroup);
            marker.addEventListener('click', function(){
                map.flyTo([lat,lng], 16);
                marker.openPopup();
            })
        }
    }

    // add the overlays to checkboxes
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

    // Weather API
    let weatherOverlay = L.layerGroup();
    let response = await axios.get(WEATHER_API_URL);

    let weatherArray = [];
    for (let weather of response.data.items[0].forecasts) {
        weatherArray.push(weather.forecast);
    }

    let areaCoordinates = response.data.area_metadata;

    for (let i = 0; i < weatherArray.length; i++) {
        areaCoordinates[i].forecast = weatherArray[i];
    }

    for (let area of areaCoordinates) {
        let lat = area.label_location.latitude;
        let lng = area.label_location.longitude;

        if (area.forecast == 'Cloudy') {
            L.marker([lat, lng], { icon: cloudy }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair & Warm' || area.forecast == 'Fair (Day)') {
            L.marker([lat, lng], { icon: sunny }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Day)') {
            L.marker([lat, lng], { icon: cloudyDay }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Night)') {
            L.marker([lat, lng], { icon: cloudyNight }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair (Night)') {
            L.marker([lat, lng], { icon: night }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Light Showers' || area.forecast == 'Light Rain') {
            L.marker([lat, lng], { icon: drizzle }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Showers' || area.forecast == 'Moderate Rain') {
            L.marker([lat, lng], { icon: showers }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }

        if (area.forecast == 'Thundery Showers' || area.forecast == 'Heavy Thundery Showers') {
            L.marker([lat, lng], { icon: thunder }).bindPopup(`
            <h4>${area.name}</h4>
            <p>${area.forecast}</p>
            `).addTo(weatherOverlay)
        }
    }

    // create eventlistener for weather
    document.querySelector("#weather-toggle").addEventListener('click', function () {
        if (map.hasLayer(weatherOverlay)) {
            map.removeLayer(weatherOverlay);
        }
        else {
            weatherOverlay.addTo(map);
        }
    })
}

let map1 = document.querySelector('#map-container');
let landingPage = document.querySelector('#home');
document.querySelector('#btn-attraction-search2').addEventListener('click', function () {
    landingPage.style.display = 'none';
    map1.classList.remove('d-none');
    map1.style.display = 'block';
    // map.remove();
    // initMap();
    
})

document.querySelector('#logo').addEventListener('click', function(){
    map1.style.display = 'none';
    landingPage.style.display = 'display';
})


main();

