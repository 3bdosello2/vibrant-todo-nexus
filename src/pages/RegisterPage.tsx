
import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { userStorage } from '../utils/storage';

const RegisterPage = () => {
  const currentUser = userStorage.getCurrentUser();
  
  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-todo-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
