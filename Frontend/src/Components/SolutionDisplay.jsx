import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const QuestionDisplay = () => {
  const token = localStorage.getItem('token');
  const questiontype=localStorage.getItem("questiontype");
  const id=localStorage.getItem("id");
  const [solution, setSolution] = useState(null);
 
  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await fetch(`http://localhost:5000/kp/questions/getsol?question_type=${questiontype}&QuestionId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        });

        const solutionData = await response.json();
        setSolution(solutionData);
      } catch (error) {
        console.error('Error fetching solution:', error);
      }
    };

    fetchSolution();
  }, [questiontype, id]);

  if (!solution) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <CssBaseline />
    <AppBar position="static" style={{ backgroundColor: "lightgrey" }}>
        <Toolbar>
       <Link to='/question/:questiontype/:id'>Back to Problem</Link>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 20 }}>
        <h1>Solution</h1>
        <ReactMarkdown skipHtml={false} escapeHtml={false}>
  {solution['solution']}
</ReactMarkdown>
      </div>
    </div>
  );
};

export default QuestionDisplay;
