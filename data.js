const BASE_API_URL = 'https://api.foursquare.com/v3/places/search';
const API_KEY = 'fsq3QDlVAvdvODCl95JV6QMgINC/ZJNmV/w5t0nTeL7WTxw=';

const WEATHER_API_URL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';


// foursquare search query
async function search(lat, lng, query) {
    // create the coordinate
    let ll = lat + "," + lng;
    let response = await axios.get(BASE_API_URL,{
        'params': {
            'll': ll,
            'query': query,
            'radius': 2000,
            'limit': 50
        },
        'headers': {
            'Accept': 'application/json',
            'Authorization': API_KEY
        }
    })
    return response.data;
}

async function weather() {
    let response = await axios.get(WEATHER_API_URL);
    let areaCoordinates = response.data.area_metadata;
    for (let area of areaCoordinates) {
        let lat = area.label_location.latitude;
        let lng = area.label_location.longitude;
        L.marker([lat,lng]).addTo(map);
    }
}