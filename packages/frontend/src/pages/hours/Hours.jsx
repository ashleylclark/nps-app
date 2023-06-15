import { Link, useLocation } from 'react-router-dom';
import HoursControl from '../../components/hoursControl';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./hours.css";

const Hours = () => {
  const location = useLocation();
  const hoursInfo = location.state.opHours;

  return (
    <div id='hour-pg'>
      <Navbar id="hour-nav">
        <Container className='nav-container'>
          <Navbar.Brand href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Link className='pLinks' to={location.pathname + "/../"}>Park</Link>
              <Link className='pLinks' to={location.pathname + "/../camping"} state={location.state}>Camping</Link>
              <Link className='pLinks' to={location.pathname + "/../media"} state={location.state}>Media</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1 id="title">Operating Hours</h1>
      <Row id='hr-list' lg={2} sm={1}>
        {hoursInfo.map((ent, i) => (
          <Col className='hrs' key={i}>
            <HoursControl data={ent} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Hours;