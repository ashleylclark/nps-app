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
import { states, parks, activties } from "../../components/choices.jsx"
import Results from '../../components/results';
import { useNavigate } from 'react-router-dom';

// if park chosen, no result page
// if state chosen, show all parks for state
// if actiivity, show parks with those activities

const Search = () => {
  const [parkSelections, setParkSelections] = useState([]);
  const [stateSelections, setStateSelections] = useState([]);
  const [actSelections, setActSelections] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  function isObjEmpty (obj) {
    return Object.keys(obj).length == 0;
  }

  const handleClick = e => {
    setIsShown(current => !current);
    if (!isObjEmpty(parkSelections)) {
      console.log(`park chosen: ${parkSelections}`);
      navigate('ParkName');
    } else {
      console.log("no park chosen");
    }
  };

  return (
    <div id='search-page'>
      <Navbar>
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
            onChange={setParkSelections}
            options={parks}
            placeholder='Choose a park...'
            selected={parkSelections}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Typeahead
            id="by-state"
            labelKey="name"
            onChange={setStateSelections}
            options={states}
            placeholder='Choose a state...'
            selected={stateSelections}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Activities</Form.Label>
          <Typeahead
            id="by-activity"
            labelKey="name"
            multiple
            onChange={setActSelections}
            options={activties}
            placeholder='Choose activities...'
            selected={actSelections}
          />
        </Form.Group>
        <Button variant='outline-dark' onClick={handleClick}>Go</Button>
      </Container>
      <Nav className='temp'>
        <Nav.Item as="li">
          <Nav.Link href='ParkName' className='link-secondary'>Temp to Park</Nav.Link>
        </Nav.Item>
      </Nav>
      {isShown && (
        <div>
          <p>{parkSelections}</p>
          <p>{stateSelections}</p>
          <p>{actSelections}</p>
          <Results choice={parkSelections} />
        </div>
      )}
    </div>
  );
}

export default Search;