import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './components/Timer';
import { TimerCanvas } from './components/TimerCanvas';

function App() {
  return (
    <div className="App">
      <Timer initialTime={100}
             running={false}
             className={"centered top"} />
      <TimerCanvas className={"centered bottom"} /> 
    </div>
  );
}

export default App;
