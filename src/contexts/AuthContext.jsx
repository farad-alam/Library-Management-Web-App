import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('libraryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login logic - in production, this would validate against a real API
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = storedUsers.find((u) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      photoURL: foundUser.photoURL,
    };
    
    setUser(userData);
    localStorage.setItem('libraryUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (name, email, password, photoURL) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = storedUsers.some((u) => u.email === email);
    
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      photoURL: photoURL || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      photoURL: newUser.photoURL,
    };
    
    setUser(userData);
    localStorage.setItem('libraryUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libraryUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};