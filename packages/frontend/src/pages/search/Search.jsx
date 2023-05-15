import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import "./search.css";


const Search = () => {
  return (
    <div id='search-page'>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='park-search text-center'>
        <h2>Select a Park</h2>
        <p>Choose on of the following search methods</p>
        <Form>
          <div key={`inline-radio`}>
            <Form.Check
              inline
              label="Search"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
            />
            <Form.Check
              inline
              label="By State"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              label="By Activity"
              name="group1"
              type="radio"
              id={`inline-radio-3`}
            />
          </div>
        </Form>
        <Form.Control type="text"/>
      </Container>
      <Nav className='temp'>
        <Nav.Item as="li">
          <Nav.Link href='ParkName' class='link-secondary'>Temp to Park</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Search;