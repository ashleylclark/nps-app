import Table from 'react-bootstrap/Table';

// display fees
const Fees = (info) => {
  info = info.data;
  return (
    <Table id='fee-tbl' striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Cost</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {info.fees.map((entry, i) => (
          <tr key={i}>
            <td>{entry.title}</td>
            <td>{entry.cost}</td>
            <td>{entry.description}</td>
          </tr>
        ))}
        {info.passes.map((entry, i) => (
          <tr key={i}>
            <td>{entry.title}</td>
            <td>{entry.cost}</td>
            <td>{entry.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Fees;
