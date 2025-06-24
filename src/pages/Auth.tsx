
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (data: { email: string; password: string; username?: string }) => {
    console.log('Auth data:', data);
    // In a real app, this would make an API call
    // For now, we'll just navigate to the feed
    navigate('/');
  };

  return (
    <AuthForm
      isLogin={isLogin}
      onSubmit={handleSubmit}
      onToggleMode={() => setIsLogin(!isLogin)}
    />
  );
};

export default Auth;
