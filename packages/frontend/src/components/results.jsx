import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Results = (props) => {
  props = props.props;
  let filters = [];
  for (var item in props.choice.stateSelection) {
    filters.push(props.choice.stateSelection[item]);
  }
  for (var item in props.choice.actSelection) {
    filters.push(props.choice.actSelection[item]);
  }

  const checkResults = (res) => {
    if (Object.keys(res).length === 0) {
      return (<p>No Results</p>)
    } else {
      return (
        <Nav className='flex-column'>
        {res.map((p) => (
          <Nav.Link href={p.parkCode} className='resLink'>{p.fullName}</Nav.Link>
        ))}
      </Nav>
      )
    }
  }

  return(
    <Container id='res'>
      <h3>Results for {filters.map((n) => (
        <>
          "{n}"&nbsp;
        </>
      ))}</h3>
      {checkResults(props.info)}
    </Container>
  );
}

export default Results