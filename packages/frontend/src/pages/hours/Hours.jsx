import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./hours.css";
import HoursControl from '../../components/hoursControl';

const Hours = () => {
  const location = useLocation();
  const hoursInfo = location.state.opHours;
  // console.log(location, " useLocation Hook");
  console.log(hoursInfo);

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href='/'>Search</Navbar.Brand>
        </Container>
      </Navbar>
      <h1>Operating Hours</h1>
      {hoursInfo.map((ent) => (
        <HoursControl data={ent} />
      ))}
    </div>
  );
}

export default Hours;