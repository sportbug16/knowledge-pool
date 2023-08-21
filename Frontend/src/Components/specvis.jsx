import React, { useState } from "react";
import { useNavigate,Link,useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { AppBar, Toolbar,  CssBaseline } from '@mui/material';
import { Home as HomeIcon} from '@mui/icons-material';
import "./QuestionForm.css";

const QuestionForm = () => {
 const location=useLocation();
      const token = localStorage.getItem('token');
  const navigate = useNavigate();
  // const token = localStorage.getItem('token');
 
// Attach the token to the Authorization header

  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [question_type, setQuestionType] = useState("");
  const [success, setSuccess] = useState("");
  const [subtopics, setSubtopics] = useState([]); // New state for subtopics
  const [loading, setLoading] = useState(false);
  const [psuccess,setPsuccess]=useState(false);

  //breadcrumbs code beginning
const textlink = localStorage.getItem("prevlink");
  let textlink1;
  let parts;
  if(!textlink.split(">>").includes("Filtered Search")){
  if (textlink == "") textlink1 = "Filtered Search";
  else textlink1 = textlink + ">>" + "Filtered Search";
   parts = textlink1.split(">>");}
   else
   {textlink1=textlink;
    parts=textlink.split(">>");
   }
   localStorage.setItem("prevlink", textlink1);
   const givelink = (part) => {
    return localStorage.getItem(part);
  };
  //breadcrumbs code ending
  
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleSubtopicsChange = (event) => {
    const selectedSubtopic = event.target.value;
    // Check if the selected subtopic is already in the array
    if (subtopics.includes(selectedSubtopic)) {
      // If it is, remove it from the array (uncheck the checkbox)
      setSubtopics(
        subtopics.filter((subtopic) => subtopic !== selectedSubtopic)
      );
    } else {
      // If it is not, add it to the array (check the checkbox)sx
      setSubtopics([...subtopics, selectedSubtopic]);
    }
  };
  const handleGenerateQuestions = async (event) => {
    event.preventDefault();
        setLoading(true);
        setError(false);
        setPsuccess(false);
        setSuccess('Finding Questions...'); 
      const response = await fetch("http://localhost:5000/kp/questions/specvis", {
      method: "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
      },
      body: JSON.stringify({
        question_type,
        difficulty,
        subtopics,
      })
    });

      if(response.ok)
      { 
        const responseData =await response.json();
        // console.log(data);
        setSuccess("");
        setPsuccess("Questions found successfully! Click here to view them.");        localStorage.setItem("queslist",JSON.stringify(responseData));
        //navigate('/question-list'); // Pass the data as state
      }
      else{
        if(response.status==500)
        {
          const message="No questions found matching the above details."
          setError(false);
          setSuccess(message);
        }
        else{
        setError(true);
        const data = await response.text();
        console.log(data);
        setSuccess(data);
      }
    }
      setLoading(false);
       
   }
    
    
  

  
  

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "lightgrey" }}>
        <Toolbar>
          {parts.map((part, index) => (
            <div key={index}>

    <Link to={givelink(part)} style={{ textDecoration: 'none' }}>
  {part === "HOME" ? (
    <span style={{marginTop:'7',verticalAlign: 'middle'}}>
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
      
      <div className="question-form-container">
        <div>
          <form className="question-form" onSubmit={handleGenerateQuestions} style={{ marginTop: '-50px' }}>
            <h2>Find Questions</h2>
            {error && <p className="error-message">{error}</p>}
           
            <div className="form-group">
              <label htmlFor="subtopics">Subtopics</label>
              <select
                id="subtopics"
                multiple // Allow multiple selections
                value={subtopics} // Use the "subtopics" state as the value
                onChange={handleSubtopicsChange} // Handle the change event
                placeholder="Choose the topics"
              >
                <option value="arrays">Arrays</option>
                <option value="strings">Strings</option>
                <option value="vectors">Vectors</option>
                <option value="graphs">Graphs</option>
                <option value="expression_parsing">Expression Parsing</option>
                <option value="fast_fourier_transform">
                  Fast Fourier Transform
                </option>
                <option value="two_pointers">Two Pointers</option>
                <option value="binary_search">Graphs</option>
                <option value="disjoint_set_union">Disjoint Set Union</option>
                <option value="number_theory">Number Theory</option>
                <option value="hashing">Hashing</option>
                <option value="shortest_paths">Shortest Paths</option>
                <option value="matrices">Matrices</option>
                <option value="dynamic_programming">Dynamic Programming</option>
                <option value="meet-in-the-middle">Meet in the Middle</option>
                <option value="games">Games</option>
                <option value="schedules">Schedules</option>
                <option value="constructive_algorithms">
                  Constructive Algorithms
                </option>
                <option value="greedy">Greedy</option>
                <option value="divide_and_conquer">Divide and Conquer</option>
                <option value="flows">Flows</option>
                <option value="geometry">Geometry</option>
                <option value="math">Math</option>
                <option value="sortings">Sortings</option>
                <option value="ternary_search">Ternary Search</option>
                <option value="combinatorics">Combinatorics</option>
                <option value="trees">Trees</option>
                <option value="stacks">Stacks</option>
                <option value="queues">Queues</option>
                <option value="linked_list">Linked List</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={handleDifficultyChange}
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
           
            <div className="form-group">
              <label htmlFor="question_type">Question Type</label>
              <select
                id="question_type"
                value={question_type}
                onChange={handleQuestionTypeChange}
              >
                <option value="">Select question type</option>
                <option value="Coding Question">Coding Question</option>
                <option value="MCQ">MCQ</option>
                <option value="Subjective">Subjective</option>
              </select>
            </div>
            <div className="button-group">
              <button
                type="submit"
                className="generate-button"
                value="Generate"
                align="center"
              
              >
                Find
              </button>
            </div>
          </form>
         
        </div>
        <div className="message-container">
        {error && <p className="error-message">{success}</p>}
        {!error && <p className="success-message">{success}</p>}
        {!error && !loading &&psuccess && <Link to="/question-list"  className="success-message">{psuccess}</Link>}        
        </div>
        {loading && (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
     
    </div>
  );
};
export default QuestionForm;
