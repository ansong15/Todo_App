import React, { useEffect } from 'react';
import './App.scss';
import { useState } from "react";

import CreateTask from './components/pages/CreateTask';
import { Routes, Route } from "react-router-dom";
import HelpPage from './components/pages/HelpPage';
import AllTasks from './components/pages/AllTasks';
import Completed from './components/pages/Completed';
import SplashScreen from './components/pages/SplahScreen';
import HomePage from './components/pages/HomePage';
import PageNotFound from './components/pages/PageNotFound';



function App() {
  
  const [mode, setMode] = useState('');

useEffect(()=>{
  localStorage.setItem('theme', mode);
  document.body.className = mode;

})
const modeSetter=(mode)=>{
  if (mode === 'dark') {
    setMode('dark')
  }else{
    setMode('light')
  }
}
   
  return (
    
    <Routes>
      <Route path='/' index element={<SplashScreen />}/>
      <Route path='/home' index element={<HomePage />}/>
      {/* <Route path='/tasks' index element={<AllTasks mode={modeSetter}/>}/> */}
      <Route path={'/help'} element={<HelpPage/>}/>
      <Route path={'/create'} element={<CreateTask  />}/>
      <Route path='/tasks'  element={<AllTasks />} />
      <Route path={'/completed'} element={<Completed />}/>
      <Route path={'/header'} Header modeSetter={modeSetter} />
      <Route path={'*'} element={<PageNotFound />}/>
    </Routes>
    
  );
}

export default App;
 