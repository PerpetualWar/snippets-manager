import React from 'react';
import axios from 'axios';
import Storage from './storage/Storage';

const configuredAxios = axios.create({
  // baseURL: 'https://api.github.com/',
  baseURL: process.env.REACT_APP_BASE_API_URL,
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
    const originalReq = err.config;

    console.log('err.response :', err.message);

    if (err.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (!Storage.get('refresh_token')) {
        Promise.reject('Session expired');
        window.location.replace('/login');
      }

      const refreshToken = Storage.get('refresh_token');

      return axios
        .post('https://weathery-api.herokuapp.com/refresh', null, {
          method: 'post',
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
        .then(({ data }) => {
          Storage.set('access_token', data.access_token);
          return configuredAxios(originalReq);
        });
    }

    return Promise.reject(err);
  }
);

export default configuredAxios;
