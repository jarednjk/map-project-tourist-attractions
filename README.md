# Singapore Tourist Attraction Finder

This project is an interactive map guide for people who wish to explore the tourist attractions in Singapore.

## Summary:

The demographics is mostly targeted at foreigners who are travelling to Singapore for the first time on a free and easy tour. Since they do not have a tour guide to bring them around, they might not know where are the popular places to visit. However, it can also be used by locals who have yet to explore every attraction place in Singapore. 

I've broken down the tourist attractions into 6 categories such as arts, architecture, culture, history, nature and recreation. Whether you are 8 or 80, you are bound to find something you enjoy in this beautiful country.

Before heading down to an attraction, users can first check the current weather condition to better plan their trip and avoid disappointments. If the weather is rainy, users could opt for an indoor attraction such as a museum instead of an outdoor attraction such as a theme park.

The demo of the live website can be accessed here: 

# UX/UI

## Features

This is a one page web application that is divided into 2 sections: landing page and map.

On the landing page, it welcomes users with a carousel that showcases 8 beautiful attractions in Singapore. When users are ready to start searching where to visit in Singapore, they can click on the "Get Started" CTA to trigger the map section.

At the bottom left of the landing page, there is also a email newsletter box if users wish to sign up for marketing and promotional materials.

On the map, all icons used are customised. Clicking on the markers will present users with relevant information of the attraction.

Key information can be found in 4 areas of the map:

1. Search box (bottom)
2. Weather (top-left)
3. Overlay (top-right)
4. Nearby food (in the marker)

### Search box

- Search results of tourist attractions will be displayed here.
- Autosuggest attractions once you enter at least 2 characters.
- Map will zoom in to show targeted marker when you click on the attraction.

### Weather

- 2-hr weather forecast is displayed when users click on the "Check Weather" button.

### Overlay

- Tourist attractions are categorised into 6 overlays.
- Users can select only the category that interest them the most.

### Nearby food

- Since tourist attraction and food goes hand-in-hand, when user clicks on an attraction marker, there is a button for them to show nearby food.
- Clicking on the marker will trigger 10 dining options within a range of 500m.

## Technologies Used

- HTML5
- CSS3
- Javascript
- [LeafletJS](leafletjs.com) for map
- [Axios](https://github.com/axios/axios) for getting API and promise functions
- [Bootstrap5](https://getbootstrap.com/) to structure layout of website and Carousel.
- [MarkerCluster](https://www.npmjs.com/package/leaflet.markercluster) for animated marker clustering for leaflet.

## Credits

- https://data.gov.sg/ for the geojson file used to locate the tourist attractions in Singapore and the API for weather.
- https://developer.foursquare.com/ for data on eateries.
- https://www.flaticon.com/ for their icons.
- https://www.visitsingapore.com/ for their images.