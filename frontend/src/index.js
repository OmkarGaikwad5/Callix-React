import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AlertProvider } from './contexts/AlertContext';  // <-- import your AlertProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
);

reportWebVitals();
