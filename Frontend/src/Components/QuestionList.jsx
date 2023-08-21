import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Home as HomeIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fade from "@mui/material/Fade";

const QuestionList = () => {
  const location = useLocation();
  const data = JSON.parse(localStorage.getItem('queslist'));
  const errormessage=localStorage.getItem("queslisterrormessage");
  let parts;
  const textlink = localStorage.getItem("prevlink");
  let textlink1;
  if (!textlink.split(">>").includes("Problem Set")) {
    if (textlink === "") textlink1 = "Problem Set";
    else textlink1 = textlink + ">>" + "Problem Set";
    parts = textlink1.split(">>");
  } else {
    textlink1 = textlink;
    parts = textlink.split(">>");
  }
  localStorage.setItem("prevlink", textlink1);
  const givelink = (part) => {
    return localStorage.getItem(part);
  };
  const setquesdetails = (a, b) => {
    localStorage.setItem("questiontype", a);
    localStorage.setItem("id", b);
  };

  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 0 30px rgba(33, 33, 33, .2)',
              transition: 'transform 0.3s',
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static" style={{ backgroundColor: "lightgrey" }} elevation={0}>
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
        <Container maxWidth="md" className="container" style={{ marginTop: '30px' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom className="page-title">
            <u>PROBLEM SET</u>:
            <h6 style={{ marginTop: '20px' }}>{errormessage}</h6>
          </Typography>
          <Grid container spacing={2}>
            {data &&
              data.map((question, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className="question-card">
                    <CardContent>
                      <Typography variant="h6" component="h2" className="question-title">
                        Title: {question["Title"]}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom className="question-difficulty">
                        Type: {question["question_type"]}
                      </Typography>
                    </CardContent>
                    <Grid container justifyContent="center">
                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Button
                          onClick={() => { setquesdetails(question["question_type"], question["QuestionId"]) }}
                          component={Link}
                          to={`/question/${question["question_type"]}/${question["QuestionId"]}`}
                          color="primary"
                          variant="contained"
                          className="start-button"
                        >
                          View Question
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default QuestionList;

