import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newBlog, token) => {
  const bToken = `bearer ${token}`;
  const config = {
    headers: { Authorization: bToken },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, addBlog };
