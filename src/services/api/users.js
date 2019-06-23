import axios from '../../util/ac';

export const getUserInfo = () => axios.get(`user`);
