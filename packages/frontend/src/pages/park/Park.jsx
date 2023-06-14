import { useState, useEffect } from 'react';
import "./park.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import ParkAlerts from "../../components/alert/Alert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Fees from '../../components/fees';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { format_date } from '../../components/utilities';

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

  const isAlert = () => {
    if (alert.length) {
      return (
        <>
        {alert.map((entry, i) => (
          <div className="alrt" key={i}>
            <Row><Col md={6} sm={8}><h3>{entry.title}</h3></Col><Col><h4><em>{entry.category}</em></h4></Col></Row>
            <p>{entry.description}</p>
            {format_date(entry.lastIndexedDate)}
            <hr/>
          </div>
        ))}
        </>
      );
    } else {
      return(
        <p>No active alerts at this time.</p>
      );
    }
  }

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
      <Row id="main" md={2} sm={1} xs={1}>
        <Col id="desc" md={6}>
          <Container id="header">
            <h1 id="name">{info.fullName}</h1>
          </Container>
          <Container id="description">
            <h3>Description:</h3>
            <p>{info.description}</p>
          </Container>
        </Col>
        <Col id="act" md={6}>
          <Masonry columnsCount={3} gutter='5px'>
            {info.activities.map((entry, i) => (
                <Card key={i} className='actCard'>
                  <Card.Body>{entry.name}</Card.Body>
                </Card>
              ))}
          </Masonry>
        </Col>
      </Row>
      <Container id="info-tabs">
        <Tabs defaultActiveKey="alert" fill id="tabs">
          <Tab className='tabContent' eventKey="alert" title="Alerts">
            {isAlert()}
          </Tab>
          <Tab className="tabContent" eventKey="contact" title="Contact Info">
            <Row>
              <Col md={4}>
                <h3>Phone:</h3>
                {info.contacts.phoneNumbers.map((entry, i) => (
                  <div key={i}>
                    <h4>{entry.type}:</h4>
                    <p>{entry.phoneNumber}</p>
                  </div>
                ))}
              </Col>
              <Col>
                <h3>Email:</h3>
                {info.contacts.emailAddresses.map((entry, i) => (
                  <p key={i}>{entry.emailAddress}</p>
                ))}
              </Col>
            </Row>
          </Tab>
          <Tab className="tabContent" eventKey="weather" title="Weather">
            <p>{info.weatherInfo}</p>
          </Tab>
          <Tab className="tabContent" eventKey="fees" title="Fees/Parking">
            {showFees()}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Park;