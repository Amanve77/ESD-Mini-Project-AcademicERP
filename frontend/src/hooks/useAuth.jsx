import { useState } from 'react';
import { loginAdmin } from '../api/authApi';

export const useAuth = (onSuccess) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem('jwtToken', data.token);
      setLoading(false);
      onSuccess(); 
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return { login, loading, error };
};
