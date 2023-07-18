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
  const checkContraints = (g, i) => {
    if (g.constraintsInfo.constraint === "Public domain" && i < 25) {
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

  const displayGallery = (img) => {
    return (
      img.map((gall, i) => (
        <div key={i} className='img-gal'>{checkContraints(gall, i)}</div>
      ))
    );
  }

  const displayWebcams = (cam) => {
    return (
      cam.map((wb, i) => (
        <Card className='m-card' key={i}>
          <Card.Body>
            <Card.Title><a className='tile-a' href={wb.url}>{wb.title}</a></Card.Title>
            <Card.Text>{wb.description}</Card.Text>
          </Card.Body>
          {isImage(wb)}
        </Card>
      ))
    );
  }

  const displayVideos = (vid) => {
    return (
      vid.map((v, i) => (
        <Card className='m-card' key={i}>
          <Card.Body>
            <Card.Title><a className='tile-a' href={v.permalinkUrl}>{v.title}</a></Card.Title>
            <Card.Text>{v.description}</Card.Text>
          </Card.Body>
        </Card>
      ))
    )
  }

  return loading ? <Loading /> : (
    <div id='media-pg'>
      <Navbar id='media-nav' fixed='top'>
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
              <Link className='pLinks' to={location.pathname + "/../camping"} state={location.state}>Camping</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 className='m-head'>Galleries</h2>
      <Masonry className='img-tiles gallery-md' columnsCount={5} gutter='20px'>
        {displayGallery(img)}
      </Masonry>
      <Masonry className='img-tiles gallery-sm' columnsCount={3} gutter='20px'>
        {displayGallery(img)}
      </Masonry>
      <Masonry className='img-tiles gallery-xs' columnsCount={1} gutter='20px'>
        {displayGallery(img)}
      </Masonry>
      <h2 className='m-head'>Webcams</h2>
      <Masonry className='img-tiles media-md' columnsCount={5} gutter='20px'>
        {displayWebcams(cam)}
      </Masonry>
      <Masonry className='img-tiles media-sm' columnsCount={2} gutter='20px'>
        {displayWebcams(cam)}
      </Masonry>
      <Masonry className='img-tiles media-xs' columnsCount={1} gutter='20px'>
        {displayWebcams(cam)}
      </Masonry>
      <h2 className='m-head'>Videos</h2>
      <Masonry className='img-tiles media-md' columnsCount={5} gutter='20px'>
        {displayVideos(vid)}
      </Masonry>
      <Masonry className='img-tiles media-sm' columnsCount={2} gutter='20px'>
        {displayVideos(vid)}
      </Masonry>
      <Masonry className='img-tiles media-xs' columnsCount={1} gutter='20px'>
        {displayVideos(vid)}
      </Masonry>
    </div>
  );
}

export default Media;