
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TaskProvider } from './contexts/TaskContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import UpcomingPage from './pages/UpcomingPage';
import ImportantPage from './pages/ImportantPage';
import CompletedPage from './pages/CompletedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { userStorage } from './utils/storage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = userStorage.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <div className="min-h-screen bg-todo-background flex flex-col">
          <Navbar />
          <Toaster position="top-right" />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upcoming" 
                element={
                  <ProtectedRoute>
                    <UpcomingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/important" 
                element={
                  <ProtectedRoute>
                    <ImportantPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/completed" 
                element={
                  <ProtectedRoute>
                    <CompletedPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </TaskProvider>
    </Router>
  );
};

export default App;
