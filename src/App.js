import './App.css';
import React from 'react';
import Calendar from './Calendar/Calendar';
import Contact from './Contact/Contact';
import Search from './Search/Search';
import Welcome from './Welcome/Welcome';
import NavBar from './Navbar/Navbar';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/MavExamScheduler" element={<Welcome />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
