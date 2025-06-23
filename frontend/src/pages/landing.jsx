// src/pages/LandingPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // make sure bootstrap is imported
import "../App.css";
import "../styles/landingPage.css";
import { AuthContext } from '../contexts/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const handleGetStarted = () => {
    navigate(userData ? "/" : "/auth");
  };

  return (

    <div className="row ">

      {userData ? (
        <div className="welcome-wrapper">
          <motion.div
            className="text-content p-4 rounded-4 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              boxShadow: "0 10px 30px rgba(110, 142, 251, 0.3)",
              color: "#fff",
              textAlign: "center",
              userSelect: "none",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            <h1 className="mb-3" style={{ fontSize: "2.4rem" }}>
              Welcome back,&nbsp;
              <motion.span
                style={{
                  color: "yellow",
                  fontWeight: "700",
                  textShadow: "0 0 8px black",
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {userData.username || "User"}
              </motion.span>
              !
            </h1>

            <p
              className="mb-4"
              style={{
                fontSize: "1.2rem",
                textShadow: "0 0 6px rgba(0,0,0,0.15)",
                fontWeight: "500",
                color: "wheat"
              }}
            >
              Ready to connect with your loved ones?
            </p>

            <motion.button
              onClick={() => navigate("/home")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255,221,87,0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-warning btn-lg rounded-pill fw-bold text-dark shadow"
            >
              Go to Dashboard
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <div className="guest-wrapper">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="guest-content shadow-lg"
          >
            <motion.h1
              className="guest-title mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to <span className="highlight-text">Callix</span>
            </motion.h1>

            <motion.p
              className="guest-subtext"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Secure. Fast. Seamless. Connect with your loved ones from anywhere.
            </motion.p>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                className="btn btn-lg primary-btn rounded-pill"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}


    </div>

  );
}
