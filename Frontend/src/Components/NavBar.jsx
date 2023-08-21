import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Fade from "@mui/material/Fade";
import { Home as HomeIcon} from '@mui/icons-material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Drawer from '@mui/material/Drawer';
/*function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}*/
const token = localStorage.getItem('token');
const tiers = [
  {
    title: 'Go to Visited Questions',
    description: ['See all the questions you have visited in the past and revise your concepts.'],
    link:"Visited Questions"
  },
  {
    title: 'Generate a new Question',
    subheader: 'Most popular',
    description: ['Generate a new random question. You have the choice to generate one from our ever-increasing pool or generate a new question.'],
    link:"Genereate Questions"
  },
  {
    title: 'Search for a Question',
    description: ['Search for a question from our extensive database by simply providing the title.'],
    link:"Search for a Question"

  },
];



export default function Pricing() {

 
  const navigate = useNavigate();
  const usernamegreeting="Hello, "+localStorage.getItem("username");
  const handleLogout=()=>{
   
    localStorage.clear();
    navigate('/');
  }
  const setLinkAndNavigate = (route) => {
    localStorage.setItem("prevlink", "HOME");
    navigate(route);
  }
  
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        sx={{
          backgroundColor: 'lightgrey', // Change this to your desired color
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="text.primary" noWrap sx={{ flexGrow: 1 }}>
          
          </Typography>
          <NotificationsActiveIcon style={{ marginRight:25, justifyContent:'right',  display: 'flex' ,color:'white'}}></NotificationsActiveIcon>
          
          <CampaignIcon style={{ marginRight:20, display: 'flex' ,color:'white',justifyContent:'right' }}/>
         
          <nav>
            <div style={{ display: 'flex', alignItems: 'center' }} >
            <Link variant="button" color="text.primary" href="/prof" sx={{ marginRight:3 }} >
              <Avatar sx={{ bgcolor: "lightblue" ,justifyContent:"flexend" ,width: 50, height: 50,}} ></Avatar>
            </Link>
            <Link variant="button" color="text.primary" href="#"  onClick={handleLogout}>
              Logout
            </Link>
            </div>
          </nav>
          
        </Toolbar>
      </AppBar>
      <Fade in={true} timeout={1500}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          How would you like to proceed?
        </Typography>
      </Container>
      </Fade>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
    item
    key={tier.title}
    xs={12}
    sm={tier.title === 'Search for a Question' ? 12 : 6}
    md={4}
>
    <Link
        href={tier.title === 'Generate a new Question' ? '/Gen' : tier.title === 'Search for a Question' ? '/search' : tier.title === 'Go to Visited Questions' ? '/vis' : '#'}
        underline="none"
        sx={{
            width: '100%',
            '&:hover': {
                textDecoration: 'none',
            },
        }}
        onClick={(event) => {
            event.preventDefault();
            setLinkAndNavigate(tier.title === 'Generate a new Question' ? '/Gen' : tier.title === 'Search for a Question' ? '/search' : tier.title === 'Go to Visited Questions' ? '/vis' : '#');
        }}
    > 
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 0 30px rgba(33,33,33,.2)',
            },
        }}>
            <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                    align: 'center',
                }}
                sx={{
                    backgroundColor: 'lightblue',
                }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <ul>
                    {tier.description.map((line) => (
                        <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                        >
                            {line}
                        </Typography>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </Link>
</Grid>
          ))}
        </Grid>
      </Container>
   </div>
  );
}
