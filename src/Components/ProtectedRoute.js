import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/FirebaseContext'; 

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext); 

  if (!user) {
    alert("Please Login to continue..")
    return <Navigate to="/login" />;
  }

  return element; 
};

export default ProtectedRoute;
