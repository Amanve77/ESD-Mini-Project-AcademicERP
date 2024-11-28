import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const saveEmployee = async (employeeData, jwtToken) => {
  const response = await axios.post(`${BASE_URL}/employees`, employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}`,
    },
  });
  return response.data;
};

export const fetchEmployee = async (empId, jwtToken) => {
    const response = await axios.get(`${BASE_URL}/employees/${empId}`, {
      headers: { 
        Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}` },
    });
    return response.data;
  };
  
  export const updateEmployee = async (empId, employeeData, jwtToken) => {
    const response = await axios.put(`${BASE_URL}/employees/${empId}`, employeeData, {
      headers: {
        Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

export const fetchAllEmployees = async (jwtToken) => {
  const response = await axios.get(`${BASE_URL}/employees`, {
    headers: { 
        Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}` },
  });
  return response.data;
};

export const deleteEmployeeById = async (empId, jwtToken) => {
  const response = await axios.delete(`${BASE_URL}/employees/${empId}`, {
    headers: { 
        Authorization: `Bearer ${jwtToken || localStorage.getItem('jwtToken')}` },
  });
  return response.data;
};

export const buildImageUrl = (filename) => `${BASE_URL}/employees/photos/${filename}`;
