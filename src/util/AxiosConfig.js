import React from 'react';
import axios from 'axios';
import Storage from './storage/storage';

const configuredAxios = axios.create({
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

    if (err.response.status === 401) {
    }

    return Promise.reject(err);
  }
);

export default configuredAxios;
