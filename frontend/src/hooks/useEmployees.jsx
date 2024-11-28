import { useState, useEffect } from 'react';
import { fetchAllEmployees } from '../api/employeeApi';

export const useEmployees = (jwtToken) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchAllEmployees(jwtToken);
        setEmployees(data);
      } catch (err) {
        setError('Failed to load employees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [jwtToken]);

  return { employees, loading, error, setEmployees };
};
