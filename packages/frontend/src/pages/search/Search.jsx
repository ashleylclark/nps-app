import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get_ids, get_key, get_keys } from "../../components/utilities";
import Results from '../../components/results';
import Loading from '../../components/loading/Loading';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import "./search.css";

// states and their codes
var states = {};
// states
var stateNames = [];
// parks and their codes
var parks = {};
// park names
var parkNames = [];
// activities and their ids
var activities = {};
// activity names
var actNames = [];

// display search page and form
const Search = () => {
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("na");
  const [form, setForm] = useState(false);

  const [parkSelection, setParkSelection] = useState([]);
  const [stateSelection, setStateSelection] = useState([]);
  const [actSelection, setActSelection] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const [selection, setSelection] = useState({});
  const navigate = useNavigate();

  function isObjEmpty (obj) {
    return Object.keys(obj).length == 0;
  }

  // get list of parks, states, and activites from backend
  const fetchFormData = async () => {
    // get all parks and park codes
    const parkResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/`);
    parks = await parkResponse.json();
    // park name list for form
    for (const key in parks) {
      parkNames.indexOf(parks[key]) === -1 ? parkNames.push(parks[key]) : console.log("This item already exists");
    }

    // get all states and state codes
    const stateResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/states`);
    states = await stateResponse.json();
    // gets a list of only state names for selection form list
    for (const key in states) {
      stateNames.indexOf(states[key]) === -1 ? stateNames.push(states[key]) : console.log("This item already exists");
    }

    // get all activities and ids
    const actResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/act`);
    activities = await actResponse.json();
    // activity list for form
    for (let i = 0; i < activities.length; i++) {
      actNames[i] = activities[i].name;
    }
  }


  // populate state search form
  useEffect(() => {
    fetchFormData().then(() => setLoading(false));
  }, []);

  // display form depending on search method chosen
  const showForm = (value) => {
    if (value === "park") {
      return (
        <Typeahead
          className='type-search'
          id='by-park'
          labelKey="name"
          onChange={setParkSelection}
          options={parkNames}
          placeholder='Choose a park...'
          selected={parkSelection}
        />
      );
    } else if (value === "state_activities") {
      return (
        <div id='filters'>
          <p>By State</p>
          <Typeahead
            className='type-search'
            id='by-state'
            labelKey="name"
            multiple
            onChange={setStateSelection}
            options={stateNames}
            placeholder='Choose a state...'
            selected={stateSelection}
          />
          <p>By Activity</p>
          <Typeahead
            className='type-search'
            id='by-activitiy'
            labelKey="name"
            multiple
            onChange={setActSelection}
            options={actNames}
            placeholder='Choose activities...'
            selected={actSelection}
          />
        </div>
      );
    }
  }

  // get results from search form when button is clicked
  const handleClick = () => {
    if (!isObjEmpty(parkSelection)) {
      let result = get_key(parks, parkSelection[0])
      navigate(`${result}`);
    }
    // states/activities
    else {
      let stateResult = get_keys(states, stateSelection);
      let activityResult = get_ids(activities, actSelection);
      console.log(stateResult);
      console.log(activityResult);

      fetch(`${import.meta.env.VITE_API_BASE_URL}/parks-filtered?states=${stateResult}&activities=${activityResult}`)
        .then(response => response.json())
        .then(data => {
          setIsShown(true);
          setSelection({choice: { stateSelection, actSelection }, info: data});
        });
    }
  }

  // display search form and results when needed
  return loading ? <Loading /> : (
    <div id='search-page'>
      <Navbar id='searchNav'>
        <Container className='nav-container'>
          <Navbar.Brand href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div id='search-title'>
        <h1 className='s-t'>Discover Nature:</h1>
        <h1 className='s-t'>Explore the National Parks!</h1>
      </div>
      <Container id="park-search" className='text-center'>
        <h2>Select a Park</h2>
        <p>Choose one of the following search methods.</p>
        <Form.Control
          as="select"
          value={type}
          onChange={e => {
            setType(e.target.value);
            setForm(true);
          }}>
          <option value="na">Choose a method</option>
          <option value="park">Park Name</option>
          <option value="state_activities">State/Activities</option>
        </Form.Control>
        {form && showForm(type)}
        <Button id='search-btn' variant='outline-dark' onClick={handleClick}>Go</Button>
        {isShown && <Results props={selection} />}
      </Container>
    </div>
  );
}

export default Search;
