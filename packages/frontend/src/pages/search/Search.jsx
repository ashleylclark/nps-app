import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import "./search.css";
import { activties } from "../../components/utilities"
import Results from '../../components/results';
import { useNavigate } from 'react-router-dom';
import { fetch_data } from '../../components/utilities';
import { get_key } from '../../components/utilities';
import Loading from '../../components/loading/Loading';

// if park chosen, no result page
// if state chosen, show all parks for state
// if actiivity, show parks with those activities

// states and their codes
var states = {};
// states
var stateNames = [];
// parks and their codes
var parks = {};
// park names
var parkNames = [];
// var parkNames = {acad: "Acadia", arch: "Arches", badl: "Badlands"};

const Search = () => {
  const [loading, setLoading] = useState(true);

  const [parkSelection, setParkSelection] = useState([]);
  const [stateSelection, setStateSelection] = useState([]);
  const [actSelection, setActSelection] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const [selection, setSelection] = useState([]);
  const navigate = useNavigate();

  const [pa, setPa] = useState([]);
  const [info, setInfo] = useState([]);

  function isObjEmpty (obj) {
    return Object.keys(obj).length == 0;
  }

  const fetchFormData = async () => {
    // get all parks and park codes
    const parkResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/`);
    const parkData = await parkResponse.json();
    // copy data to new object
    for (const key in parkData) {
      parks[key] = parkData[key];
      parkNames.indexOf(parkData[key]) === -1 ? parkNames.push(parkData[key]) : console.log("This item already exists");
    }

    // get all states and state codes
    const stateResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/states`);
    const stateData = await stateResponse.json();
    // gets a list of only state names for selection form list
    for (const key in stateData) {
      states[key] = stateData[key];
      stateNames.indexOf(stateData[key]) === -1 ? stateNames.push(stateData[key]) : console.log("This item already exists");
    }
  }


  // populate state search form
  useEffect(() => {
    fetchFormData().then(() => setLoading(false));
  }, []);

  const handleClick = e => {
    // select park by name... convert to code
    // choose a method
    // let parkCode = "bisc";
    // fetch(`${import.meta.env.VITE_API_BASE_URL}/park/${parkCode}`)
    //   .then(response => response.json)
    //   .then(data => console.log(data));

    // let stateCode = "IN";
    // fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/${stateCode}`)
    //   .then(response => response.json())
    //   .then(data => console.log(data));

    if (!isObjEmpty(parkSelection)) {
      console.log(`park chosen: ${parkSelection}`);
      console.log(parks);
      let result = get_key(parks, parkSelection[0])
      console.log(result);
      // FetchData("park", parkSelection);
      navigate(`${result}`);
    }


    // if (!isObjEmpty(stateSelection)) {
    //   handle...
    //   // FetchData("state", stateSelection);
    //   setIsShown(true);
    //   setSelection(stateSelection);
    // }

    // else if (!isObjEmpty(actSelection)) {
    //   FetchData("activity", actSelection);
    //   setIsShown(true);
    //   setSelection(actSelection);
    // }
    // else {
    //   console.log("no option chosen");
    // }
  };

  return loading ? <Loading /> : (
    <div id='search-page'>
      <Navbar id='searchNav'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Container id="park-search" className='text-center'>
        <h2>Select a Park</h2>
        <p>Choose one of the following search methods.</p>
        <Form.Group>
          <Form.Label>Park</Form.Label>
          <Typeahead
            id="by-park"
            labelKey="name"
            onChange={setParkSelection}
            options={parkNames}
            placeholder='Choose a park...'
            selected={parkSelection}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Typeahead
            id="by-state"
            labelKey="name"
            onChange={setStateSelection}
            options={stateNames}
            placeholder='Choose a state...'
            selected={stateSelection}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Activities</Form.Label>
          <Typeahead
            id="by-activity"
            labelKey="name"
            multiple
            onChange={setActSelection}
            options={activties}
            placeholder='Choose activities...'
            selected={actSelection}
          />
        </Form.Group>
        <Button variant='outline-dark' onClick={handleClick}>Go</Button>
      </Container>
      {isShown && <Results choice={selection} />}
    </div>
  );
}

export default Search;