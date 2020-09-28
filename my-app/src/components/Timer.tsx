import React, { useState } from 'react';
import { EditableText } from '@blueprintjs/core';
import 'dseg/css/dseg.css';
import './Timer.css';

// TODOs
// onTick callback
export interface IProps  {
    initialTime: number,
    running: boolean,
    className?: string,
    onComplete: () => void,
    cleanup: () => void,
}

export interface IState {
    timeRemaining: number,
    confirmedTime: number,
    isRunning: boolean,
}

export class Timer extends React.Component<IProps, IState> {

    private static readonly tickLength = 1000;

    private timer: NodeJS.Timeout | null;

    constructor(props: IProps) {
        super(props);

        this.state = {
            timeRemaining: props.initialTime,
            confirmedTime: props.initialTime,
            isRunning: false,
        };
        this.timer = null;
    }

    private tick = () => {
        if (this.state.timeRemaining > 0) {
          this.setState({
            timeRemaining: this.state.timeRemaining - 1
          });
        } else {
          clearInterval(this.timer!);
          this.props.onComplete();
        }
      };

    private stop = () => {
        clearInterval(this.timer!);
        this.setState({isRunning: false});
        this.props.cleanup();
    };

    private start = () => {
        if (!this.state.isRunning) {
            this.setState({isRunning: true});
            this.timer = setInterval(() => {
                this.tick();
            }, Timer.tickLength);
        }
    };

    private reset = () => {
        this.stop();
        this.setState({timeRemaining: this.state.confirmedTime});
    };

    private updateTimer = (newValue: number) => {
        this.setState({timeRemaining: newValue,
                       confirmedTime: newValue});
    };

    render() {
        return (
            <div className={this.props.className ?? ""}>
                <div>
                <TimerEditableText secsRemaining={this.state.timeRemaining}
                                   enabled={this.state.isRunning}
                                   updateTimer={this.updateTimer}
                />
                </div>
                <div>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            </div> 
        );
    }
}


export interface ITimerEditableTextProps {
    secsRemaining: number,
    enabled: boolean,
    updateTimer(newValue: number): void,
}

export function TimerEditableText(props: ITimerEditableTextProps) {
    // Defined early because we need them to get the initial state of input mins and secs
    const getMins = (totalSeconds: number) => {
        return Math.floor(totalSeconds / 60);
    };
    const getSecs = (totalSeconds: number) => {
        return (totalSeconds % 60);
    };
    
    // State stuff
    const [inputMins, setInputMins] = useState<number>(getMins(props.secsRemaining));
    const [editingMins, setEditingMins] = useState<boolean>(false);
    const [inputSecs, setInputSecs] = useState<number>(getSecs(props.secsRemaining));
    const [editingSecs, setEditingSecs] = useState<boolean>(false);


    const handleMinsChange = (newValue: string) => {
        setInputMins(parseInt(newValue));
    };
    const handleSecsChange = (newValue: string) => {
        setInputSecs(parseInt(newValue));
    };

    const updateTime = (newValue: string) => {
        setEditingMins(false);
        setEditingSecs(false);
        // Set the total time
        const totalSecs = (inputMins * 60) + inputSecs;
        props.updateTimer(totalSecs);
        // Update the input mins + secs to the 'normalized', confirmed values.
        setInputMins(getMins(totalSecs));
        setInputSecs(getSecs(totalSecs));
    };

    const getSecsString = () => {
        let str = getSecs(props.secsRemaining).toString();
        if (str.length === 1) {
            str = "0" + str;
        }
        return str;
    };

    return (
        <span className="timer">
               <EditableText type="number"
                             disabled={props.enabled}
                             onConfirm={updateTime}
                             onChange={handleMinsChange}
                             maxLength={2}
                             value={editingMins ? inputMins.toString() : getMins(props.secsRemaining).toString()}
                             onEdit={() => {setEditingMins(true);}}
                             onCancel={() => {setEditingMins(false);}}
                /> 
                : 
                <EditableText type="number"
                             disabled={props.enabled}
                             onConfirm={updateTime}
                             onChange={handleSecsChange}
                             maxLength={2}
                             value={editingSecs ? inputSecs.toString() : getSecsString()}
                             onEdit={() => {setEditingSecs(true);}}
                             onCancel={() => {setEditingSecs(false);}}
                /> 
        </span> 
    );
}