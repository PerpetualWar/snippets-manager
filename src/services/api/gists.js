import axios from '../../util/axiosConfig';

export const getAllPublicGists = () => axios.get(`gists/public`);
export const getUserGists = (username, pageNumber) =>
  axios.get(`users/${username}/gists?page=${pageNumber}&per_page=5`);
export const getGists = () => axios.get(`gists`);
export const editGist = (gistId, files, description) =>
  axios.patch(`gists/${gistId}`, {
    files,
    description,
  });
export const createGist = (files, description, publicArg = true) =>
  axios.post(`gists`, {
    files,
    description,
    public: publicArg,
  });
export const deleteGist = gistId => axios.delete(`gists/${gistId}`);
