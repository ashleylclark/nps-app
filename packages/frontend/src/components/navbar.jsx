import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const NavBar = (info) => {
  let Info = info.info;
  console.log(Info)
  return (
    <Navbar id='park-nav' sticky='top'>
      <Container>
        <Navbar.Brand href="/">Search</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Link className='pLinks' to="hours" state={Info}>Hours</Link>
            <Link className='pLinks' to="camping" state={{ code: Info.pkID }}>Camping</Link>
            <Link className='pLinks' to="media" state={{ code: Info.pkID }}>Media</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;