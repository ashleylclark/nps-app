# NPS APP

This app gets data from the National Park Service API and displays information
for the park chosen by the user. The user can search for a park using a list of
all National Parks or filtering them by states and/or activities.

THe public deployments for frontend and backend are available at the following:

Frontend deployed on Vercel:

Backend deployed on Heroku:


## Table of Contents

* [General Info](#general-info)
  * [Frontend](#frontend)
  * [Backend](#backend)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
  * [Frontend npm scripts](#frontend-npm-scripts)
  * [Backend npm scripts](#backend-npm-scripts)


## General Info

### Frontend

The app gets all parks, states, and activities from the backend to fill the search
forms. Once a park is chosen and a page is opened, the respective information
will be retreived from the backend.

For each park, the app will display information on different pages as follows:

| Page | Information |
| ---- | ----------- |
| Park | name, description, activities, alerts, contacts, weather, fees |
| Hours | park hours |
| Camping | general information for campgrounds within the park |
| Media | links, images, and descriptions for galleries, webcams, videos |

### Backend

The backend contains multiple endpoints that gets and returns different data
from the NPS API:

| Endpoint | Data |
| --- | --- |
| /park/:pkId | returns info about specific park using it's park code |
| /parks/:stID? | returns a list of all National Parks; optionally by state |
| /parks-filtered | returns filtered list of parks by states and activities with request params |
| /states | returns all states and their respective codes |
| /activity | returns all activities and their respective codes |
| /alert/:pkId | returns alerts for given park |
| /camps/:pkId | returns campground data for given park |
| /media/:pkId | returns gallery, webcam, and video data for given park |


## Technologies

Project is created with:
* lerna: 6.6.2

Frontend is created with:
* bootstrap: 5.2.3
* eslint: 8.38.0
* react: 18.2.0
* react-bootstrap: 2.7.4
* react-bootstrap-typeahead: 6.2.2
* react-dom: 18.2.0
* react-responsive-masonry: 2.1.7
* react-router-dom: 6.11.1
* vite: 4.3.2

and written in JavaScript, HTML, and CSS

Backend is created with:
* axios: 1.4.0
* body-parser: 1.20.2
* cors: 2.8.5
* dotenv: 16.0.3
* express: 4.18.2
* lodash: 4.17.21
* node: 18+
* nodemon: 2.0.22
* semistandard: 16.0.1

and written JavaScript


## Installation

This project requires npm and node to be installed as one of the project's
dependencies.

To install npm and node:

```bash
npm install
```

## Usage

To run frontend or backend, run `npm run dev` in their respective directories

To visit, run  `localhost:[port]` in thier respective directories with their
respective ports

### Frontend npm scripts

* dev: vite
* build: vite build
* lint: eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0
* preview: vite preview

### Backend npm scripts

* start: node src/index.js
* dev: nodemon src/index.js
* test: echo \"Error: no test specified\" && exit 1
* format: semistandard --fix
