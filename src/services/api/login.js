import axios from '../../util/AxiosConfig';

export const initiateLogin = () =>
  (window.location.href = `https://github.com/login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist`);
//   (window.location.href = `https://github.com/login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist
// &redirect_uri=https://gatekeeper4aa2.azurewebsites.net/`)
// axios.get(`login/oauth/authorize?client_id=7c82a4326bf5e869b8bd&scope=gist`);
