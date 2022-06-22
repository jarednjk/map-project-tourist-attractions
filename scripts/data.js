const BASE_API_URL = 'https://api.foursquare.com/v3/places/search';
const API_KEY = 'fsq3QDlVAvdvODCl95JV6QMgINC/ZJNmV/w5t0nTeL7WTxw=';

const WEATHER_API_URL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
const WEATHER_24HR_API_URL = 'https://api.data.gov.sg/v1/environment/24-hour-weather-forecast';


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