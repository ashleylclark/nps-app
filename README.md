# NPS APP

This app retrieves data from the National Park Service API and displays information
for the park chosen by the user. The user can search for a park using a list of
all National Parks or filtering them by states and/or activities.

The public deployments for the frontend and backend are available at:

* Frontend deployed on Vercel: `https://nps-app-frontend.vercel.app/`
* Backend deployed on Heroku: `https://nps-backend-c63d809b4823.herokuapp.com/`

## Table of Contents

* [General Info](#general-info)
  * [Frontend](#frontend)
  * [Backend](#backend)
* [Technologies](#technologies)
* [Local Development and Setup](#local-development-and-setup)

## General Info

### Frontend

The app gets all parks, states, and activities from the backend to fill the search
forms. Once a park is chosen and a page is opened, the respective information
will be retrieved from the backend.

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

The overall project is a monolithic repository consisting of two packages - frontend
and backend. It is managed by Lerna.

The frontend web application is created with React and JavaScript served via Vite.
Bootstrap is used for styling and CSS.

The backend API is a Node.js Express web application.

## Local Development and Setup

This project requires npm and node to be installed as one of the project's
dependencies.

To install dependencies run `npm install` then run `npm run dev`.

To run the frontend or backend, run `npm run dev` in their respective directories.

To visit, run `localhost:[port]` in their respective directories with their
respective ports:

* frontend: `http://localhost:5173`
* backend: `http://localhost:3000`
