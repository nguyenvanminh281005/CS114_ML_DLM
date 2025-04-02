import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


// Create the authentication context
const AuthContext = createContext(null);
// const navigate = useNavigate();

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

  const register = async (name, email, password) => {
    setError('');
    setLoading(true);
    try {
      // Đường dẫn API không khớp với Register.js
      // Từ: 'http://127.0.0.1:5000/api/register'
      // Thành: 'http://127.0.0.1:5000/auth/register'
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        username: name, // Thay đổi từ 'name' thành 'username' để khớp với Register.js
        email,
        password
      });
      
      // Tương tự như đã sửa với login, tạo userData từ response
      const userData = {
        username: name,
        email: email,
        token: response.data.token
      };
      
      // Lưu token vào localStorage
      localStorage.setItem('parkinsonsAppUser', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        identifier: email,
        password
      });
  
      console.log("📌 Response từ server:", response.data);
      
      // Tạo userData từ response (không còn response.data.user)
      const userData = {
        username: response.data.username,
        email: response.data.username, // Giả sử username là email
        token: response.data.token,
        // Có thể thêm các trường khác nếu cần
      };
      
      // Lưu vào localStorage
      localStorage.setItem('parkinsonsAppUser', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      
      setCurrentUser(userData);
      return userData; // Trả về đối tượng đã tạo
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('parkinsonsAppUser');
    localStorage.removeItem('token');
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