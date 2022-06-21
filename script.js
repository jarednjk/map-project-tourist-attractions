let map = initMap();


async function main() {

    // email condition
    document.querySelector('#email-submit').addEventListener('click', function () {
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

    // transform data from geojson to array containing only name and coordinates
    let attractionArray = attractionResponse.data.features.map((obj) => {
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
        let filteredAttractions = attractionArray.filter(function (elem) {
            return (elem.name.toLowerCase().includes(searchString));
        });
        console.log(filteredAttractions);

        if (searchString.length <= 1) {
            document.querySelector('#results-header').innerHTML = "";
        } else {
            if (filteredAttractions.length >= 1) {
                for (let i = 0; i < filteredAttractions.length; i++) {

                    let searchResults = document.createElement('li');
                    searchResults.className = "search-result";
                    searchResults.style.listStyleType = 'none';
                    document.querySelector('#results-header').appendChild(searchResults);
                    searchResults.id = 'attraction-' + i
                    searchResults.innerHTML = `${filteredAttractions[i].name}`;

                    // flyto coordinates
                    document.querySelector(`#attraction-${i}`).addEventListener('click', function () {
                        let marker = L.marker(filteredAttractions[i].coordinates);
                        console.log(marker);
                        map.flyTo(filteredAttractions[i].coordinates, 16)
                        marker.openPopup();
                    })
                }
            }
            else {
                document.querySelector('#results-header').innerHTML = "";
            }
        }
    });


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

    for (let attraction of attractionResponse.data.features) {
        // create coordinates of markers
        let lat = attraction.properties.Latitude;
        let lng = attraction.properties.Longtitude;
        // create img
        let photo = attraction.properties['PHOTOURL'].split('"')[3];

        function attractionOverlay(category, attractionIcon, attractionMarker, attractionGroup) {
            if (attraction.properties['PHOTOURL'].includes(`${category}`)) {
                let marker = L.marker([lat, lng], { icon: attractionIcon }).bindPopup(`
                <h5>${attraction.properties.Name}</h5>
                <img class='img-fluid' src="${photo}">
                <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
                <p><strong>Description:</strong> ${attraction.properties.description}</p>
                <button onclick='showNearbyFood(${lat},${lng})' id="${attraction.properties.INC_CRC}" class="btn btn-danger btn-sm">Nearby Eateries</button>
                `).addTo(attractionMarker);
                attractionMarker.addTo(attractionGroup);
    
                lat = +lat + 0.002
    
                marker.addEventListener('click', function () {
                    map.flyTo([lat, lng], 16);
                })
            }
        }

        // culture overlay
        if (attraction.properties['PHOTOURL'].includes('culture') || attraction.properties['PHOTOURL'].includes('places-to-see')) {
            console.log(attraction)
            let marker = L.marker([lat, lng], { icon: cultureIcon }).bindPopup(`
            <h5>${attraction.properties.Name}</h5>
            <img class='img-fluid' src="${photo}">
            <p><strong>Address:</strong> ${attraction.properties['ADDRESSSTREETNAME']}</p>
            <p><strong>Description:</strong> ${attraction.properties.description}</p>
            <button onclick='showNearbyFood(${lat},${lng})' id="${attraction.properties.INC_CRC}" class="btn btn-danger btn-sm">Nearby Eateries</button>
            `).addTo(cultureMarker);
            cultureMarker.addTo(cultureGroup);

            lat = +lat + 0.002

            marker.addEventListener('click', function () {
                map.flyTo([lat, lng], 16);
            })
        }

        // recreation overlay
        else if (attraction.properties['PHOTOURL'].includes('recreation')) {
            attractionOverlay('recreation', recreationIcon, recreationMarker, recreationGroup);
        }

        // arts overlay
        else if (attraction.properties['PHOTOURL'].includes('arts')) {
            attractionOverlay('arts', artsIcon, artsMarker, artsGroup);
        }

        // history overlay
        else if (attraction.properties['PHOTOURL'].includes('history')) {
            attractionOverlay('history', historyIcon, historyMarker, historyGroup);
        }

        // nature overlay
        else if (attraction.properties['PHOTOURL'].includes('nature')) {
            attractionOverlay('nature', natureIcon, natureMarker, natureGroup);
        }

        // architecture overlay
        else if (attraction.properties['PHOTOURL'].includes('architecture')) {
            attractionOverlay('architecture', architectureIcon, architectureMarker, architectureGroup);
        }
    }

    cultureGroup.addTo(map);
    artsGroup.addTo(map);
    historyGroup.addTo(map);
    natureGroup.addTo(map);
    architectureGroup.addTo(map);
    recreationGroup.addTo(map);

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

    // 24hr Weather API
    let dailyWeatherResponse = await axios.get(WEATHER_24HR_API_URL);

    // function displayDailyWeather() {
        let dailyWeatherForecast = dailyWeatherResponse.data.items[0].general.forecast;
        let lowTemp = dailyWeatherResponse.data.items[0].general.temperature.low;
        let highTemp = dailyWeatherResponse.data.items[0].general.temperature.high;

        if (dailyWeatherForecast == 'Fair & Warm' || dailyWeatherForecast == 'Fair (Day)') {
            iconURL = "img/weather/sunny.png"
        }

        else if (dailyWeatherForecast == 'Partly Cloudy (Day)') {
            iconURL = "img/weather/cloudy-day.png"
        }

        else if (dailyWeatherForecast == 'Cloudy') {
            iconURL = "img/weather/cloudy.png"
        }

        else if (dailyWeatherForecast == 'Partly Cloudy (Night)') {
            iconURL = "img/weather/cloudy-night.png"
        }

        else if (dailyWeatherForecast == 'Fair (Night)') {
            iconURL = "img/weather/night.png"
        }

        else if (dailyWeatherForecast == 'Light Showers' || dailyWeatherForecast == 'Light Rain') {
            iconURL = "img/weather/drizzle.png"
        }

        else if (dailyWeatherForecast == 'Showers' || dailyWeatherForecast == 'Moderate Rain') {
            iconURL = "img/weather/showers.png"
        }

        else if (dailyWeatherForecast == 'Thundery Showers' || dailyWeatherForecast == 'Heavy Thundery Showers') {
            iconURL = "img/weather/thunder.png"
        }

        let weatherText = `
            <h4><strong>24 Hours Forecast</strong></h4>
            <p>${dailyWeatherForecast}</p>
            <div class="pb-4"><img src="${iconURL}" style="width: 80px; height:80px"></div>

            <p><i class="fa-solid fa-temperature-low"></i> ${lowTemp} / ${highTemp} <i class="fa-solid fa-temperature-high"></i></p>
        `
    //      return weatherText;
    // }

    document.querySelector('#daily-weather-forecast').innerHTML = weatherText;
    


    // 2hr Weather API
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
            L.marker([lat, lng], { icon: cloudy }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair & Warm' || area.forecast == 'Fair (Day)') {
            L.marker([lat, lng], { icon: sunny }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Day)') {
            L.marker([lat, lng], { icon: cloudyDay }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Partly Cloudy (Night)') {
            L.marker([lat, lng], { icon: cloudyNight }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Fair (Night)') {
            L.marker([lat, lng], { icon: night }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Light Showers' || area.forecast == 'Light Rain') {
            L.marker([lat, lng], { icon: drizzle }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Showers' || area.forecast == 'Moderate Rain') {
            L.marker([lat, lng], { icon: showers }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }

        if (area.forecast == 'Thundery Showers' || area.forecast == 'Heavy Thundery Showers') {
            L.marker([lat, lng], { icon: thunder }).bindPopup(`<h5>${area.name}</h5>${area.forecast}`).addTo(weatherOverlay)
        }
    }

    // create eventlistener for weather
    // document.querySelector("#weather-toggle-sm").addEventListener('click', function () {
    //     if (map.hasLayer(weatherOverlay)) {
    //         map.removeLayer(weatherOverlay);
    //     }
    //     else {
    //         weatherOverlay.addTo(map);
    //     }
    // })

    document.querySelector("#weather-toggle").addEventListener('click', function () {
        if (map.hasLayer(weatherOverlay)) {
            map.removeLayer(weatherOverlay);
        }
        else {
            weatherOverlay.addTo(map);
        }
    })


}

main();

let mapDiv = document.querySelector('#mapDiv');
let landingPageDiv = document.querySelector('#landingPageDiv');
document.querySelector('#btn-get-started').addEventListener('click', function () {
    landingPageDiv.classList.add('hidden');
    // mapContainer.classList.remove('hidden');
    mapDiv.classList.remove('hidden');
})

document.querySelector('#logo').addEventListener('click', function () {
    landingPageDiv.classList.remove('hidden');
    mapDiv.classList.remove('hidden');
})