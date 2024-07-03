import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';

const App: React.FC = () => {
  return <>
  <AppRoutes />
  <ToastContainer closeOnClick />
  </>
  
};

export default App;
