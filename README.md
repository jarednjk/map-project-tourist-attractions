# Singapore Tourist Attraction Finder

The demo of the live website can be accessed here: 

## Project Summary

### Project Context

SG Tourist Attraction Finder is a mobile-responsive web application with an interactive map that allows users to explore the different tourist attractions scattered across Singapore.

### Target Audience

The target audience is catered to foreigners of all ages who travel to Singapore for the first time. However, with so many attractions here, locals who wish to further explore Singapore can also use the web app. 

Since there is no particular occupation and literacy level to visit Singapore, the web app must be easy to use and intuitive for both an 8-year-old child and an 80-year-old grandparent.

### Justification for the App

When I travel to new countries, I have no idea what the top tourist attractions are over there. When googling for top tourist attractions, websites usually promote the most popular activities which may not be category that I am interested in. 

As someone who prefers a relaxing trip consisting of nature and museum, it is rare to find such information. Meanwhile, my 16 year old cousin prefers going to theme parks while my 80 year old grandparents prefer visiting historical monuments.

Likewise, foreigners who travel to Singapore for the first time might be clueless on where to go. A kid might prefer theme parks while the grandparent might prefer visiting historical monuments. Whether you are 8 or 80, this web app will help you find something you enjoy in this beautiful country.

## UX / UI

### Organisation Goal

The web app aims to promote tourism activities in Singapore by providing a platform for users to discover them more easily in an unbiased manner.

### User Goals

Users want to know where are the tourist places in Singapore. The web app provides a picture, location and a short description of the tourist attraction on the map. As food is an important part of the travel experience, users can find up to 10 food locations within a 500m range of any attraction. 

Since users with different age groups and personalities have different interest in the choice of activities they wish to participate, the web app has a filter function to toggle between the different categories of attractions.

### User Stories

| User Story | Acceptance Criteria |
| ----------- | ----------- |
| As a tourist or local interested in visiting Singapore's tourist attractions, I want to easily locate a particular attraction. | Search function with autosuggestion feature |
| I want to filter only the category of attractions I am interested in so I can narrow down my options. | Feature to filter the 6 categories of attractions |
| I want to know the current weather condition so I can avoid outdoor activites and choose indoor ones in the event of a bad weather. | Feature to show 24hr and 2hr weather forecast |
| I want to easily find food nearby after visiting an attraction. | Feature to show nearby eateries within a 500m range of the attraction |

### Colors

Vibrant colors are selected in this design to bring out the fun in these tourist attractions.
However, the main color, red, is chosen for CTA buttons in the landing page. This is synonymous with the color of Singapore's flag.

![#d9534f](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/D9534F%20color.jpeg)

### Fonts

Roboto and sans serif font are selected for a clean and cutting edge look to make it easy on the user's eyes.

![roboto](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/roboto_font.png)
<!-- On the other hand, my family might prefer visiting historical monuments. Therefore, different age groups and personalities have different interest in the choice of activities they wish to participate.

Foreigners who travel to Singapore 

The demographics is mostly targeted at foreigners who are travelling to Singapore for the first time on a free and easy tour. Since they do not have a tour guide to bring them around, they might not know where are the popular places to visit. However, it can also be used by locals who have yet to explore every attraction place in Singapore. 

I've broken down the tourist attractions into 6 categories such as arts, architecture, culture, history, nature and recreation. Whether you are 8 or 80, you are bound to find something you enjoy in this beautiful country.

Before heading down to an attraction, users can first check the current weather condition to better plan their trip and avoid disappointments. If the weather is rainy, users could opt for an indoor attraction such as a museum instead of an outdoor attraction such as a theme park.

The demo of the live website can be accessed here:  -->

### Icons & Markers

The colors of all icons and markers are selected to match the bright and vibrant color scheme of the web app for consistency. Only the color of the 2-hour weather forecast is black when toggled. This provides a contrast.

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
- [LeafletJS](leafletjs.com) for map.
- [Axios](https://github.com/axios/axios) for getting API and promise functions
- [Bootstrap5](https://getbootstrap.com/) to structure layout of website and Carousel.
- [MarkerCluster](https://www.npmjs.com/package/leaflet.markercluster) for animated marker clustering for leaflet.
- [Fontawesome](https://fontawesome.com/icons) to input icons.
- [Google Fonts](https://fonts.google.com/) to select font family.

## Credits & Acknowledgement

- https://data.gov.sg/ for the geojson file used to locate the tourist attractions in Singapore and the API for weather.
- https://developer.foursquare.com/ for data on eateries.
- https://www.flaticon.com/ for their icons.
- https://www.visitsingapore.com/ for their images.