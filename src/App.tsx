import React, { useState } from 'react';
import './App.css';
import { Timer } from './components/Timer';
import { PostTimerAction } from './PostTimerActions/PostTimerAction';
import { FlashAction } from './PostTimerActions/FlashAction/Flash';
import { FlashAction2 } from './PostTimerActions/FlashAction/Flash2';
import { ConfettiAction } from "./PostTimerActions/ConfettiAction/Confetti";
import { HeyeyeyeyAction } from './PostTimerActions/HeyeyeyeyAction/Heyeyeyey';
import { ToastAction } from './PostTimerActions/Toast/ToastAction';



// TODO Delete 2nd FlashAction.
const postTimerActions: PostTimerAction[] = [new FlashAction(), new FlashAction2(),  new ConfettiAction(), new HeyeyeyeyAction(),
new ToastAction()];

function App(): JSX.Element {

  const randNum = Math.floor(Math.random() * postTimerActions.length);
  const [currentPostTimerAction, setCurrentPostTimerAction] = useState<PostTimerAction>(postTimerActions[randNum]);
  const [currentPostTimerActionIndex, setCurrentPostTimerActionIndex] = useState<number>(randNum);
  const [postTimerElement, setPostTimerElement] = useState<JSX.Element | null>(null); 


  const randomPostTimerAction = () => {
    const randNum = Math.floor(Math.random() * postTimerActions.length);
    setCurrentPostTimerAction(postTimerActions[randNum]);
    setCurrentPostTimerActionIndex(randNum);
  };

  const onTimerComplete = () => {
    setPostTimerElement(currentPostTimerAction.onTimerComplete());
  };

  const cleanupPostAction = () => {
    currentPostTimerAction.cleanup();
    setPostTimerElement(null);
  };

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
              return (<option value={index.toString()}>{action.getName()}</option>);
            })}
          </select>
          <button onClick={randomPostTimerAction}>Random</button>
        </div>
      </div>
      <div className={"full centred bottom"}>
          {postTimerElement === null ? "" : postTimerElement}
      </div>
    </div>
  );
}

export default App;
