import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home.jsx';
import './App.css';


function App() {

  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
