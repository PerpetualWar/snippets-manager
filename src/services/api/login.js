import axios from 'axios';

export const initiateLogin = () => {
  // return (window.location.href = `${
  //   process.env.REACT_APP_BASE_URL
  // }login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist,user:email`);

  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist,user:email`
  );
};

export const sendCode = code =>
  axios.get(`${process.env.REACT_APP_REDIRECT_AUTH_URL}oauth?code=${code}`);
