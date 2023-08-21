import React, { useEffect, useState ,useRef} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import video from '../other files/video6.mp4';
const pages = ['FAQ', 'CONTACTS', 'ABOUT US'];

function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const message = `Welcome to Knowledge Pool!\nDive into the world of Data Structures and Algorithms with our cutting-edge AI-powered question generator. Whether you're a beginner or an experienced coder, our app will challenge and enhance your problem-solving skills.\n\nExplore a vast collection of DSA topics, including arrays, linked lists, sorting algorithms, tree structures, graph theory, and much more. With Knowledge Pool, you'll have access to an extensive library of thought-provoking questions designed to sharpen your understanding and expertise in DSA.\n\nJoin a vibrant community of learners and passionate enthusiasts who are all dedicated to mastering DSA.\nHappy Coding!`;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setWelcomeMessage((prevMessage) => prevMessage + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleVideoTimeUpdate = () => {
    // Define the duration from the end where playback will reverse (e.g., 2 seconds)
    const reverseDuration = 2;
    const videoElement = videoRef.current;

    if (videoElement) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;

      // If the video is close to the end, set the currentTime to a point just before the end
      if (duration - currentTime <= reverseDuration) {
        videoElement.currentTime = duration - reverseDuration;
      }
    }
  };

  return (
    <div>
      <div>
    <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'blur(15px)', // Apply blur effect

        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    <AppBar position="static"  sx={{ elevation: 0,backgroundColor: 'transparent',boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button
            
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' } }}
            >
              REGISTER
            </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }, ml: 2 }}
            >
              LOGIN
            </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
      <div style={{  padding: '16px' }}>
        {/* Write your content here */}
        {welcomeMessage.split('\n').map((paragraph, index) => (
          <Typography key={index} variant="h5" sx={{ color: 'white', marginBottom: '10px' }}>
            {paragraph}
          </Typography>
        ))}
      </div>
   
    </div>
  );
}

export default Home;
