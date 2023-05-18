import { useState, useEffect } from 'react';
import "./park.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ParkAlerts from "../../components/PAlert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';

const Park = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/park`)
      .then((res) => res.json())
      .then((data) => setMessage(data.pName));
  }, []);

  return (
    <div id="park-page">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <h1>{message}</h1>
      <ParkAlerts />
      <Container id="description">
        <h3>Description:</h3>
      </Container>
      <Tabs defaultActiveKey="contact" fill>
        <Tab className="tabContent" eventKey="contact" title="Contact Info">Contact Information!</Tab>
        <Tab className="tabContent" eventKey="weather" title="Weather">Weather Information!</Tab>
        <Tab className="tabContent" eventKey="fees" title="Fees/Parking">Fees and Parking Information!</Tab>
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