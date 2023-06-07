import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Results = (props) => {
  props = props.props;
  // map .choice????
  return(
    <Container id='res'>
      <h3>Results for {props.choice.map((n) => (
        <>
          "{n}"&nbsp;
        </>
      ))}</h3>
      <Nav className='flex-column'>
        {Object.keys(props.info).map((p) => (
          <Nav.Link href={p} className='resLink'>{props.info[p]}</Nav.Link>
        ))}
      </Nav>
    </Container>
  );
}

export default Results