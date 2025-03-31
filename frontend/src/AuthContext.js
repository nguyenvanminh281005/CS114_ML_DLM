import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the authentication context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('parkinsonsAppUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('parkinsonsAppUser');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('parkinsonsAppUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('parkinsonsAppUser');
    }
  }, [currentUser]);

  // Register a new user
  const register = async (name, email, password) => {
    setError('');
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:5000/api/register', {
        name,
        email,
        password
      });
      
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email,
        password
      });
      
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
  };

  // For demo/development purposes - create a mock login that doesn't require backend
  const mockLogin = (email, password) => {
    const mockUser = {
      id: '123456',
      name: email.split('@')[0],
      email: email,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(mockUser);
    return mockUser;
  };

  // For demo/development purposes - create a mock registration that doesn't require backend
  const mockRegister = (name, email, password) => {
    const mockUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(mockUser);
    return mockUser;
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    mockLogin,
    mockRegister
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};