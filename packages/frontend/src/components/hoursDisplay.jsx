import Table from 'react-bootstrap/Table';

const HoursDisplay = (type) => {
  let days = type.type;

  return (
    <Table striped bordered hover>
      <tr>
        <td>Sunday</td>
        <td>{days.sunday}</td>
      </tr>
      <tr>
        <td>Monday</td>
        <td>{days.monday}</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>{days.tuesday}</td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td>{days.wednesday}</td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td>{days.thursday}</td>
      </tr>
      <tr>
        <td>Friday</td>
        <td>{days.friday}</td>
      </tr>
      <tr>
        <td>Saturday</td>
        <td>{days.saturday}</td>
      </tr>
    </Table>
  )
}

export default HoursDisplay;