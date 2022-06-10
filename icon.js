// create YOU ARE HERE icon
let currentLocationIcon = L.icon ({
    iconUrl: 'img/attraction/currentLocation.png',
    iconSize: [35, 35],
    iconAnchor: [18, 27],
    popupAnchor: [0, -25],
});

// create tourist attraction icons
let artsIcon = L.icon ({
    iconUrl: 'img/attraction/arts.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
    className: 'marker'
});

let cultureIcon = L.icon ({
    iconUrl: 'img/attraction/culture.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let historyIcon = L.icon ({
    iconUrl: 'img/attraction/history.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let architectureIcon = L.icon ({
    iconUrl: 'img/attraction/architecture.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let natureIcon = L.icon ({
    iconUrl: 'img/attraction/nature.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

let recreationIcon = L.icon ({
    iconUrl: 'img/attraction/recreation.png',
    iconSize: [35, 35],
    iconAnchor: [20, 20],
    popupAnchor: [0, -25],
});

// weather icon

let sunny = L.icon({
    iconUrl: 'img/weather/sunny.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let cloudy = L.icon({
    iconUrl: 'img/weather/cloudy.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let cloudyDay = L.icon({
    iconUrl: 'img/weather/cloudy-day.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let night = L.icon({
    iconUrl: 'img/weather/night.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let cloudyNight = L.icon({
    iconUrl: 'img/weather/cloudy-night.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let drizzle = L.icon({
    iconUrl: 'img/weather/drizzle.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let showers = L.icon({
    iconUrl: 'img/weather/showers.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})

let thunder = L.icon({
    iconUrl: 'img/weather/thunder.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [-3, -40],
   
})