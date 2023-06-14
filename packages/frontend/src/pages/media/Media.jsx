import { useState, useEffect } from 'react';
import "./media.css";
import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
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
            <Card.Title><a className='tile-a' href={g.url}>{g.title}</a></Card.Title>
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
      );
    }
  }

  return loading ? <Loading /> : (
    <div id='media-pg'>
      <Navbar id='park-nav'>
        <Container>
          <Navbar.Brand href="/">Search</Navbar.Brand>
        </Container>
      </Navbar>
      <h2 className='m-head'>Galleries</h2>
      <Masonry className='img-tiles' columnsCount={4} gutter='20px'>
        {img.map((gall, i) => (
          <div key={i}>{checkContraints(gall)}</div>
        ))}
      </Masonry>
      <h2 className='m-head'>Webcams</h2>
      <Masonry className='img-tiles' columnsCount={4} gutter='20px'>
        {cam.map((wb, i) => (
          <Card key={i}>
            <Card.Body>
              <Card.Title><a className='tile-a' href={wb.url}>{wb.title}</a></Card.Title>
              <Card.Text>{wb.description}</Card.Text>
            </Card.Body>
            {isImage(wb)}
          </Card>
        ))}
      </Masonry>
      <h2 className='m-head'>Videos</h2>
      <Masonry className='img-tiles' columnsCount={4} gutter='20px'>
        {vid.map((v, i) => (
          <Card key={i}>
            <Card.Body>
              <Card.Title><a className='tile-a' href={v.permalinkUrl}>{v.title}</a></Card.Title>
              <Card.Text>{v.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}

export default Media;