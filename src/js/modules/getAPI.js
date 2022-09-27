import axios from 'axios';
import { loaderOn, loaderOff } from './loader';
// ----------------------------------------
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'hMlAGZ78fb479kL5D8c5JYufMfeq7H9T';

const pageSize = 20;

export async function getEvents(event = '', country = 'US', page = 0) {
  const config = {
    baseURL: BASE_URL,
    params: {
      apikey: API_KEY,
      keyword: event,
      countryCode: country,
      size: pageSize,
      page: page,
    },
  };
  try {
    loaderOn();
    const request = await axios(config);
    return request;
  } catch (err) {
    console.log;
  } finally {
    loaderOff();
  }
}
