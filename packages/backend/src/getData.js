import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// get desired data from the NPS API
export async function getData (endpoint, params = {}) {
  params.api_key = process.env.NPS_API_KEY;
  try {
    const res = await axios.get(`https://developer.nps.gov/api/v1/${endpoint}`, {
      params
    });
    return (res.data.data);
  }
  catch (error) {
    console.log(error);
  }
}
