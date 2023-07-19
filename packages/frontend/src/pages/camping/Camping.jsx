import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import AmenityTable from '../../components/amenityTable';
import HoursControl from '../../components/hoursControl';
import { displayNoInfo } from '../../components/noInfo/noInfo';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./camping.css";
import '../../components/noInfo/noInfo.css';

// display camping info if it exists
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

  const checkInfo = (info) => {
    return info.length ? (
      <Tab.Container defaultActiveKey={info[0].name}>
        <Row id='camp-cont'>
          <Col sm={2} id='camp-nav'>
            <Nav variant='underline' className='flex-column' id='camp-nav'>
              {info.map((entry, i) => (
                <Nav.Item><Nav.Link eventKey={entry.name} className='cust-tab'>{entry.name}</Nav.Link></Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={10} id='camp-pane'>
            <Tab.Content>
              {info.map((entry, i) => (
                <Tab.Pane eventKey={entry.name}>
                  <h2 className='c-headers'>{entry.name}</h2>
                  <p className='camp-p'>{entry.description}</p>
                  <h3 className='c-headers'>Hours</h3>
                  <Row className='camp-hrs' md={2}>
                    {entry.operatingHours.map((ent, i) => (
                      <Col className='c-hrs' key={i}>
                        <HoursControl data={ent} />
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col sm='12' lg='6'>
                      <h3 className='c-headers'>Amenities</h3>
                      <AmenityTable data={entry.amenities}/>
                    </Col>
                    <Col>
                      <h3 className='c-headers'>Reservations</h3>
                      <p id="reserv">{entry.reservationInfo}</p>
                      <a id='mkres' href={entry.reservationUrl}>Make a Reservation</a>
                    </Col>
                  </Row>
                  <h3 className='c-headers'>Fees</h3>
                  <Table id='c-fees' bordered>
                    <thead>
                      <tr>
                        <th>Fee</th>
                        <th>Cost</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.fees.map((f, i) => (
                        <tr key={i}>
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
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    ) : displayNoInfo('camping')
  }

  return loading ? <Loading /> : (
    <div id='camp-pg'>
      <Navbar id='hour-nav' fixed='top'>
        <Container className='nav-container'>
          <Navbar.Brand href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
            </svg>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Link className='pLinks' to={location.pathname + "/../"}>Park</Link>
              <Link className='pLinks' to={location.pathname + "/../hours"} state={location.state}>Hours</Link>
              <Link className='pLinks' to={location.pathname + "/../media"} state={location.state}>Media</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {checkInfo(info)}
    </div>
  );
}

export default Camping;
