import { useState, useEffect } from 'react';
import { fetchEmployee } from '../api/employeeApi';

export const useEmployee = (empId, jwtToken) => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const data = await fetchEmployee(empId, jwtToken);
        setEmployee(data);
      } catch (err) {
        setError('Failed to fetch employee details. Please try again.');
      }
    };

    getEmployee();
  }, [empId, jwtToken]);

  return { employee, error };
};
