import axios from 'axios';

export default class Service {
  protected connector = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
  });
}
