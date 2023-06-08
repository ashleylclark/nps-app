import { useState, useEffect } from 'react';
import "./media.css";
import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Loading from '../../components/loading/Loading';

const Media = () => {
  const location = useLocation();
  const pid = location.state.code;

  const [img, setImg] = useState();
  const [cam, setCam] = useState();
  const [vid, setVid] = useState();
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/${pid}`);
    const data = await response.json();
    setImg(data[0]);
    setCam(data[1]);
    setVid(data[2]);
  }

  useEffect(() => {
    fetchMedia().then(() => setLoading(false));
  }, []);

  // check if images are public domain
  const checkContraints = (g) => {
    if (g.constraintsInfo.constraint === "Public domain") {
      return (
        <Row>
          <Col xs={4}>
            <img src={g.images[0].url} alt={g.images[0].altText} style={{height:200}}/>
          </Col>
          <Col>
            <a href={g.url}>{g.title}</a>
            <p>{g.description}</p>
          </Col>
        </Row>
      )
    }
  }

  const isImage = (web) => {
    if (web.images.length) {
      return (
        <img src={web.images[0].url} alt={web.images[0].altText} style={{height:200}}/>
      );
    }
  }

  return loading ? <Loading /> : (
    <div>
      <Navbar id='park-nav'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <h2>Galleries</h2>
      {img.map((gall) => (
        <>{checkContraints(gall)}</>
      ))}
      <hr></hr>
      <h2>Webcams</h2>
      <Row md={3}>
        {cam.map((wb) => (
          <Col>
            <a href={wb.url}>{wb.title}</a>
            <p>{wb.description}</p>
            {isImage(wb)}
          </Col>
        ))}
      </Row>
      <hr></hr>
      <h2>Videos</h2>
      <Row md={3}>
        {vid.map((v) => (
          <Col>
            <a href={v.permalinkUrl}>{v.title}</a>
            <p>{v.description}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Media;