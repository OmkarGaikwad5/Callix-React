import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAlert } from '../contexts/AlertContext'; // ✅ Correct import

export default function History() {
  const { getHistoryOfUser, clearHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const { showAlert } = useAlert(); // ✅ Use alert hook

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (err) {
        console.error('Error fetching history:', err);
        showAlert("Failed to load history.", "error"); // ✅ Optional alert
      }
    };

    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      await clearHistoryOfUser();
      setMeetings([]);
      showAlert("Meeting history cleared successfully!", "success"); // ✅ Alert on success
    } catch (err) {
      console.error('Error clearing history:', err);
      showAlert("Failed to clear history.", "error"); // ✅ Alert on error
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        background: 'linear-gradient(to right, #f8fafc, #e0f2fe)',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#0f172a', mb: 2 }}
      >
        Your Call History
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Tooltip title="Clear all history">
          <IconButton
            onClick={handleClearHistory}
            sx={{
              backgroundColor: '#ef4444',
              color: 'white',
              '&:hover': { backgroundColor: '#dc2626' },
              borderRadius: 2,
              paddingX: 2,
              paddingY: 1,
            }}
          >
            Clear History
          </IconButton>
        </Tooltip>
      </Box>

      {meetings.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No past meetings found. Start a new call to see it here.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {meetings.map((e, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    background: 'white',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                      Meeting Code: {e.meetingCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {formatDate(e.date)}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
