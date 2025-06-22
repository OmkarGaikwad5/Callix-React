// src/context/AlertContext.js
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', severity: 'info', open: false });

  const showAlert = (message, severity = 'info') => {
    setAlert({ message, severity, open: true });
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert.severity} onClose={handleClose} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
