import { useState } from 'react';
import "./park.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ParkAlerts from "./PAlert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';

const Park = () => {
  return (
    <div id="park-page">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <h1>Park Name</h1>
      <ParkAlerts />
      <Container>
        <h3>Description:</h3>
      </Container>
      <Tabs defaultActiveKey="contact" fill>
        <Tab eventKey="contact" title="Contact Info">Contact Information!</Tab>
        <Tab eventKey="weather" title="Weather">Weather Information!</Tab>
        <Tab eventKey="fees" title="Fees/Parking">Fees and Parking Information!</Tab>
      </Tabs>
      <Nav className='side-nav flex-column'>
        <Nav.Link href="ParkName/hours">Operating Hours</Nav.Link>
        <Nav.Link href="ParkName/camping">Camping</Nav.Link>
        <Nav.Link href="ParkName/activites">Avtivites/Things to Do</Nav.Link>
        <Nav.Link href="ParkName/media">Videos/Webcams</Nav.Link>
      </Nav>
    </div>
  );
}

export default Park;