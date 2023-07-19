// importing dependencies
import { getData } from './getData.js';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import { stateCodes } from './conversion.js';
import { getParksByActivity, getParksByState } from './filter.js';

// defining express app
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('OK');
})

// park: info aboout park (use: parkCode)
app.get('/park/:pkId', async (req, res) => {
  req.params;
  let data = await getData('parks', { parkCode: req.params.pkId });
  res.json(data);
})

// parks-filtered: park info using filters
app.get('/parks-filtered', async (req, res) => {
  const states = req.query.states;
  const activities = req.query.activities;
  let parks = [];

  // states and activities
  if (states && activities) {
    // get parks by states and by activities
    const parksByState = await getParksByState(states);
    const parksByActivity = await getParksByActivity(activities);
    parks = _.intersectionBy(parksByState, parksByActivity, 'parkCode');
  }
  // states and no activities
  else if (states && !activities) {
    // get parks by states
    parks = await getParksByState(states);
  }
  // activities and no states
  else if (!states && activities) {
    // get parks by activities
    parks = await getParksByActivity(activities);
  }
  // no states and no activities (all parks)
  else {
    // get all parks
    parks = await getParksByState();
  }
  res.json(parks);
});

// parks: park names and park codes (use: stateCode or nothing)
app.get('/parks/:stID?', async (req, res) => {
  req.params;
  let data = await getData('parks', {
    stateCode: req.params.stID,
    limit: 200,
    q: '"National Park"'
  });
  for (let i = data.length - 1; i >= 0; --i) {
    if (!data[i].fullName.includes("National Park") && !data[i].fullName.includes("National and State Parks")) {
      data.splice(i, 1);
    }
  }
  // only sends park name and code
  let parks1 = {};
  for (let i = 0; i < data.length; i++) {
    parks1[data[i].parkCode] = data[i].fullName;
  }
  res.json(parks1);
})

// states: all states and codes
app.get('/states', (req, res) => {
  res.json(stateCodes);
})

// activities: get all activity names and ids
app.get('/act', async (req, res) => {
  let data = await getData('activities');
  res.json(data);
})

// alert: get info about alerts with the park code
app.get('/alert/:pkId', async (req, res) => {
  req.params;
  let data = await getData("alerts", { parkCode: req.params.pkId });
  res.json(data);
})

// camping: get info about camping in park w/ id
app.get('/camps/:pkId', async (req, res) => {
  req.params;
  let data = await getData("campgrounds", { parkCode: req.params.pkId });
  res.json(data);
})

// media: get info about various medias w/ park id
app.get('/media/:pkId', async (req, res) => {
  req.params;
  let img = await getData("multimedia/galleries", { parkCode: req.params.pkId });
  let vid = await getData("multimedia/videos", { parkCode: req.params.pkId });
  let cam = await getData("webcams", { parkCode: req.params.pkId });
  let data = [img, cam, vid];
  res.json(data);
})

const port = process.env.PORT || 3000;

// starting server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
