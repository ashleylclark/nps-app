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
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

const Park = () => {
  let params = useParams();
  const navigate = useNavigate();

  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const fetchPark = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/park/${params.id}`);
    const data = await response.json();
    setInfo(data[0]);
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
                <Link className='pLinks' to="media" state={{ code: params.id }}>Videos/Webcams</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container id="header">
        <h1 id="name">{info.fullName}</h1>
        <ParkAlerts code={params.id} />
      </Container>
      <Container id="description">
        <h3>Description:</h3>
        <p>{info.description}</p>
      </Container>
      <Container id="info-tabs">
        <Tabs defaultActiveKey="contact" fill id="tabs">
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
          <Tab className="tabContent" eventKey="activities" title="Activities">
            <Row md={3}>
              {info.activities.map((entry) => (
                <Col>
                  <Card className='actCard'>
                    <Card.Body>{entry.name}</Card.Body>
                  </Card>
                </Col>
                ))}
            </Row>
          </Tab>
          <Tab className="tabContent" eventKey="fees" title="Fees/Parking">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Cost</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {info.entranceFees.map((entry) => (
                  <tr>
                    <td>{entry.title}</td>
                    <td>{entry.cost}</td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
                {info.entrancePasses.map((entry) => (
                  <tr>
                    <td>{entry.title}</td>
                    <td>{entry.cost}</td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Park;