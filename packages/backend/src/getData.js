import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getData (endpoint, params = {}) {
  params.api_key = process.env.NPS_API_KEY;
  try {
    const res = await axios.get(`https://developer.nps.gov/api/v1/${endpoint}`, {
      params
    });
    // console.log(params);
    // console.log(res.data.data);
    return (res.data.data);
  }
  catch (error) {
    console.log(error);
  }
}
