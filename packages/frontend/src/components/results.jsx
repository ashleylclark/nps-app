import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Results = (props) => {
  props = props.props;

  const checkResults = (res) => {
    if (Object.keys(res).length === 0) {
      return (<p>No Results</p>)
    } else {
      return (
        <Nav className='flex-column'>
        {Object.keys(res).map((p) => (
          <Nav.Link href={p} className='resLink'>{res[p]}</Nav.Link>
        ))}
      </Nav>
      )
    }
  }

  return(
    <Container id='res'>
      <h3>Results for {props.choice.map((n) => (
        <>
          "{n}"&nbsp;
        </>
      ))}</h3>
      {checkResults(props.info)}
    </Container>
  );
}

export default Results