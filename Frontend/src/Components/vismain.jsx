import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { Home as HomeIcon } from "@mui/icons-material";
import Fade from "@mui/material/Fade";


const tiers = [
  {
    title: "All attempted questions",
    description: [
      "Check out your progress by visiting all the questions you have generated before",
    ],
  },
  {
    title: "Search for questions",
    description: [
      "Search for particular questions that you have visited using filters",
    ],
  },
];

export default function vismain() {
  const token = localStorage.getItem("token");
  //breadcrumbs code beginning
  const textlink = localStorage.getItem("prevlink");
  let textlink1;
  let parts;
  if (!textlink.split(">>").includes("Visited Questions")) {
    if (textlink == "") textlink1 = "Visited Questions";
    else textlink1 = textlink + ">>" + "Visited Questions";
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
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const setNavigate = async (a) => {
    if (a == "1") {
      const response = await fetch(
        `http://localhost:5000/kp/questions/allvis`,
                {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        }
      );
      const response1 = await response.json();
      localStorage.setItem("allvis", JSON.stringify(response1));
      localStorage.setItem("prevlink", "HOME>>Visited Questions");
      navigate("/allvis");
    } else {
      localStorage.setItem("prevlink", "HOME>>Visited Questions");

      navigate("/specvis");
    }
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "lightgrey" }}>
        <Toolbar>
          {parts.map((part, index) => (
            <div key={index}>
              <RouterLink
                to={givelink(part)}
                style={{ textDecoration: "none" }}
              >
                {part === "HOME" ? (
                  <span style={{ marginTop: "7", verticalAlign: "middle" }}>
                    <HomeIcon />
                  </span>
                ) : (
                  <span
                    style={
                      givelink(part) === location.pathname
                        ? { color: "green" }
                        : {}
                    }
                  >
                    {part.trim()}
                  </span>
                )}
                {index !== parts.length - 1 && (
                  <span style={{ color: "black" }}>{">"}</span>
                )}
              </RouterLink>
            </div>
          ))}
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: -6,
        }}
      >
        {" "}
        <Fade in={true} timeout={1200}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{
              marginBottom: 5, // Adjust the marginBottom to create space below the text
              marginTop: -11, // Move the text a bit up using a negative marginTop value
            }}
          >
            What kind of questions would you like to see?
          </Typography>
        </Fade>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={12} sm={6} md={6}>
                <Link
                  underline="none"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                  onClick={(event) => {
                    event.preventDefault(); // prevent the default navigation behavior
                    setNavigate(
                      tier.title === "All attempted questions"
                        ? "1"
                        : tier.title === "Search for questions"
                        ? "2"
                        : "#"
                    );
                  }}
                >
                  <Card
                    sx={{
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.05)", // You can play around with the scale value
                        boxShadow: "0 0 30px rgba(33,33,33,.2)", // Change the color, spread, blur as per your needs
                      },
                    }}
                  >
                    <CardHeader
                      title={tier.title}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: "lightblue",
                      }}
                    />
                    <CardContent>
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
      </Container>
    </div>
  );
}
