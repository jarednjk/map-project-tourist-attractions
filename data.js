const BASE_API_URL = 'https://api.foursquare.com/v3/places/search';
const API_KEY = 'fsq3QDlVAvdvODCl95JV6QMgINC/ZJNmV/w5t0nTeL7WTxw=';

const WEATHER_API_URL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';



// foursquare show nearby
async function showNearby(lat, lng) {
    L.circle([lat,lng], 500).addTo(map);
    let foodGroup = L.layerGroup();
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
    // nearbyFood = nearbyFood.map(food => {
    //     return {
    //         'name': food.name,
    //         'coordinates': [food.geocodes.main.latitude, food.geocodes.main.longitude],
    //         'distance': food.distance
    //     }
    // })
    for (let f of nearbyFood) {
        let marker = L.marker([f.geocodes.main.latitude, f.geocodes.main.longitude], { icon: foodIcon}).bindPopup(`
        <strong>Restaurant:</strong> ${f.name}<br>
        <strong>Distance:</strong> ${f.distance}m away
        `).addTo(foodGroup);
        console.log(f.name);
        // return marker;
    }
    foodGroup.addTo(map);
    // return marker;
    // plot markers of nearby food
}

// (async function() {
//     let result = await showNearby(1.3521, 103.8198);
//     console.log(result);
//   })();

// async function weather() {
//     let response = await axios.get(WEATHER_API_URL);
//     let areaCoordinates = response.data.area_metadata;
//     for (let area of areaCoordinates) {
//         let lat = area.label_location.latitude;
//         let lng = area.label_location.longitude;
//         L.marker([lat,lng]).addTo(map);
//     }
// }