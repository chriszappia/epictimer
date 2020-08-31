import React, { useState } from 'react';
import './App.css';
import { Timer } from './components/Timer';
import { PostTimerAction } from './PostTimerActions/PostTimerAction';
import { FlashAction } from './PostTimerActions/FlashAction/Flash';
import { FlashAction2 } from './PostTimerActions/FlashAction/Flash2';


// TODO Delete 2nd FlashAction.
let postTimerActions: PostTimerAction[] = [new FlashAction(), new FlashAction2(),];

function getRandomPostTimerAction(): PostTimerAction {
  return postTimerActions[Math.floor(Math.random() * postTimerActions.length)];
}

function App() {

  const randNum = Math.floor(Math.random() * postTimerActions.length);
  const [currentPostTimerAction, setCurrentPostTimerAction] = useState<PostTimerAction>(postTimerActions[randNum]);
  const [currentPostTimerActionIndex, setCurrentPostTimerActionIndex] = useState<number>(randNum);
  const [postTimerElement, setPostTimerElement] = useState<JSX.Element | null>(null); 

  const onTimerComplete = () => {
    setPostTimerElement(currentPostTimerAction.onTimerComplete());
  };

  const cleanupPostAction = () => {
    currentPostTimerAction.cleanup();
    setPostTimerElement(null);
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valueInt = parseInt(event.target.value);
    setCurrentPostTimerAction(postTimerActions[valueInt]);
    setCurrentPostTimerActionIndex(valueInt);
  };

  return (
    <div className="App">
      <div className={"centered top"}>
        <Timer initialTime={4}
               running={false}
               onComplete={onTimerComplete}
               cleanup={cleanupPostAction}
               />
        <div>
          On Complete:
          <select onChange={handleSelectChange} value={currentPostTimerActionIndex.toString()}>
            {postTimerActions.map((action, index) => {
              return (<option value={index.toString()}>{action.getName()}</option>)
            })}
          </select>
        </div>
      </div>
      <div className={"full centred bottom"}>
          {postTimerElement === null ? "" : postTimerElement}
      </div>
    </div>
  );
}

export default App;
