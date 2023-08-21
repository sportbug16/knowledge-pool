import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import LockOutlinedIcon
// Create a custom theme if you have a custom theme, otherwise, you can use the default theme like this:
const defaultTheme = createTheme();

const EditProfile = () => {
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Initialize with the user's current username
  const [email, setEmail] = useState(''); // Initialize with the user's current email
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Handle the form submission here (e.g., update the user's profile on the server)
    console.log('Username:', username);
    console.log('Email:', email);
    event.preventDefault();
    setLoading(true);
    try {
    const response = await fetch('http://localhost:5000/kp/users/update-profile', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header

    },
    body: JSON.stringify({ username, email }),
    });

    if (response.ok) {
        localStorage.setItem("username",username); 

    setError(false);
    setSuccess('Profile updated successfully');
    }else {
        setError(true);
        const data = await response.text();
        console.log(data);
        setSuccess(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile", error);
      setError(true);
      setSuccess("An error occurred while updating profile.");
    }
  };

  return (
   <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="current-username"
              value={username}
              onChange={handleUsernameChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
          {error && <p style={{ color: 'red' }}>{success}</p>}
          {!error && success && <p style={{ color: 'green' }}>{success}</p>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
