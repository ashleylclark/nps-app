export const fetch_data = (point, sel = {}) => {
  console.log(sel);
  const params = new URLSearchParams(sel);
  fetch(`${import.meta.env.VITE_API_BASE_URL}/${point}?${params}`);
}

export function get_key(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
}

export const activties = [
  "activites", "from", "backend", "/activites", "w/ no params"
];