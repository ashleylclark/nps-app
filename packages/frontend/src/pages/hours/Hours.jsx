import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./hours.css";
import HoursControl from '../../components/hoursControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Hours = () => {
  const location = useLocation();
  const hoursInfo = location.state.opHours;

  return (
    <div id='hour-pg'>
      <Navbar id="hour-nav">
        <Container>
          <Navbar.Brand href='/'>Search</Navbar.Brand>
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