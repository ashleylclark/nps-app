import Table from 'react-bootstrap/Table';

const AmenityTable = (data) => {
  let info = data.data;

  // checking if amenities are present
  if (info.trashRecyclingCollection === "") {
    return (
      <p>No amenities available.</p>
    )
  } else {
    return (
      <Table id='amenities' hover size='sm'>
        <thead>
          <tr>
            <th>Amenity</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trash & Recycling Collection</td>
            <td>{info.trashRecyclingCollection}</td>
          </tr>
          <tr>
            <td>Toilets</td>
            <td>{info.toilets.map((t, i) => (<div key={i}>{t}</div>))}</td>
          </tr>
          <tr>
            <td>Showers</td>
            <td>{info.showers.map((t, i) => (<div key={i}>{t}</div>))}</td>
          </tr>
          <tr>
            <td>Internet</td>
            <td>{info.internetConnectivity}</td>
          </tr>
          <tr>
            <td>Cell Phone Reception</td>
            <td>{info.cellPhoneReception}</td>
          </tr>
          <tr>
            <td>Laundry</td>
            <td>{info.laundry}</td>
          </tr>
          <tr>
            <td>Amphitheater</td>
            <td>{info.amphitheater}</td>
          </tr>
          <tr>
            <td>Dump Station</td>
            <td>{info.dumpStation}</td>
          </tr>
          <tr>
            <td>Camp Store</td>
            <td>{info.campStore}</td>
          </tr>
          <tr>
            <td>Potable Water</td>
            <td>{info.potableWater.map((t, i) => (<div key={i}>{t}</div>))}</td>
          </tr>
          <tr>
            <td>Ice for Sale</td>
            <td>{info.iceAvailableForSale}</td>
          </tr>
          <tr>
            <td>Firewood for Sale</td>
            <td>{info.firewoodForSale}</td>
          </tr>
          <tr>
            <td>Food Storage Lockers</td>
            <td>{info.foodStorageLockers}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default AmenityTable;