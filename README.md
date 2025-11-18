# NPS APP

This application retrieves data from the National Park Service (NPS) API and
displays information for the park chosen by the user. The user can search for
a park using a list of all National Parks or filtering them by states and/or
activities.

Note: This project was previously deployed at example.com, but the hosted version is no longer available. You can still run it locally using the instructions below.

## Table of Contents

* [General Info](#general-info)
  * [Frontend React Web Application](#frontend-react-web-application)
  * [Backend Node.js API](#backend-nodejs-api)
* [Technologies Used](#technologies-used)
* [Reflections and Lessons Learned](#reflections-and-lessons-learned)
* [Local Development and Setup](#local-development-and-setup)
  * [Authorization](#authorization)

## General Info

### Frontend React Web Application

The frontend app gets all parks, states, and activities from the backend to fill the search
forms. Once a park is chosen and a page is opened, the respective information
will be retrieved from the backend.

For each park, the app will display information on different pages as follows:

| Page | Information |
| ---- | ----------- |
| Park | name, description, activities, alerts, contacts, weather, fees |
| Hours | park hours |
| Camping | general information for campgrounds within the park |
| Media | links, images, and descriptions for galleries, webcams, videos |

### Backend Node.js API

The backend serves multiple endpoints that retrieves and returns data from the
NPS API:

| Endpoint | Data |
| --- | --- |
| `/park/:pkId` | returns info about specific park using it's park code |
| `/parks/:stID?` | returns a list of all National Parks; optionally by state |
| `/parks-filtered` | returns filtered list of parks by states and activities with request params |
| `/states` | returns all states and their respective codes |
| `/activity` | returns all activities and their respective codes |
| `/alert/:pkId` | returns alerts for given park |
| `/camps/:pkId` | returns campground data for given park |
| `/media/:pkId` | returns gallery, webcam, and video data for given park |

## Technologies Used

The overall project is a monolithic JavaScript repository consisting of two
packages - frontend and backend, and is managed by Lerna.

The frontend web application uses React and is served via Vite. Bootstrap is
used for styling.

The backend API is a Node.js Express web application.

## Reflections and Lessons Learned

In completing this project I learned many things. I learned how to create a
monolithic repository consisting of a React and Vite frontend and Node.js
backend. I learned how to use React Router so that my web application is
able to navigate between multiple pages. I was also able to further develop my
understanding of website elements, HTML and CSS.

I learned how to create a backend Express API that is able to communicate with
my frontend app and a public API with multiple endpoints. I was also able to
learn how to publicly deploy both the frontend and backend web applications so
that they can be used by anyone and not solely on my local device.

This project helped me grow and develop an understanding how to create a web
application that is more than HTML and is able to communicate with an outside
source.

## Local Development and Setup

This project requires NPM and Node.js (18+) to be installed locally.

To install dependencies run `npm install`.

To run the frontend or backend, run `npm run dev` in their respective package
directories.

To visit, run `localhost:[port]` in their respective directories with their
respective ports:

* frontend: `http://localhost:5173`
* backend: `http://localhost:3000`

### Authorization

An authorization key is needed to access data in the NPS API. The key will need
to be added to a `.env` file in the backend directory using the backend's
`.env.sample` file as a template.

A similar procedure is necessary for connecting the frontend and backend
together, using the backend's url and the frontend's `.env.sample` file to
create a `.env` file in the frontend directory as a template.
