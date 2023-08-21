
const asynchandler = require("express-async-handler");
const Coding = require("../models/codingtype");
const Mcq = require("../models/mcqtype");
const Sub = require("../models/subtype");
const response = require("../apicalls/apicallnewgen4");
const delay = require("../delay");
const Users = require("../models/usermodel");


const getallvisques = asynchandler(async (req, res) => {
  let queslist = [];
  const result1 = await Coding.find();
  const curruser = await Users.findById(req.user.id);
  for (let i = 0; i < result1.length; i++) {
    if (curruser["questions_visited"].includes(result1[i]["_id"])) {
      queslist.push(
        {"Title":result1[i]["question_topic"],"QuestionId":result1[i]["_id"],"question_type":result1[i]["question_type"]}
       );
    }
  }
  const result2 = await Mcq.find();
  for (let i = 0; i < result2.length; i++) {
    if (curruser["questions_visited"].includes(result2[i]["_id"])) {
      queslist.push(
        {"Title":result2[i]["question_topic"],"QuestionId":result2[i]["_id"],"question_type":result2[i]["question_type"]}
       );
    }
  }
  const result3 = await Sub.find();
  for (let i = 0; i < result3.length; i++) {
    if (curruser["questions_visited"].includes(result3[i]["_id"])) {
      queslist.push(
        {"Title":result3[i]["question_topic"],"QuestionId":result3[i]["_id"],"question_type":result3[i]["question_type"]}
       );
    }
  }
  if (queslist.length == 0) {
    res.json("No questions found");
    console.log("No questions found");
  } else {
    res.json(queslist);
    console.log(
      queslist.length.toString() + " question(s) found from knowledge-pool."
    );
  }
});



const getspvisques = asynchandler(async (req, res) => {
  const { question_type, difficulty, subtopics} = req.body;

  if (!question_type || !difficulty || !subtopics) {
    res.status(400).send( "Please enter all the three fiels for specific visited questions.");
    
     
   
  }
  else{
  let queslist = [];
  if (question_type == "MCQ") {
    const curruser = await Users.findById(req.user.id);
    let list = curruser["questions_visited"];
    for (let i = 0; i < list.length; i++) {
      let ques = await Mcq.findOne({
        _id: list[i],
        question_type: question_type,
        concepts: { $all: subtopics },
        difficulty: difficulty,
      });
      if (ques)
      queslist.push(
        {"Title":ques["question_topic"],"QuestionId":ques["_id"],"question_type":ques["question_type"]}
       );
    }
  }

  if (question_type == "Coding Question") {
    const curruser = await Users.findById(req.user.id);
    let list = curruser["questions_visited"];
    for (let i = 0; i < list.length; i++) {
      let ques = await Coding.findOne({
        _id: list[i],
        question_type: question_type,
        concepts: { $all: subtopics },
        difficulty: difficulty,
      });
      if (ques)
      queslist.push(
        {"Title":ques["question_topic"],"QuestionId":ques["_id"],"question_type":ques["question_type"]}       );
    }
  }

  if (question_type == "Subjective") {
    const curruser = await Users.findById(req.user.id);
    let list = curruser["questions_visited"];
    for (let i = 0; i < list.length; i++) {
      let ques = await Sub.findOne({
        _id: list[i],
        question_type: question_type,
        concepts: { $all: subtopics },
        difficulty: difficulty,
      });
      if (ques)
      queslist.push(
        {"Title":ques["question_topic"],"QuestionId":ques["_id"],"question_type":ques["question_type"]}       );
    }
  }
  if (queslist.length == 0) {
    res.status(500).json({"number":"0","data":queslist});
  } else {
    console.log(
      queslist.length.toString() + " question(s) found from knowledge-pool."

    );
    res.json(queslist);

  }
}});



