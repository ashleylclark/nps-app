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
import { get_ids } from "../../components/utilities"
import Results from '../../components/results';
import { useNavigate } from 'react-router-dom';
// import { fetch_data } from '../../components/utilities';
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
// activities and their ids
var activities = {};
// activity names
var actNames = [];

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

  const [pa, setPa] = useState([]);
  const [info, setInfo] = useState([]);

  function isObjEmpty (obj) {
    return Object.keys(obj).length == 0;
  }

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
    } else if (value === "state") {
      return (
        <Typeahead
          className='type-search'
          id='by-state'
          labelKey="name"
          onChange={setStateSelection}
          options={stateNames}
          placeholder='Choose a state...'
          selected={stateSelection}
        />
      );
    } else if (value === "activities") {
      return (
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
      )
    }
  }

  const handleClick = e => {
    if (!isObjEmpty(parkSelection)) {
      console.log(`park chosen: ${parkSelection}`);
      console.log(parks);
      let result = get_key(parks, parkSelection[0])
      console.log(result);
      // FetchData("park", parkSelection);
      navigate(`${result}`);
    }

    else if (!isObjEmpty(stateSelection)) {
      // convert to code
      let result = get_key(states, stateSelection[0]);

      fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/${result}`)
        .then(response => response.json())
        .then(data => {
          setIsShown(true);
          setSelection({choice: stateSelection, info: data});
        });
    }

    else if (!isObjEmpty(actSelection)) {
      // convert list of activites to list of ids
      console.log(actSelection);
      let result = get_ids(activities, actSelection);

      fetch(`${import.meta.env.VITE_API_BASE_URL}/act/${result}`)
        .then(response => response.json())
        .then(data => {
          setIsShown(true);
          setSelection({choice: actSelection, info: data});
        });
    }
    else {
      console.log("no option chosen");
    }
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
        <Form.Control
          as="select"
          value={type}
          onChange={e => {
            setType(e.target.value);
            setForm(true);
          }}>
          <option value="na">Choose a search method</option>
          <option value="park">Park</option>
          <option value="state">State</option>
          <option value="activities">Activities</option>
        </Form.Control>
        {form && showForm(type)}
        <Button variant='outline-dark' onClick={handleClick}>Go</Button>
        {isShown && <Results props={selection} />}
      </Container>
    </div>
  );
}

export default Search;