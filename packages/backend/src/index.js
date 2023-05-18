// importing dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// defining express app
const app = express();
// defining array to work as database(temp)
const ads = [
  {title: 'Hello World!'}
];

// using boy parser to pare JSON bodies into JS objects
// app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// defning an endpoint to return all adds
// app.get('/', (req, res) => {
//   // res.send(ads);
//   res.send("hello world :(");
// });

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
})

app.get("/park", (req, res) => {
  res.json({ pName: "Yellow Stone" });
})

// starting server
app.listen(3001, () => {
  console.log('listening on port 3001');
});