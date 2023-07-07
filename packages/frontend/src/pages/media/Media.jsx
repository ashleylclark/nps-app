import { useState, useEffect } from 'react';
import "./media.css";
import { useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
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

  // check if images are public domain and display
  const checkContraints = (g) => {
    if (g.constraintsInfo.constraint === "Public domain") {
      return (
        // <div className='container'>
        <Card className='m-card ovContainer'>
          <Card.Img variant='top' src={g.images[0].url} alt={g.images[0].altText} />
          {/* <Card.Body>
            <Card.Title><a className='tile-a' href={g.url}>{g.title}</a></Card.Title>
            <Card.Text>{g.description}</Card.Text>
          </Card.Body> */}
          <div className='overlay'><a className='tile-a' href={g.url}>{g.title}</a></div>
        </Card>
        // </div>
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
        <Container className='nav-container'>
          <Navbar.Brand href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Link className='pLinks' to={location.pathname + "/../"}>Park</Link>
              <Link className='pLinks' to={location.pathname + "/../hours"} state={location.state}>Hours</Link>
              <Link className='pLinks' to={location.pathname + "/../camping"} state={location.state}>Camping</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 className='m-head'>Galleries</h2>
      <Masonry className='img-tiles' columnsCount={5} gutter='20px'>
        {img.map((gall, i) => (
          <div key={i} className='img-gal'>{checkContraints(gall)}</div>
        ))}
      </Masonry>
      <h2 className='m-head'>Webcams</h2>
      <Masonry className='img-tiles' columnsCount={4} gutter='20px'>
        {cam.map((wb, i) => (
          <Card className='m-card' key={i}>
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
          <Card className='m-card' key={i}>
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