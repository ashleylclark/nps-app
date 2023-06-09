import { useState, useEffect } from 'react';
import "./park.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ParkAlerts from "../../components/alert/Alert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Fees from '../../components/fees';

const Park = () => {
  let params = useParams();
  const navigate = useNavigate();

  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const [alert, setAlert ] = useState({});



  const fetchPark = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/park/${params.id}`);
    const data = await response.json();
    setInfo(data[0]);

    const alertRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/alert/${params.id}`);
    const aData = await alertRes.json();
    setAlert(aData);
  };

  const showFees = () => {
    if (!info.entranceFees.length && !info.entrancePasses.length) {
      return (<p>No Entrance fees or passes.</p>);
    } else {
      return (<Fees data={{fees: info.entranceFees, passes:info.entrancePasses}}/>);
    }
  };

  useEffect(() => {
    fetchPark().then(() => setLoading(false))
  }, []);

  return loading ? <Loading /> : (
    <div id="park-page">
      <Navbar id='park-nav' sticky='top'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
                <Link className='pLinks' to="hours" state={{ opHours: info.operatingHours }}>Hours</Link>
                <Link className='pLinks' to="camping" state={{ code: params.id }}>Camping</Link>
                <Link className='pLinks' to="media" state={{ code: params.id }}>Media</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Row md={2} sm={1} xs={1} id="header">
        <Col md={4}><h1 id="name">{info.fullName}</h1></Col>
        <Col md={8}><ParkAlerts data={alert} /></Col>
      </Row> */}
      <Row id="main" md={2} sm={1} xs={1}>
        <Col id="desc" md={6}>
          <Container id="header">
            <h1 id="name">{info.fullName}</h1>
            {/* <ParkAlerts id="alert-content" data={alert} /> */}
          </Container>
          <Container id="description">
            <h3>Description:</h3>
            <p>{info.description}</p>
          </Container>
        </Col>
        <Col id="act" md={6}>
          <Row md={2}>
            {info.activities.map((entry) => (
              <Col className='actCol'>
                <Card className='actCard'>
                  <Card.Body>{entry.name}</Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Container id="info-tabs">
        <Tabs defaultActiveKey="alert" fill id="tabs">
          <Tab className='tabContent' eventKey="alert" title="Alerts">
            {alert.map((entry) => (
              <div id="alert">
                <Row><Col md={6} sm={8}><h3>{entry.title}</h3></Col><Col><h4><em>{entry.category}</em></h4></Col></Row>
                <p>{entry.description}</p>
                {entry.lastIndexedDate}
                <hr/>
              </div>
            ))}
          </Tab>
          <Tab className="tabContent" eventKey="contact" title="Contact Info">
            <Row>
              <Col>
                <h3>Phone:</h3>
                {info.contacts.phoneNumbers.map((entry) => (
                  <div>
                    <h4>{entry.type}:</h4>
                    <p>{entry.phoneNumber}</p>
                  </div>
                ))}
              </Col>
              <Col>
                <h3>Email:</h3>
                {info.contacts.emailAddresses.map((entry) => (
                  <div>
                    <p>{entry.emailAddress}</p>
                  </div>
                ))}
              </Col>
            </Row>
          </Tab>
          <Tab className="tabContent" eventKey="weather" title="Weather">
            <p>{info.weatherInfo}</p>
          </Tab>
          {/* <Tab className="tabContent" eventKey="activities" title="Activities">
            <Row md={3}>
              {info.activities.map((entry) => (
                <Col>
                  <Card className='actCard'>
                    <Card.Body>{entry.name}</Card.Body>
                  </Card>
                </Col>
                ))}
            </Row>
          </Tab> */}
          <Tab className="tabContent" eventKey="fees" title="Fees/Parking">
            {showFees()}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Park;