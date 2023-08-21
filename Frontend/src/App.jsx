import React from 'react';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import NavBar from './Components/NavBar.jsx';
import Home from './Components/Home.jsx'
import QuestionForm from './Components/QuestionForm.jsx';
import QuestionList from './Components/QuestionList.jsx';
import QuestionDisplay from './Components/QuestionDisplay.jsx';
import SolutionDisplay from './Components/SolutionDisplay.jsx';
import Vis from './Components/vismain.jsx';
import Allvis from './Components/allvis.jsx';
import Specvis from './Components/specvis.jsx';
import Search from './Components/search.jsx';
import Edpro from './Components/editprofile.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Ppage from './Components/profilepage.jsx'
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        
        <Route path="/login" element ={<Login/>} />
        <Route path="/Gen" element={<QuestionForm/>} />
        <Route path="/question-list" element={<QuestionList/>} />
        <Route path="/question/:questiontype/:id" element={<QuestionDisplay/>} />
        <Route path="/sol/:questiontype/:id" element={<SolutionDisplay/>} />
        <Route path="/main" element={<NavBar/>} />
        <Route path="/vis" element={<Vis/>} />
        <Route path="/allvis" element={<Allvis/>} />
        <Route path="/specvis" element={<Specvis/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/edpro" element={<Edpro/>} />
        <Route path="/prof" element={<Ppage/>} />



      </Routes>
    </BrowserRouter>
  );
};

export default App;
