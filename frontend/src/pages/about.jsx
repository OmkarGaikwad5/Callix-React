import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';
import CloudIcon from '@mui/icons-material/Cloud';

const features = [
  {
    title: 'Cross-Platform Support',
    description: 'Callix works seamlessly across mobile phones, tablets, and desktop browsers.',
    icon: <DevicesIcon fontSize="large" sx={{ color: '#3f51b5' }} />,
  },
  {
    title: 'End-to-End Encryption',
    description: 'All calls are protected with robust encryption protocols, ensuring privacy and safety.',
    icon: <SecurityIcon fontSize="large" sx={{ color: '#f50057' }} />,
  },
  {
    title: 'Instant Meeting History',
    description: 'Your meetings are auto-logged. You can revisit any session with a single click.',
    icon: <HistoryEduIcon fontSize="large" sx={{ color: '#009688' }} />,
  },
  {
    title: 'Lightning Fast Connection',
    description: 'Experience ultra-low latency and smooth video calls regardless of your network speed.',
    icon: <SpeedIcon fontSize="large" sx={{ color: '#ff5722' }} />,
  },
  {
    title: 'Collaborative Features',
    description: 'Share screens, chat, and collaborate easily during your meetings for maximum productivity.',
    icon: <GroupIcon fontSize="large" sx={{ color: '#673ab7' }} />,
  },
  {
    title: 'Cloud Backup',
    description: 'Your call data is securely backed up in the cloud, accessible anytime from anywhere.',
    icon: <CloudIcon fontSize="large" sx={{ color: '#00bcd4' }} />,
  },
];

function About() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f8fafc, #e0eafc)',
        minHeight: '100vh',
        py: 8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            About <Box component="span" sx={{ color: '#3f51b5' }}>Callix</Box>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            paragraph
            sx={{
              maxWidth: 700,
              margin: '0 auto',
              color: '#444',
              fontSize: { xs: '1rem', sm: '1.125rem' },
              lineHeight: 1.6,
            }}
          >
            Callix is your modern solution to secure, high-quality, and user-friendly video calling.
            Whether you're attending a lecture, connecting with colleagues, or catching up with friends,
            Callix provides the reliability and clarity you need – across any device, anytime.
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 6 }}>
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    maxWidth: 360,
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {feature.icon}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ ml: 1.5, fontWeight: 700 }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
