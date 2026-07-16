import React from 'react';
import { AuthProvider } from './data/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';
import { VirtualitoProvider } from './core/virtualito/VirtualitoContext';
import Router from './router';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VirtualitoProvider>
          <Router />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            newestOnTop
            theme="colored"
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </VirtualitoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
