import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './components/Timer';
import { TimerCanvas } from './components/TimerCanvas';
import { PostTimerAction } from './PostTimerActions/PostTimerAction';
import { FlashAction } from './PostTimerActions/Flash';



let postTimerActions: PostTimerAction[] = [new FlashAction(),];

function getRandomPostTimerAction(): PostTimerAction {
  return postTimerActions[Math.floor(Math.random() * postTimerActions.length)];
}

function App() {

  const [currentPostTimerAction, setCurrentPostTimerAction] = useState<PostTimerAction>(getRandomPostTimerAction());
  const [postTimerElement, setPostTimerElement] = useState<JSX.Element | null>(null); 

  const onTimerComplete = () => {
    setPostTimerElement(currentPostTimerAction.onTimerComplete());
  };

  const cleanupPostAction = () => {
    currentPostTimerAction.cleanup();
    setPostTimerElement(null);
  }

  return (
    <div className="App">
      <div>
        <Timer initialTime={4}
              running={false}
              className={"centered top"} 
              onComplete={onTimerComplete}
              onReset={cleanupPostAction}
              />
        <div>On Complete: {currentPostTimerAction.getName()}</div>
      </div>
      <div className={"full centred bottom"}>
          {postTimerElement === null ? "" : postTimerElement}
      </div>
    </div>
  );
}

export default App;
