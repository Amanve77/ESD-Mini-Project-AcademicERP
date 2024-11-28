import { useState, useEffect } from 'react';
import { fetchDepartments } from '../api/departmentApi';

export const useDepartments = (jwtToken) => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await fetchDepartments(jwtToken);
        setDepartments(data);
      } catch (err) {
        setError('Failed to load departments. Please try again.');
      }
    };

    getDepartments();
  }, [jwtToken]);

  return { departments, error };
};