const createques = asynchandler(async (req, res) => {
  const { question_type, difficulty, subtopics, number, typegen } = req.body;
  console.log(req.body);
  if (!question_type || !difficulty || !subtopics || !number || !typegen) {
    res.status(404).send("All fields are mandatory");
    console.log(
       "0 question(s) generated."
    );
  }
  let queslist = [];
  const promises = [];
  if (typegen == "new") {
    let err=0;


    if (question_type == "Coding Question") {
      for (let i = 0; i < parseInt(number); i++) {
        try{
        if (i % 5 == 0) await delay(4000);
        if(i==2)
        process.env.apikey="4tb5h46";
        const promise = await response(
          question_type,
          difficulty,
          subtopics
        ).then(async (result) => {
          const newques = await Coding.create({
            question_type: question_type,
            question_topic: result["question_topic"],
            problem_statement: result["problem_statement"],
            concepts: result["concepts"],
            difficulty: difficulty,
            solution: result["solution"],
          });
          queslist.push(
           {"Title":newques["question_topic"],"QuestionId":newques["_id"],"question_type":newques["question_type"]}
          );
          console.log("successful");
          const addques = await Users.updateOne(
            { _id: req.user.id },
            { $push: { questions_visited: newques["_id"] } }
          );
        });

        promises.push(promise);
      }
      catch(error){
        res.status(500).json({"number":(i).toString(),"data":queslist});
        err=1;
        break;
      }
    } if(err==0){
      await Promise.all(promises);
      res.json(queslist);
      
    }
    console.log(
      queslist.length.toString() + " question(s) successfully generated."
    );
  }
  if (question_type == "MCQ") {
    for (let i = 0; i < parseInt(number); i++) {
      try{
      if (i % 5 == 0) await delay(4000);
      const promise = await response(
        question_type,
        difficulty,
        subtopics
      ).then(async (result) => {
        const newques = await Mcq.create({
          question_type: question_type,
          question_topic: result["question_topic"],
          problem_statement: result["problem_statement"],
          concepts: result["concepts"],
          difficulty: difficulty,
          solution: result["solution"],
        });
        queslist.push(
         {"Title":newques["question_topic"],"QuestionId":newques["_id"],"question_type":newques["question_type"]}
        );
        console.log("successful");
        const addques = await Users.updateOne(
          { _id: req.user.id },
          { $push: { questions_visited: newques["_id"] } }
        );
      });

      promises.push(promise);
    }
    catch(error){
      res.status(500).json({"number":(i).toString(),"data":queslist});
      err=1;
      break;
    }
  } if(err==0){
    await Promise.all(promises);
    res.json(queslist);
    
  }
  console.log(
    queslist.length.toString() + " question(s) successfully generated."
  );
}

if (question_type == "Subjective") {
  for (let i = 0; i < parseInt(number); i++) {
    try{
    if (i % 5 == 0) await delay(4000);
    const promise = await response(
      question_type,
      difficulty,
      subtopics
    ).then(async (result) => {
      const newques = await Sub.create({
        question_type: question_type,
        question_topic: result["question_topic"],
        problem_statement: result["problem_statement"],
        concepts: result["concepts"],
        difficulty: difficulty,
        solution: result["solution"],
      });
      queslist.push(
       {"Title":newques["question_topic"],"QuestionId":newques["_id"],"question_type":newques["question_type"]}
      );
      console.log("successful");
      const addques = await Users.updateOne(
        { _id: req.user.id },
        { $push: { questions_visited: newques["_id"] } }
      );
    });

    promises.push(promise);
  }
  catch(error){
    res.status(500).json({"number":(i).toString(),"data":queslist});
    err=1;
    break;
  }
} if(err==0){
  await Promise.all(promises);
  res.json(queslist);
 
}
console.log(
  queslist.length.toString() + " question(s) successfully generated."
);
}
  } else {
    if (question_type == "MCQ") {
      const result1 = await Mcq.find({
        difficulty: difficulty,
        concepts: { $all: subtopics },
        question_type: question_type,
      });
      
      let queslist = [];
      let x = 0;
      for (let i = 0; i < result1.length; i++) {
        const curruser = await Users.findById(req.user.id);
        if (!curruser["questions_visited"].includes(result1[i]["_id"])) {
          queslist.push(
            {"Title":result1[i]["question_topic"],"QuestionId":result1[i]["_id"],"question_type":result1[i]["question_type"]}
           );
          x++;

          await Users.updateOne(
            { _id: req.user.id },
            { $push: { questions_visited: result1[i]["_id"] } }
          );
        }
        if (x == number) break;
      }

      if (queslist.length == 0) {
        res.status(500).json({"number":"0","data":queslist});
        console.log("No questions found");
      } else {
        res.json(queslist);
        console.log(
          queslist.length.toString() + " question(s) found from knowledge-pool."
        );
      }
    }

    if (question_type == "Coding Question") {
      const result1 = await Coding.find({
        difficulty: difficulty,
        concepts: { $all: subtopics },
        question_type: question_type,
      });

      let queslist = [];
      let x = 0;
      for (let i = 0; i < result1.length; i++) {
        const curruser = await Users.findById(req.user.id);
        if (!curruser["questions_visited"].includes(result1[i]["_id"])) {
          queslist.push(
            {"Title":result1[i]["question_topic"],"QuestionId":result1[i]["_id"],"question_type":result1[i]["question_type"]}
           );
          x++;

          const addques = await Users.updateOne(
            { _id: req.user.id },
            { $push: { questions_visited: result1[i]["_id"] } }
          );
        }
        if (x == number) break;
      }

      if (queslist.length == 0) {
        res.status(500).json({"number":(0).toString(),"data":queslist});
                console.log("No questions found");
      } else {
        res.json(queslist);
        console.log(
          queslist.length.toString() + " question(s) found from knowledge-pool."
        );
      }
    }

    if (question_type == "Subjective") {
      const result1 = await Sub.find({
        difficulty: difficulty,
        concepts: { $all: subtopics },
        question_type: question_type,
      });

      let queslist = [];
      let x = 0;
      for (let i = 0; i < result1.length; i++) {
        const curruser = await Users.findById(req.user.id);
        if (!curruser["questions_visited"].includes(result1[i]["_id"])) {
          queslist.push(
            {"Title":result1[i]["question_topic"],"QuestionId":result1[i]["_id"],"question_type":result1[i]["question_type"]}
           );

          const addques = await Users.updateOne(
            { _id: req.user.id },
            { $push: { questions_visited: result1[i]["_id"] } }
          );
        }
        if (x == number) break;
      }

      if (queslist.length == 0) {
        res.status(500).json({"number":"0","data":queslist});
        console.log("No questions found");
      } else {
        res.json(queslist);
        console.log(
          queslist.length.toString() + " question(s) found from knowledge-pool."
        );
      }
    }
  }
});



