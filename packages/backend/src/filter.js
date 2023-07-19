import { getData } from './getData.js';

// filter parks by state
export async function getParksByState (states) {
  const res = await getData('parks', { stateCode: states, limit: 1000 });
  return filterParks(res);
}

// filter parks by activity/activities
export async function getParksByActivity (activities) {
  let parks = [];
  const res = await getData('activities/parks', { id: activities, limit: 1000 });
  for (var activity of res) {
    parks = parks.concat(activity.parks);
  }
  return filterParks(parks);
}

export function filterParks (parks) {
  // filter out parks that are not official National Parks
  const data = parks.filter(
    park => park.fullName.match(/(National Park(?! for )(?!s of ))|(National and State Park)/)
  );
  return data.map(
    ({ parkCode, states, designation, fullName }) => ({ parkCode, states, designation, fullName })
  );
};