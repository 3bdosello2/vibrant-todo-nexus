
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userStorage } from '../utils/storage';

const HomePage = () => {
  const currentUser = userStorage.getCurrentUser();
  
  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-todo-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Todo Nexus
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The simple yet powerful task management application to help you stay organized
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              to="/register"
              className="bg-todo-primary text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-todo-secondary transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-todo-primary border border-todo-primary px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Simple Organization</h3>
              <p className="text-gray-600">
                Keep all your tasks organized in one place with our intuitive interface.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Priority Management</h3>
              <p className="text-gray-600">
                Easily set priorities for your tasks to focus on what's most important.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Access Anywhere</h3>
              <p className="text-gray-600">
                Your tasks are stored securely and available whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
