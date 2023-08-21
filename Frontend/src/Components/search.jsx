import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Home as HomeIcon } from '@mui/icons-material';
import Fade from "@mui/material/Fade";


export default function SearchField() {
  const token = localStorage.getItem('token');

  const location = useLocation();

  const textlink = localStorage.getItem("prevlink");
  let textlink1;
  let parts;
  if (!textlink.split(">>").includes("Search using Title")) {
    if (textlink == "") textlink1 = "Search using Title";
    else textlink1 = textlink + ">>" + "Search using Title";
    parts = textlink1.split(">>");
  }
  else {
    textlink1 = textlink;
    parts = textlink.split(">>");
  }
  localStorage.setItem("prevlink", textlink1);
  
  const givelink = (part) => {
    return localStorage.getItem(part);
  };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [err, setErr] = useState(""); // Initialize err state

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setErr(""); // Reset the error message when search query changes
  };

  const handleSearchClick = async () => {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const response = await fetch(`http://localhost:5000/kp/questions/spec?question_topic=${encodedSearchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("queslist", JSON.stringify(data));
      navigate('/question-list', { state: { data: data } });
    }
    else {
      if (response.status === 500) {
        setErr("No questions found"); // Update error state
      }
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "lightgrey" }}>
        <Toolbar>
          {parts.map((part, index) => (
            <div key={index}>
              <Link to={givelink(part)} style={{ textDecoration: 'none' }}>
                {part === "HOME" ? (
                  <span style={{ marginTop: '7', verticalAlign: 'middle' }}>
                    <HomeIcon />
                  </span>
                ) : (
                  <span style={givelink(part) === location.pathname ? { color: "green" } : {}}>
                    {part.trim()}
                  </span>

                )}
                {index !== parts.length - 1 && <span style={{ color: "black" }}>{">"}</span>}
              </Link>

            </div>
          ))}
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Fade in={true} timeout={1200}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Search by Entering the Question Title
        </Typography>
        </Fade>
      </Container>
      <Container maxWidth="md" component="main">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <TextField
            id="search"
            placeholder="Eg: Maximum Subarray Sum"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            sx={{ width: '50%' }}
          />
          <SearchIcon
            color="action"
            sx={{ cursor: 'pointer', ml: 1, my: 'auto' }}
            onClick={handleSearchClick}
          />
        </Box>
        {err && <p>{err}</p>}
      </Container>

    </div>
  );
}
