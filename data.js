const BASE_API_URL = 'https://api.foursquare.com/v3/places/search';
const API_KEY = 'fsq3QDlVAvdvODCl95JV6QMgINC/ZJNmV/w5t0nTeL7WTxw=';

const WEATHER_API_URL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
const WEATHER_24HR_API_URL = 'https://api.data.gov.sg/v1/environment/24-hour-weather-forecast';

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
        L.marker(e.latlng, { icon: currentLocationIcon }).addTo(map).bindPopup(`<h5>You Are Here</h5>`).openPopup();
    }
    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }
    map.on('locationerror', onLocationError);
    return map;
}

// When map loads and before any attraction markers are clicked
let foodGroup = null;
let surroundingAreaOfCircle = null;
let prevLat = null;
let prevLng = null;
// foursquare show nearby
async function showNearbyFood(lat, lng) {

    // toggle eateries
    if (foodGroup != null) {
        map.removeLayer(foodGroup);
        foodGroup = null;
    }

    // toggle l.circle around attraction marker
    if (surroundingAreaOfCircle != null) {
        map.removeLayer(surroundingAreaOfCircle);
        surroundingAreaOfCircle = null;
    }

    // when user clicks on a new attraction, this removes existing circle and eateries of the old attraction.
    if (prevLat !== lat && prevLng !== lng) {
        surroundingAreaOfCircle = L.circle([lat,lng],{
            'radius': 500,
            'color': 'red',
            'fillColor': 'red',
        });
        foodGroup = L.layerGroup();
    
        // create the coordinate
        let ll = lat + "," + lng;
        let response = await axios.get(BASE_API_URL,{
            'params': {
                'll': ll,
                'category': 13065,
                'radius': 500,
            },
            'headers': {
                'Accept': 'application/json',
                'Authorization': API_KEY
            }
        });
    
        let nearbyFood = response.data.results;
    
        for (let f of nearbyFood) {
            L.marker([f.geocodes.main.latitude, f.geocodes.main.longitude], { icon: foodIcon }).bindPopup(`
            <h6>${f.name}</h6>${f.distance}m away
            `).addTo(foodGroup);
            console.log(f.name);
        }
    
        surroundingAreaOfCircle.addTo(map);
        foodGroup.addTo(map);
        
        prevLat = lat;
        prevLng = lng;
    } else {
        prevLat = null;
        prevLng = null;
    }
}