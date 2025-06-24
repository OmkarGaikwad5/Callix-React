import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

// Import MUI icons used in the feature cards
import HdIcon from '@mui/icons-material/Hd';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    await addToUserHistory(meetingCode.trim());
    navigate(`/${meetingCode.trim()}`);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', background: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            overflowX: 'hidden',
          }}
        >
          {/* Main Section */}
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3rem 2rem',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {/* Left Panel */}
            <motion.div
              style={{
                flex: '1 1 400px',
                maxWidth: '500px',
                padding: '2rem',
                textAlign: 'left',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{
                  fontSize: '1.8rem',
                  marginBottom: '1.5rem',
                  color: '#333',
                  userSelect: 'none',
                }}
              >
                High-Quality Video Calling, Just Like High-Quality Education 🎓
              </h2>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <TextField
                  onChange={(e) => setMeetingCode(e.target.value)}
                  label="Enter Meeting Code"
                  variant="outlined"
                  fullWidth
                  value={meetingCode}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleJoinVideoCall}
                  disabled={!meetingCode.trim()}
                  sx={{
                    background:
                      'linear-gradient(135deg, rgb(225, 227, 250) 0%, rgb(134, 135, 151) 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    paddingX: 3,
                    paddingY: 1.5,
                    whiteSpace: 'nowrap',
                    transition: 'background 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #87cefa 0%, #00bfff 100%)',
                    },
                  }}
                >
                  Join
                </Button>
              </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              style={{
                flex: '1 1 300px',
                maxWidth: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
              }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >

            </motion.div>
          </div>

          {/* Informative Section */}
          <div
            style={{
              flex: '0 0 auto',
              padding: '3rem 2rem',
              backgroundColor: '#f8fafc',
              textAlign: 'center',
              width: '100%',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1.5rem' }}>
              📌 Did You Know This About Callix ?
            </h2>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                rowGap: '2.5rem',
                maxWidth: '1000px',
                margin: '0 auto',
                marginBottom: '25px',
              }}
            >
              {[
                {
                  title: 'High Definition Video',
                  desc: 'Enjoy crystal clear video quality for all your meetings, making conversations feel lifelike.',
                  icon: <HdIcon fontSize="large" sx={{ color: '#2196f3' }} />,
                },
                {
                  title: 'Adaptive Bandwidth',
                  desc: 'Callix automatically adjusts video quality based on your network speed to prevent lag and freezes.',
                  icon: <NetworkCheckIcon fontSize="large" sx={{ color: '#4caf50' }} />,
                },
                {
                  title: 'Screen Sharing',
                  desc: 'Share your entire screen or specific applications instantly with all meeting participants.',
                  icon: <ScreenShareIcon fontSize="large" sx={{ color: '#ff9800' }} />,
                }

            

              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  style={{
                    flex: '1 1 250px',
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                  <h3 style={{ margin: '1rem 0 0.5rem', color: '#222' }}>{item.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
