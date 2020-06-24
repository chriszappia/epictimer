import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './components/Timer';

function App() {
  return (
    <div className="App">
      <Timer initialTime={100}
             running={false} />
    </div>
  );
}

export default App;
