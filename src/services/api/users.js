import axios from '../../util/axiosConfig';

export const getUserInfo = () => axios.get(`user`);
