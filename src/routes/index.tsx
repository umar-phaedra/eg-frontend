import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Signup from '../pages/signup';
import { routes } from '../services/constants';
import Dashboard from '../pages/dashboard';
import { useAuth } from '../context/auth-context';


const AppRoutes: React.FC = () => {
  const { token } = useAuth()  
  
  return(
  <Router>
    <Routes>
      {token ? <>
        <Route path="/" element={<Dashboard />} />
      </> :
      <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </>
      }
       <Route
            path="*"
            element={
              <Navigate
                to={token ? routes.dashboard : routes.login}
              />
            }
          />
    </Routes>
  </Router>
  )
};

export default AppRoutes;
