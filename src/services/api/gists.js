import axios from '../../util/AxiosConfig';

export const getUserGists = username => axios.get(`users/${username}/gists`);
export const getAllPublicGists = () => axios.get(`gists/public`);
