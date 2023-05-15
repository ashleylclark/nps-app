import { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import "./search.css";


const Search = () => {
  return (
    <div className='search-page'>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col></Col>
          <Col className='park-search' xs={6}>
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
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;