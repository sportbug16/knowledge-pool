import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Home as HomeIcon } from '@mui/icons-material';

const token = localStorage.getItem("token");

const QuestionList = () => {

  //breadcrumbs code beginning
  const textlink = localStorage.getItem("prevlink");
  let textlink1;
  let parts;
  if (!textlink.split(">>").includes("All Attempted Questions")) {
    if (textlink === "") textlink1 = "All Attempted Questions";
    else textlink1 = textlink + ">>" + "All Attempted Questions";
    parts = textlink1.split(">>");
  } else {
    textlink1 = textlink;
    parts = textlink.split(">>");
  }
  localStorage.setItem("prevlink", textlink1);
  const givelink = (part) => {
    return localStorage.getItem(part);
  };
  //breadcrumbs code ending

  const setquesdetails = (a, b) => {
    localStorage.setItem("questiontype", a);
    localStorage.setItem("id", b);
  };

  const questions = JSON.parse(localStorage.getItem("allvis")) || [];

  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
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
        <Container maxWidth="md" className="container">
          <Typography variant="h4" component="h1" align="center" gutterBottom className="page-title">
            ALL  ATTEMPTED QUESTIONS:
          </Typography>
          <Grid container spacing={2}>
            {questions &&
              questions.map((question, index) => (
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


