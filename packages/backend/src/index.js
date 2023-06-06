// importing dependencies
import { getData } from './getData.js';
import express from 'express';
import cors from 'cors';

import { stateCodes } from './conversion.js';

// defining express app
const app = express();

// app.use(express.urlencoded()); // Parese URL-encoded bodies

app.use(cors());
app.use(express.json());


// park: info aboout park (use: parkCode)

app.get('/park/:pkId', async (req, res) => {
  req.params;
  // console.log(req.params.pkId);
  let data = await getData('parks', { parkCode: req.params.pkId });
  // console.log(data);
  res.json(data);
})


// parks: park names and park codes (use: stateCode or nothing)

app.get('/parks/:stID?', async (req, res) => {
  // var key = req.params.stID;
  req.params;
  let data = await getData('parks', {
    stateCode: req.params.stID,
    limit: 200,
    q: '"National Park"'
  });
  for (let i = data.length - 1; i >= 0; --i) {
    // if (data[i].designation != 'National Park') {
    if (!data[i].fullName.includes("National Park") && !data[i].fullName.includes("National and State Parks")) {
      // console.log(data[i].fullName);
      data.splice(i, 1);
    }
  }
  // only sends park name and code
  let parks1 = {};
  for (let i = 0; i < data.length; i++) {
    parks1[data[i].parkCode] = data[i].fullName;
  }
  // console.log(data);
  res.json(parks1);
})


// states: all states and codes

app.get('/states', (req, res) => {
  res.json(stateCodes);
})


// camping: get info about camping in park w/ id

app.get('/camps/:pkId', async (req, res) => {
  req.params;
  let data = await getData("campgrounds", { parkCode: req.params.pkId });
  // console.log(data);
  res.json(data);
})


// starting server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
