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
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
        <Card>
          <Card.Img variant='top' src={g.images[0].url} alt={g.images[0].altText} />
          <Card.Body>
            <Card.Title><a href={g.url}>{g.title}</a></Card.Title>
            <Card.Text>{g.description}</Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }

  const isImage = (web) => {
    if (web.images.length) {
      return (
        <Card.Img src={web.images[0].url} alt={web.images[0].altText} />
        // <img src={web.images[0].url} alt={web.images[0].altText} style={{height:200}}/>
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
      <Masonry columnsCount={4} gutter='10px'>
        {img.map((gall) => (
          <>{checkContraints(gall)}</>
        ))}
      </Masonry>
      <hr></hr>
      <h2>Webcams</h2>
      <Masonry columnsCount={4} gutter='10px'>
        {cam.map((wb) => (
          <Card>
            <Card.Body>
              <Card.Title><a href={wb.url}>{wb.title}</a></Card.Title>
              <Card.Text>{wb.description}</Card.Text>
            </Card.Body>
            {isImage(wb)}
          </Card>
        ))}
      </Masonry>
      <hr></hr>
      <h2>Videos</h2>
      <Masonry columnsCount={4} gutter='10px'>
        {vid.map((v) => (
          <Card>
            <Card.Body>
              <Card.Title><a href={v.permalinkUrl}>{v.title}</a></Card.Title>
              <Card.Text>{v.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}

export default Media;