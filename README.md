# Singapore Tourist Attraction Finder

![mobile-responsiveness](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/mobile_responsiveness.png)

The live demo of the website can be accessed [here](https://sg-tourist-attraction-finder.netlify.app/index.html).

## Project Summary

### Project Context

SG Tourist Attraction Finder is a mobile-responsive web application with an interactive map that allows users to explore the different tourist attractions scattered across Singapore.

### Target Audience

The target audience is catered to foreigners of all ages who travel to Singapore for the first time. However, with so many attractions here, locals who wish to further explore Singapore can also use the app. 

Since there is no particular occupation or literacy level to visit Singapore, the app must be easy to use and intuitive for both an 8-year-old child and an 80-year-old elderly.

### Justification for the App

When I travel to new countries, I have no idea what the top tourist attractions are. When googling for top tourist attractions, websites usually promote the most popular activities which may not be the category that I am interested in. 

As someone who prefers a relaxing trip consisting of nature and museum, it is rare to find such information. Meanwhile, my 16-year-old cousin prefers going to theme parks while my 80-year-old grandparents prefer visiting historical monuments.

Likewise, foreigners who travel to Singapore for the first time might be clueless on where to go. Regardless of age, the app aims to find something enjoyable for everyone to do in this beautiful city.

## UX / UI

### Organisation Goal

The app aims to promote tourism in Singapore by providing a platform for users to discover them more easily in an unbiased manner.

### User Goals

Users want to know where are the tourist attractions in Singapore. The app provides the name, image, location and a short description of the tourist attraction on the map. As food is an important part of the travel experience, users can also find up to 10 nearby food eateries within a 500m radius of any attraction. 

Since users with different age groups and personalities have different interest in the choice of activities they wish to participate, the app has a filter function to toggle between the different categories of attractions.

### User Stories

| User Story | Acceptance Criteria |
| ----------- | ----------- |
| I want to easily locate a particular attraction that I am interested in. | Search function with autosuggestion feature |
| I want to filter only the category of attractions I am interested in to narrow down my options. | Feature to filter the 6 categories of attractions |
| I want to know the current weather condition to avoid outdoor activites and opt for indoor ones in the event of a bad weather. | Feature to show 24hr and 2hr weather forecast |
| I want to easily find food nearby and not walk too far after visiting an attraction. | Feature to show nearby eateries within a 500m range of the attraction |

### Non-Functional Requirements

#### Performance criteria:
- The app should load relatively fast
- Interactions within the app should also not be too laggy or else users will get impatient and quit

#### Mobile responsiveness:
- The app should be mobile responsive as tourists might not bring their laptops with them to a foreign country
- Users might use the app on-the-go as they travel from one attraction to another

### Colors

Vibrant colors are selected in this design to bring out the fun in these tourist attractions. For the call-to-action buttons in the landing page, the main color, red, is chosen as it is synonymous with the color of Singapore's flag.

![#d9534f](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/D9534F%20color.jpeg)

### Fonts

Roboto and sans serif are selected for a clean and cutting edge look to make it easy on the user's eyes.

![roboto](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/roboto_font.png)

### Icons & Markers

The colors of all icons and markers are selected to match the bright and vibrant color scheme of the app for consistency. Only the weather icon color of the 2-hour forecast is black when toggled. This provides a contrast.

## Features

| Feature | Description |
| ----------- | ----------- |
| Search for tourist attraction by name | Users can search for any tourist attraction by its name. This feature is implemented using the filter() method. Autosuggestion is also provided to the user as they key in the search bar. This feature is implemented using the keyup event. |
| Display a certain category of attractions on the map | Users can choose to show only the layers they wish to see to reduce cluttering on the map. |
| Display weather forecast | Users can check the 2-hour and 24-hour forecasts before making a trip down for an outdoor activity. |
| Display current location | Users can see their current location to check what attractions are near them now. |
| Display useful information of an attraction | When users click on the marker of an attraction, it will zoom in and open up to show the name, image, address and description. |
| Reset map | This feature removes all layers and markers from the map so that it is empty. |
| Display nearby eateries | This feature will display up to 10 nearby eateries within a 500m range from the attraction. |
| Email marketing form | This feature allows users to submit their name and email to receive marketing information. The form is designed with validation rules to prevent invalid inputs from being submitted. |

## Limitations & Future Implementations

| Limitation | Future Implementation |
| ----------- | ----------- |
| Tourists might not know how to get to the attraction from their current location. | Provide a routing service to guide them to their desired destination. |
| Tourists might not know what category of activities suit them. | Create a quiz to retrieve more information to provide a personalised attraction category for them. |
| Tourists might want more fun and interaction. | Create a random attraction generator for tourists who are spontaneous enough to try any activity. |

## Technologies Used

1. HTML5
2. CSS3
3. Javascript
4. [Bootstrap v5.2](https://getbootstrap.com/) to structure layout of website and Carousel
5. [Leaflet](leafletjs.com) for map
6. [MarkerCluster](https://www.npmjs.com/package/leaflet.markercluster) for animated marker clustering for leaflet
7. [Axios](https://github.com/axios/axios) for getting API and promise functions
8. [Font Awesome](https://fontawesome.com/icons) to input icons
9. [Google Fonts](https://fonts.google.com/) to select font family

## Testing

Detailed test cases for the app can be found [here](https://github.com/jarednjk/map-project-tourist-attractions/blob/main/img/readme/leaflet_map_test_case.pdf).

## Deployment

The web application is hosted using [Netlify](https://www.netlify.com/), deployed directly from the main branch of this GitHub repository. For the detailed deployment steps, you may refer [here](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

## Credits & Acknowledgement

- https://data.gov.sg/ for the geojson file used to locate the tourist attractions in Singapore and the API for weather
- https://developer.foursquare.com/ for data on nearby eateries
- https://www.flaticon.com/ for their icons
- https://www.visitsingapore.com/ for their images
- https://ui.dev/amiresponsive to display screen responsiveness across multiple devices