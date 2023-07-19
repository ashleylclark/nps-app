import HoursDisplay from "./hoursDisplay";

// check hours for exceptions and display
const HoursControl = (data) => {
  let info = data.data;

  const exceptHours = () => {
    if (info.exceptions.length !== 0) {
      return (
        <div>
          {info.exceptions.map((entry, i) => (
            <div className="hrs-ctr" key={i}>
              <h5>{entry.name}</h5>
              <p>Start Date: {entry.startDate}&emsp;End Date: {entry.endDate}</p>
              <HoursDisplay type={entry.exceptionHours} />
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="hrs-ctr">
      <h4>{info.name}</h4>
      <p>{info.description}</p>
      <HoursDisplay type={info.standardHours} />
      {exceptHours()}
    </div>
  )
}

export default HoursControl;
