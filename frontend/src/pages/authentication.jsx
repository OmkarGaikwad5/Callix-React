import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Paper, Box,
  Typography, Slide, IconButton, InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAlert } from '../contexts/AlertContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
    },
    background: {
      default: '#f3f3f3',
    },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState();
  const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Register
  const [showForm, setShowForm] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
        showAlert("Logged in successfully!", "success");
        navigate("/");
      } else {
        const result = await handleRegister(name, username, password);
        setUsername(""); setPassword(""); setName("");
        setError(""); setFormState(0);
        showAlert(result || "Registered successfully!", "success");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      setError(msg);
      showAlert(msg, "error");
    }
  };

  const toggleForm = (state) => {
    setShowForm(false);
    setTimeout(() => {
      setFormState(state);
      setShowForm(true);
    }, 300);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(to right, #e0eafc, #cfdef3)',
          backgroundSize: 'cover',
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={4}
            sx={{
              width: '100%',
              maxWidth: 420,
              p: 4,
              borderRadius: 4,
              backgroundColor: 'white',
              textAlign: 'center',
              boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
            }}
          >
            <Avatar
              sx={{
                m: '0 auto 16px',
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5" fontWeight={600} mb={2}>
              {formState === 0 ? 'Sign In to Callix' : 'Create Your Account'}
            </Typography>

            {/* Toggle Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant={formState === 0 ? "contained" : "outlined"}
                  onClick={() => toggleForm(0)}
                  sx={{ px: 4, borderRadius: 5, textTransform: 'none' }}
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant={formState === 1 ? "contained" : "outlined"}
                  onClick={() => toggleForm(1)}
                  sx={{ px: 4, borderRadius: 5, textTransform: 'none' }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </Box>

            {/* Auth Form */}
            <Slide direction="up" in={showForm} timeout={400}>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {formState === 1 && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" variant="body2" mt={1}>
                    {error}
                  </Typography>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.3,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      },
                    }}
                    onClick={handleAuth}
                  >
                    {formState === 0 ? "Login" : "Register"}
                  </Button>
                </motion.div>
              </Box>
            </Slide>
          </Paper>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}
