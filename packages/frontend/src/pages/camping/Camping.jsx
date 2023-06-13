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
    <div id='camp-pg'>
      <Navbar id='park-nav' sticky='top'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Tabs defaultActiveKey={info[0].name}>
        {info.map((entry) => (
          <Tab className='tabContent' eventKey={entry.name} title={entry.name}>
            <p className='camp-p'>{entry.description}</p>
            <h3 className='c-headers'>Hours</h3>
            <Row md={2}>
              {entry.operatingHours.map((ent) => (
                <Col className='c-hrs'>
                  <HoursControl data={ent} />
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <h3 className='c-headers'>Amenities</h3>
                <AmenityTable data={entry.amenities}/></Col>
              <Col>
                <h3 className='c-headers'>Reservations</h3>
                <p id="reserv">{entry.reservationInfo}</p>
                <a id='mkres' href={entry.reservationUrl}>Make a Reservation</a></Col>
            </Row>
            <h3 className='c-headers'>Fees</h3>
            <Table id='c-fees'>
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
            <h3 className='c-headers'>Campsites</h3>
            <ListGroup id='campsites'>
              <ListGroup.Item className='c-info'>Total Sites: {entry.campsites.totalSites}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Electrical Hookup: {entry.campsites.electricalHookups}</ListGroup.Item>
              <ListGroup.Item className='c-info'>RV Only: {entry.campsites.rvOnly}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Tent Only: {entry.campsites.tentOnly}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Horse: {entry.campsites.horse}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Walk or Boat to: {entry.campsites.walkBoatTo}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Group: {entry.campsites.group}</ListGroup.Item>
              <ListGroup.Item className='c-info'>Other: {entry.campsites.other}</ListGroup.Item>
            </ListGroup>
            <h3 className='c-headers'>Additional Info</h3>
            <div id='add-info'>
              <p className="camp-p">{entry.regulationsOverview}</p>
              <h4>Accessability</h4>
              <ul>
                <li className='camp-li'>{entry.accessibility.wheelchairAccess}</li>
                <li className='camp-li'>{entry.accessibility.adaInfo}</li>
              </ul>
              <h4>RVs & Trailers</h4>
              <ul>
                <li className='camp-li'>RV max length: {entry.accessibility.rvMaxLength}</li>
                <li className='camp-li'>Trailer max length: {entry.accessibility.trailerMaxLength}</li>
                <li className='camp-li'>{entry.accessibility.rvInfo}</li>
              </ul>
              <h4>Other</h4>
              <p>{entry.accessibility.cellPhoneInfo} {entry.accessibility.internetInfo}</p>
              <p>{entry.accessibility.fireStovePolicy}</p>
              <p>{entry.accessibility.additionalInfo}</p>
              <p>{entry.accessibility.accessRoads}</p>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default Camping;