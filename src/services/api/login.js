import axios from 'axios';
// import axios from '../../util/axiosConfig';

export const initiateLogin = () => {
  return (window.location.href = `http://localhost:9999/login`);
  // return axios.get(`http://localhost:9999/login`);
  // return (window.location.href = `${
  //   process.env.REACT_APP_BASE_URL
  // }login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist`);
};

export const sendCode = code =>
  axios.get(`http://localhost:9999/oauth?code=${code}`);
// (window.location.href = `${
//   process.env.REACT_APP_BASE_API_URL
// }login/oauth/access_token?client_id=${
//   process.env.REACT_APP_CLIENT_ID
// }&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}`);
// axios.post(
//   `https://github.com/login/oauth/access_token?client_id=7c82a4326bf5e869b8bd&client_secret=5b22b792c5acea9132c97dab73253b1cc40144f9&code=${code}`
// );

export const revoke = () =>
  (window.location.href = `https://github.com/settings/connections/applications/7c82a4326bf5e869b8bd`);
