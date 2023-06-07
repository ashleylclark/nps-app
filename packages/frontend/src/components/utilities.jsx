export const fetch_data = async (stateCode) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/parks/${stateCode}`)
  const data = await res.json();
  return data;
}

export function get_key(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
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