import axios from 'axios';
import Storage from './storage/storage';

const configuredAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    //this header needed so we get newly fetched response
    //instead of cached response
    'If-None-Match': '',
  },
});

configuredAxios.interceptors.request.use(req => {
  console.log('req :', req);
  if (Storage.get('access_token'))
    req.headers.common.Authorization = `Bearer ${Storage.get('access_token')}`;

  return req;
});

configuredAxios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status === 401) {
      Storage.remove('access_token');
    }

    return Promise.reject(err);
  }
);

export default configuredAxios;
