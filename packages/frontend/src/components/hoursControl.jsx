import HoursDisplay from "./hoursDisplay";

const HoursControl = (data) => {
  let info = data.data;

  const exceptHours = () => {
    if (info.exceptions.length !== 0) {
      return (
        <div>
          {info.exceptions.map((ent, i) => (
            <div className="hrs-ctr" key={i}>
              <h5>{ent.name}</h5>
              <p>Start Date: {ent.startDate}&emsp;End Date: {ent.endDate}</p>
              <HoursDisplay type={ent.exceptionHours} />
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
};

export default HoursControl;