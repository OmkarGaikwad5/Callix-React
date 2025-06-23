// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/navbar.css';

import {  Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const buttonStyle = {
    textTransform: 'none',
    color: '#1f2937', // Dark gray text for light backgrounds
    background: 'linear-gradient(135deg, #f9fafb, #e5e7eb)', // Light gray-white gradient
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '10px 22px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '1rem',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.03)',
      borderColor: 'rgba(0, 0, 0, 0.08)',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    },
  };



  const logoutButtonStyle = {
    textTransform: 'none',
    color: '#991b1b', // Dark red text for contrast
    background: 'linear-gradient(135deg, #fdecea, #fef2f2)', // Soft red-pink gradient
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '10px 22px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '1rem',
    border: '1px solid rgba(239, 68, 68, 0.1)',
    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      transform: 'translateY(-2px) scale(1.03)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.15)',
    },
  };


  return (
    <nav className="callix-navbar">
      <div className="navbar-inner">
        <div className="navbar-left" onClick={() => handleNavClick('/')}>
          <h2>Callix 📞</h2>
        </div>

        {/* Desktop Buttons */}
        <div className="navbar-right desktop-buttons">
          <Button onClick={() => handleNavClick('/home')} sx={buttonStyle} startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button onClick={() => handleNavClick('/history')} sx={buttonStyle} startIcon={<HistoryIcon />}>
            Call History
          </Button>
          <Button onClick={handleLogout} sx={logoutButtonStyle} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="navbar-right mobile-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon style={{ color: 'white' }} /> : <MenuIcon style={{ color: 'white' }} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Button onClick={() => handleNavClick('/home')} sx={buttonStyle} startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button onClick={() => handleNavClick('/history')} sx={buttonStyle} startIcon={<HistoryIcon />}>
            Call History
          </Button>
          <Button onClick={handleLogout} sx={logoutButtonStyle} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
