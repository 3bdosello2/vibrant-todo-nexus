
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStorage } from '../../utils/storage';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Find user by email
    const user = userStorage.findUserByEmail(email);
    
    if (!user) {
      setError('User not found');
      toast.error('User not found');
      return;
    }

    if (user.password !== password) {
      setError('Invalid password');
      toast.error('Invalid password');
      return;
    }

    // Set current user and redirect
    userStorage.setCurrentUser(user);
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-todo-primary"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-todo-primary"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-todo-primary text-white font-medium py-2 px-4 rounded-md hover:bg-todo-secondary transition-colors"
        >
          Sign In
        </button>
      </form>
      
      <div className="mt-4 text-center text-gray-600">
        <p>Don't have an account? <a href="/register" className="text-todo-primary hover:underline">Register</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
