import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Home as HomeIcon} from '@mui/icons-material';
import { AppBar, Toolbar,  CssBaseline } from '@mui/material';
// import "./QuestionForm.css";
const QuestionForm = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();



//breadcrumbs code beginning
const textlink = localStorage.getItem("prevlink");
  let textlink1;
  let parts;
  if(!textlink.split(">>").includes("Generate Questions")){
  if (textlink == "") textlink1 = "Generate Questions";
  else textlink1 = textlink + ">>" + "Generate Questions";
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
  

  const link = localStorage.getItem("Link");
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [number, setNumQuestions] = useState("");
  const [error, setError] = useState(false);
  const [typegen, setTypegen] = useState("");
  const [question_type, setQuestionType] = useState("");
  const [success, setSuccess] = useState("");
  const [subtopics, setSubtopics] = useState([]); // New state for subtopics
  const [loading, setLoading] = useState(false);
  const [psuccess,setPsuccess]=useState(false);

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);
  };

  const handleTypegenChange = (event) => {
    setTypegen(event.target.value);
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
      // If it is not, add it to the array (check the checkbox)
      setSubtopics([...subtopics, selectedSubtopic]);
    }
  };
  const handleGenerateQuestions = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setPsuccess(false);
    setSuccess('Generating Questions'); 
      const response = await fetch("http://localhost:5000/kp/questions/gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({
          question_type,
          difficulty,
          subtopics,
          typegen,
          number,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(data);
        setData(responseData);
        
        localStorage.setItem("queslist",JSON.stringify(responseData));
        localStorage.setItem("prevlink","HOME>>Generate Questions");
        localStorage.setItem("queslisterrormessage","All questions generated!");
        setPsuccess("Click here to view them.");
        //navigate("/question-list");
      } 
      
      else {
       if(response.status==500)
       { const response1=await response.json();
        const number = response1["number"]
        //const data=response1["data"];
       if(typegen=="new")
       {
        if(number=="0")
        {
          const message="No questions could be generated. Please try again."
          setError(true);
          setSuccess(message);
        }
        else{
          const message="Due to some error only "+number+" question(s) could be generated.";
          setError(true);
          setSuccess("");
          setPsuccess("Click here to view them.");
          const data=response1["data"];
          localStorage.setItem("queslist",JSON.stringify(data));
          localStorage.setItem("prevlink","HOME>>Generate Questions");
          localStorage.setItem("queslisterrormessage",message);
          //navigate("/question-list");
        }
       }
       else{
        if(number=="0")
        {
          setError(false);
          setSuccess("No unvisited questions found in the database.");
        }
        else{
          setError(true);
          setSuccess("There was an error loading questions. Please try again")
        }
       }
      }
      else{
        setError(true);
        const data = await response.text();
        console.log(data);
        setSuccess(data);
      }
      }setLoading(false);
    
  };

  //navigate('/question-list');

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "lightgrey"  }} >
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
      <div className="question-form-container" >
        <div>
          <form className="question-form" onSubmit={handleGenerateQuestions} style={{ marginTop: '-50px' }}>
            <h2>Generate Questions</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="typegen">Select Mode of Generation</label>
              <select
                id="typegen"
                value={typegen}
                onChange={handleTypegenChange}
              >
                <option value="">Select type of question generation</option>
                <option value="new">Generate new questions</option>
                <option value="old">
                  Generate questions from Knowledge-Pool
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subtopics">Subtopics</label>
              <select
                id="subtopics"
                multiple // Allow multiple selections
                value={subtopics} // Use the "subtopics" state as the value
                onChange={handleSubtopicsChange} // Handle the change event
                placeholder="Choose the topics"
              >
                {/* Add options for the subtopics */}
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
              <label htmlFor="numQuestions">Number of Questions</label>
              <input
                type="number"
                id="number"
                value={number}
                onChange={handleNumQuestionsChange}
                placeholder="Enter the number of questions"
              />
            </div>
            {/* Adding the new drop-down for Question Type */}
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
                Generate
              </button>
            </div>
          </form>
         
        </div>
       
         <div className="message-container">
        {error && !loading && <p className="error-message">{success}</p>}
        {!error &&!psuccess&&loading&&
        <div  class="loading-dots">
        <p  className="success-message">{success}</p>
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
      }
        {!error && !loading &&psuccess && <div color="green"> Questions generated successfully!{" "}<Link to="/question-list"  className="success-message">{psuccess}</Link></div> }
        {error && !loading &&psuccess && <div color="green"> Due to an error only some questions could be generated.{" "}<Link to="/question-list"  className="success-message">{psuccess}</Link></div> }
        {!error && !loading &&!psuccess && <p className="success-message">{success}</p> }

        </div>
        
      </div>
    </div>
  );
};
export default QuestionForm;
/*{loading && (
  <div color="green">
    <CircularProgress />
  </div>
)}*/