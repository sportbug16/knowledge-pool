import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Home as HomeIcon} from '@mui/icons-material';
import { AppBar, Toolbar,  CssBaseline, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';

export default function  profilepage(){
    const designation="Student at BITS Pilani, K.K Birla Goa Campus";
const username=localStorage.getItem("username");
const value1=2;

    const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const postsContent = [
    <Box sx={{ p: 3, bgcolor: '#f5f5f5' }}>
      <h1>Post 1</h1>
      <p>This is the content of Post 1</p>
    </Box>,
    <Box sx={{ p: 3, bgcolor: '#f5f5f5' }}>
      <h1>Post 2</h1>
      <p>This is the content of Post 2</p>
    </Box>,
    // Add more posts as needed
  ];

return(

    <div>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "lightgrey"  }} >
        <Toolbar>
          <Link to='/main'>
            Back to Home
</Link>
        
        </Toolbar>
      </AppBar>
      <Container maxWidth="x1" sx={{ bgcolor: 'lightwhite', height: '100vh' }}>
        <Box>
      <div>
      <Avatar sx={{ bgcolor: "lightblue" ,justifyContent:"flexend" ,width: 70, height: 70, marginTop:2}} ></Avatar>
      </div>{}
      <Typography marginTop={1} fontSize={30} >
Joydeep Saha      
</Typography>
      <Typography>
      @{username}
      </Typography>
      <Rating name="read-only" value={value1} readOnly />
      <Typography>
        {designation}
      </Typography>
      <Typography>
      <Link>
      Download Resume
      </Link>
      </Typography>
      <br></br>
      </Box>
      <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="POSTS" sx={{ px: 31 }} />
        
        <Tab value="two" label="PROGRESS" sx={{ px: 31 }} />
        <Tab value="three" label="BIODATA" sx={{ px: 30 }} />
        
      </Tabs>
    </Box>
      </Container>
      </div>
);
}