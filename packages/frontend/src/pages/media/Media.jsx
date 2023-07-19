import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Masonry from 'react-responsive-masonry';
import Loading from '../../components/loading/Loading';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import "./media.css";

// display galleries, webcams, and videos for park
const Media = () => {
  const location = useLocation();
  const parkId = location.state.code;

  const [img, setImg] = useState();
  const [cam, setCam] = useState();
  const [vid, setVid] = useState();
  const [loading, setLoading] = useState(true);

  // get media info from backend
  const fetchMedia = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/${parkId}`);
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
        <Card className='m-card ovContainer'>
          <Card.Img variant='top' src={g.images[0].url} alt={g.images[0].altText} />
          <div className='overlay'><a className='tile-a' href={g.url}>{g.title}</a></div>
        </Card>
      )
    }
  }

  // display cover image for webcam if there is one
  const isImage = (webcam) => {
    if (webcam.images.length) {
      return (
        <Card.Img src={webcam.images[0].url} alt={webcam.images[0].altText} />
      );
    }
  }

  // display gallery cover images for each gallery
  const displayGallery = (img) => {
    return (
      img.map((gall, i) => (
        <div key={i} className='img-gal'>{checkContraints(gall, i)}</div>
      ))
    );
  }

  // display info for each webcam
  const displayWebcams = (webcam) => {
    return (
      webcam.map((wc, i) => (
        <Card className='m-card' key={i}>
          <Card.Body>
            <Card.Title><a className='tile-a' href={wc.url}>{wc.title}</a></Card.Title>
            <Card.Text>{wc.description}</Card.Text>
          </Card.Body>
          {isImage(wc)}
        </Card>
      ))
    );
  }

  // display info for each video
  const displayVideos = (vid) => {
    return (
      vid.map((video, i) => (
        <Card className='m-card' key={i}>
          <Card.Body>
            <Card.Title><a className='tile-a' href={video.permalinkUrl}>{video.title}</a></Card.Title>
            <Card.Text>{video.description}</Card.Text>
          </Card.Body>
        </Card>
      ))
    );
  }

  // display media info (three sections for each type for responsive display)
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
