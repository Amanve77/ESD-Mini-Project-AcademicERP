import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const fetchDepartments = async (jwtToken) => {
    const response = await axios.get(`${BASE_URL}/departments`, {
      headers: { 
        Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}` },
    });
    return response.data;
  };