const getspques = asynchandler(async (req, res) => {
  const { question_topic } = req.query;
  if (!question_topic) {
    res.status(400).json("Please enter the question topic");
   
  }
  else{
  const result1 = await Coding.find({ $text: { $search: question_topic } });
  //const result1 = await Users.find({ "question_topic": { $regex: "max", $options: "i" } });  
  if (!result1) {
    res.status(500).json({"number":"0"});
    console.log("No question found");
  } else {
    let queslist = [];
    for (let i = 0; i < result1.length; i++) {
      queslist.push(
        {"Title":result1[i]["question_topic"],"QuestionId":result1[i]["_id"],"question_type":result1[i]["question_type"]}
        );
     
     
    }
    console.log( queslist.length.toString() + " question(s) found from knowledge-pool." );

    res.status(200).json(queslist);
  }
}});

const getproblem = async (req, res) => {
  const { QuestionId, question_type } = req.query;
  let question;

  if (question_type === "MCQ") {
    question = await Mcq.findById(QuestionId);
  } else if (question_type === "Coding Question") {
    question = await Coding.findById(QuestionId);
  } else if (question_type === "Subjective") {
    question = await Sub.findById(QuestionId);
  }

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.json(question);
};

const getsolution=asynchandler(async (req,res)=>{
  const {QuestionId,question_type}=req.query;
  if(question_type=="MCQ")
  {
    const question= await Mcq.findById(QuestionId);
    res.json({"solution":question["solution"]
    });
  }

  if(question_type=="Coding Question")
  {
    const question= await Coding.findById(QuestionId);
    res.json({"solution":question["solution"]
    });
  }

  if(question_type=="Subjective")
  {
    const question= await Sub.findById(QuestionId);
    res.json({"solution":question["solution"]
    });
  }

});



module.exports = { getallvisques, getspvisques, createques, getspques,getproblem,getsolution };