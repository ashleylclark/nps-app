export const fetch_data = async (stateCode) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/${stateCode}`)
  const data = await res.json();
  return data;
}

export function get_key(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
}

export function get_keys(obj, val) {
  let res = [];
  for (var item in val) {
    res.push(get_key(obj, val[item]));
  }
  return res;
}

export function get_ids(arr, vals) {
  let res = [];
  for (let i = 0; i < vals.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (vals[i] === arr[j].name) {
        res.push(arr[j].id);
      }
    }
  }
  return res;
}

export function format_date(date) {
  let d = date.split(' ');
  let newD = d[0].split('-');
  let time = d[1].substring(0,5);
  let newDate = `${newD[1]}-${newD[2]}-${newD[0]}`
  return (<>{newDate}&nbsp;&nbsp;{time}</>);
}