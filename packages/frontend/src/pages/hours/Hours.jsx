import { Link, useLocation } from 'react-router-dom';
import HoursControl from '../../components/hoursControl';
import { displayNoInfo } from '../../components/noInfo/noInfo';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./hours.css";
import '../../components/noInfo/noInfo.css';

// display park hours if they exist
const Hours = () => {
  const location = useLocation();
  const hoursInfo = location.state.opHours;

  // check if there are hours to display
  const checkHours = (info) => {
    return info.length ? (
      <div>
        <h1 id="title">Operating Hours</h1>
          <Row id='hr-list'>
            {info.map((ent, i) => (
              <Col className='hrs' key={i}  md={6} sm={12}>
                <HoursControl data={ent} />
              </Col>
            ))}
          </Row>
      </div>
    ) : displayNoInfo('hours');
  }

  return (
    <div id='hour-pg'>
      <Navbar id="hour-nav" fixed='top'>
        <Container className='nav-container'>
          <Navbar.Brand href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
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
      {checkHours(hoursInfo)}
    </div>
  );
}

export default Hours;
