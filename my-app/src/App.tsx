import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './components/Timer';
import { ColoredRect } from './components/CanvasTimer'
import { Stage, Layer,Text } from 'react-konva';

function App() {
  return (
    <div className="App">
          <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {/* <Text text="Try click on rect" /> */}
            <Timer initialTime={100} 
                   running={false}/>
            {/* <ColoredRect /> */}
          </Layer>
        </Stage>
    </div>

    
  );
}

export default App;
