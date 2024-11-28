import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, loading, error } = useAuth(() => {
    navigate('/dashboard');
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{
          width: '400px', 
          borderRadius: '10px',
          background: '#fff',
        }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          loading={loading}
        />
        <div className="text-center mt-3">
          <small className="text-muted">Admin access only</small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
