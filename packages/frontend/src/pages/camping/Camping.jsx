import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./camping.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../components/loading/Loading';
import AmenityTable from '../../components/amenityTable';
import HoursControl from '../../components/hoursControl';

const Camping = () => {
  const location = useLocation();
  // pid holds park id
  const pid = location.state.code;

  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCamp = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/camps/${pid}`);
    const data = await response.json();
    setInfo(data);
  }

  useEffect(() => {
    fetchCamp().then(() => setLoading(false))
  }, []);

  return loading ? <Loading /> : (
    <div>
      <Navbar id='park-nav' sticky='top'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Tabs defaultActiveKey={info[0].name} id="cTabs">
        {info.map((entry) => (
          <Tab className='tabContent' eventKey={entry.name} title={entry.name}>
            <p>{entry.description}</p>
            <h4>Hours</h4>
            {entry.operatingHours.map((ent) => (
              <HoursControl data={ent} />
            ))}
            <h4>Reservations</h4>
            <p>{entry.reservationInfo}</p>
            <a href={entry.reservationUrl}>Make a Reservation</a>
            <h4>Amenities</h4>
            <AmenityTable data={entry.amenities}/>
            <h4>Fees</h4>
            <Table>
              <thead>
                <tr>
                  <th>Fee</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {entry.fees.map((f) => (
                  <tr>
                    <td>{f.title}</td>
                    <td>${f.cost}</td>
                    <td>{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4>Campsites</h4>
            <ListGroup>
              <ListGroup.Item>Total Sites: {entry.campsites.totalSites}</ListGroup.Item>
              <ListGroup.Item>Electrical Hookup: {entry.campsites.electricalHookups}</ListGroup.Item>
              <ListGroup.Item>RV Only: {entry.campsites.rvOnly}</ListGroup.Item>
              <ListGroup.Item>Tent Only: {entry.campsites.tentOnly}</ListGroup.Item>
              <ListGroup.Item>Horse: {entry.campsites.horse}</ListGroup.Item>
              <ListGroup.Item>Walk or Boat to: {entry.campsites.walkBoatTo}</ListGroup.Item>
              <ListGroup.Item>Group: {entry.campsites.group}</ListGroup.Item>
              <ListGroup.Item>Other: {entry.campsites.other}</ListGroup.Item>
            </ListGroup>
            <h4>Additional Info</h4>
            <p>{entry.regulationsOverview}</p>
            <h5>Accessability</h5>
            <ul>
              <li>{entry.accessibility.wheelchairAccess}</li>
              <li>{entry.accessibility.adaInfo}</li>
            </ul>
            <h5>RVs & Trailers</h5>
            <ul>
              <li>RV max length: {entry.accessibility.rvMaxLength}</li>
              <li>Trailer max length: {entry.accessibility.trailerMaxLength}</li>
              <li>{entry.accessibility.rvInfo}</li>
            </ul>
            <h5>Other</h5>
            <p>{entry.accessibility.cellPhoneInfo} {entry.accessibility.internetInfo}</p>
            <p>{entry.accessibility.fireStovePolicy}</p>
            <p>{entry.accessibility.additionalInfo}</p>
            <p>{entry.accessibility.accessRoads}</p>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default Camping;