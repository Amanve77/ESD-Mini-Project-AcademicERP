import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
  return response.data;
};
