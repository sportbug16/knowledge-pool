import React, { useEffect, useState } from 'react';
import { useParams, Link,useLocation  } from 'react-router-dom';
import { AppBar, Toolbar,  CssBaseline } from '@mui/material';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import Button from '@mui/material/Button';
import { Home as HomeIcon} from '@mui/icons-material';

import CircleSkeleton from "./Skeletons/CircleSkeleton";
import RectangleSkeleton from "./Skeletons/RectangleSkeleton";


const QuestionDisplay = () => {
  const questiontype=localStorage.getItem("questiontype");
  const id=localStorage.getItem("id");
  console.log(questiontype);
  console.log(id);
  const [question, setQuestion] = useState(null);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  let parts;
  const textlink = localStorage.getItem("prevlink");
  let textlink1;
  if(!textlink.split(">>").includes("Problem")){
  if (textlink == "") textlink1 = "Problem";
  else textlink1 = textlink + ">>" + "Problem";
   parts = textlink1.split(">>");}
   else
   {textlink1=textlink;
    parts=textlink.split(">>");
   }
   localStorage.setItem("prevlink", textlink1);
  //if(parts.includes("Problem Set"))
  //parts.pop();
  const givelink = (part) => {
    return localStorage.getItem(part);
  };




  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/kp/questions/getprob?question_type=${questiontype}&QuestionId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
          }
        });
        setLoading(true);
        const questionData = await response.json();
        setQuestion(questionData);
        console.log(question);
		setProblemDifficultyClass(
				 question["difficulty"] === "easy"
						? "bg-olive text-olive"
						: question["difficulty"] === "medium"
						? "bg-dark-yellow text-dark-yellow"
						: " bg-dark-pink text-dark-pink"
				);
        setLoading(false);
			} catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [questiontype, id]);

  if (!question) {
    return <div>Loading...</div>;
  }
  const list =question["concepts"];
  let str="";
  for(let i=0;i<list.length;i++)
  {  
     str=str+" "+list[i];
     if(i!=(list.length)-1)
     {
         str=str+",";
     }
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
    <span style={part === "Problem" ? { color: "green" } : {}}>
      {part.trim()}
    </span>
    
  )}
   {index !== parts.length - 1 && <span style={{ color: "black" }}>{">"}</span>}
</Link>
              
            </div>
          ))}
        </Toolbar>
      </AppBar>


		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{question["question_topic"]}</div>
						</div>
						{!loading && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{question["difficulty"]}
								</div>
								
							</div> 
						)}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<ReactMarkdown>{question["problem_statement"]}</ReactMarkdown>
						</div>


				</div>
        </div> 
			</div>
		</div>
    </div>
  );
};

export default QuestionDisplay;


