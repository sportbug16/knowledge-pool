// const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const asynchandler=require("express-async-handler");
const config = new Configuration({
    apiKey: process.env.apiKey
});

const openai = new OpenAIApi(config);
const runPrompt = asynchandler(async (question_type,difficulty,subtopics) => {
   
    let localMessages = [
        {"role": "user", "content": "You are a dsa problem generator just like leetcode. The problems that you generate should be unique."},
    ];
    let s;
    for(let j=0;j<subtopics.length;j++)
    {
     s=s+subtopics[j]+",";
    }
    let prompt1;
    if (question_type=="Coding Question")
    prompt1 = "Generate a "+question_type+" DSA question on the subtopics "+s+" of "+difficulty+" difficulty. Do not include any introductory statements, directly start with the question.";
    else if (question_type=="MCQ")
    prompt1 = "Generate an "+question_type+"type DSA question on the subtopics "+subtopics+" of "+difficulty+" difficulty.Provide options. Do not provide solutions. Do not include any introductory statements, directly start with the question.";
    else
    prompt1 = "Generate a "+question_type+" type DSA question on the subtopics "+subtopics+" of "+difficulty+" difficulty. Do not provide solution. Do not include any introductory statements, directly start with the question.";
    await delay(2000);
    localMessages.push({"role": "user", "content": prompt1});
    const chat1 = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:localMessages,
        });
    const reply1= chat1.data.choices[0].message.content;
    let reply3="NA";
    if(question_type=="Coding Question"){
    localMessages.push({"role": "assistant", "content":reply1 });
    const prompt3="Now that the problem has been generated make a short heading or topic (max 10 words) for this question. Start with the heading itself, i.e do not write topic: or title: or something like that."
    localMessages.push({"role": "user", "content": prompt3});
    const chat3 = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: localMessages,
    });
    reply3= chat3.data.choices[0].message.content;
    localMessages.push({"role": "assistant", "content":reply3 });}
    let prompt2="";
    if(question_type=="Coding Question")
    prompt2="Provide the alogorithmic approach and the complete, syntactically correct C++ source code (not pseudocode) for solving the coding question:"+reply1+"This code should be able to be compiled and run without modifications. Also, include the time and space complexity analysis. Do not include any introductory statements, directly start with the solution."
    else
    prompt2="Now that the problem has been generated: "+reply1+" .Now, please provide a very brief solution to this problem. Do not include any introductory statements, directly start with the solution.";
    localMessages.push({"role": "user", "content": prompt2});
    const chat2 = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: localMessages,
    });
    const reply2= chat2.data.choices[0].message.content;
    const tags = ["arrays", "vectors", "expression_parsing", "fast_fourier_transform", "two_pointers", "binary_search", "disjoint_set_union", "strings", "number_theory", "hashing", "shortest_paths", "matrices", "dynamic_programming", "meet-in-the-middle", "games", "schedules", "constructive_algorithms", "greedy", "divide_and_conquer", "flows", "geometry", "math", "sortings", "ternary_search", "combinatorics", "trees", "graphs","stacks","queues","LinkedList"];
    let prompt4;
    if(question_type=="Coding Question")
    prompt4="[arrays, vectors, expression_parsing, fast_fourier_transform, two_pointers, binary_search , disjoint_set_union, strings, number_theory ,hashing ,shortest_paths ,matrices ,dynamic_programming ,meet-in-the-middle ,games ,schedules ,constructive_algorithms ,greedy ,divide_and_conquer ,flows ,geometry ,math ,sortings ,ternary_search, combinatorics, trees, graphs, stacks, queues, LinkedList]"+"/n"+"Above I have provided you with a list of concepts commonly used in programming. With respect to the solution that you provided above"+"/n"+ "I want you to go through each one of the concepts and make a list of whichever is being used in the solution. Do not  respond directly. Here is how you should respond:/n"+"1. When I say make a list I mean you should take every concept from the list which you think is appropriate to the solution and then separate them using commas. Remember,use only those concepts that are mentioned in the list above./n"+" 2.You should avoid any introductory line like \"Sure, here is the solution or Here is the list\""+"/n"+"3.The most important point and please follow this everytime, the list shoud be sent in this manner {arrays,vector,….}. Try not to give any white space after or before a comma." +"/n"+"I'll give you an example: Suppose the question involves arrays, binary_search and dp , you return {arrays,binary_search,dp}. Be aware of the curly braces. They have to be there.";
    else (question_type=="MCQ")
    prompt4="[arrays, vectors, expression_parsing, fast_fourier_transform, two_pointers, binary_search , disjoint_set_union, strings, number_theory ,hashing ,shortest_paths ,matrices ,dynamic_programming ,meet-in-the-middle ,games ,schedules ,constructive_algorithms ,greedy ,divide_and_conquer ,flows ,geometry ,math ,sortings ,ternary_search, combinatorics, trees, graphs, stacks, queues, LinkedList]"+"/n"+"Above I have provided you with a list of concepts commonly used in programming. With respect to the solution that you provided:"+"/n"+reply2+ "/nI want you to go through each one of the concepts and make a list of whichever is being used in the solution. Do not  respond directly. Here is how you should respond:/n"+"1. When I say make a list I mean you should take every concept from the list which you think is appropriate to the solution and then separate them using commas. Remember,use only those concepts that are mentioned in the list above./n"+" 2.You should avoid any introductory line like \"Sure, here is the solution or Here is the list\""+"/n"+"3.The most important point and please follow this everytime, the list shoud be sent in this manner {arrays,vector,….}. Try not to give any white space after or before a comma." +"/n"+"I'll give you an example: Suppose the question involves arrays, binary_search and dp , you return {arrays,binary_search,dp}. Be aware of the curly braces. They have to be there.";
    localMessages.push({"role": "user", "content": prompt4});
    const chat4=   await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: localMessages});
    //console.log(reply2);
    const reply4=chat4.data.choices[0].message.content;
    //console.log(reply4);
    let beg=reply4.indexOf('{');
    let end=reply4.indexOf('}');
    let liststring=reply4.substring(beg+1,end);

    liststring=liststring.split(",");
    let i=0;
    let conceptslist=[];
    for(i=0;i<liststring.length;i++)
    {   liststring[i]=liststring[i].trim();
        liststring[i]=liststring[i].toLowerCase();
        liststring[i]=liststring[i].replace(/\s+/g, '_');
        if(tags.includes(liststring[i]))
        conceptslist.push(liststring[i]);
    }

    return({"question_topic":reply3,"problem_statement":reply1,"solution":reply2,"concepts":conceptslist})
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
module.exports=runPrompt;