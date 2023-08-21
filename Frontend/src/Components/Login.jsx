import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import delay from './delay1';
const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading,setLoading]= useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlelogin = async (event) => {
    event.preventDefault();
    setSuccess("Loggin in");
    setError("false");
    setLoading(true);
      const response = await fetch('http://localhost:5000/kp/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setError(false);
        setSuccess('Logged in Successfully!Redirecting');
        const data = await response.text();
        localStorage.setItem('token', data);
        const response1= await fetch('http://localhost:5000/kp/users/current', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`, // Attach the token to the Authorization header
          },
        });
        const user=await response1.json();
       // navigate('/main', { state: { data: user } }); // Pass the data as state */
        localStorage.setItem("username",user["username"]); 
        localStorage.setItem("HOME",'/main');
        localStorage.setItem("Generate Questions",'/Gen');
        localStorage.setItem("Problem Set",'/question-list');
        localStorage.setItem("Problem","/question/:questiontype/:id");
        localStorage.setItem("Solution",'"/sol/:questiontype/:id"');
        localStorage.setItem("prevlink","");
        localStorage.setItem("Visited Questions",'/vis');
        localStorage.setItem("All Attempted Questions",'/allvis');
        localStorage.setItem("Filtered Search","/specvis");
        localStorage.setItem("Search using Title","/search");
        localStorage.setItem("email",user["email"]);
        //localStorage/setItem("HOME",'/main');
        setEmail('');
        setPassword('');
        await delay(3000);
        navigate("/main");    
      } else {
        setError(true);
        setSuccess(await response.text());
      }
      setLoading(false);
    
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handlelogin} noValidate sx={{ mt: 1 }}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
          {loading && <div  class="loading-dots">
        <p  className="success-message">{success}</p>
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>}
          {error && !loading && <p style={{ color: 'red' }}>{success}</p>}
          {!error  &&!loading && <p style={{ color: 'green' }}>{success}</p>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
