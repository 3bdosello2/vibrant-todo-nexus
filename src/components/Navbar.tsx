
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStorage } from '../utils/storage';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = userStorage.getCurrentUser();

  const handleLogout = () => {
    userStorage.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-todo-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Todo Nexus</Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline">Welcome, {currentUser.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-todo-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <Link 
                to="/login"
                className="bg-white text-todo-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-todo-primary transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
