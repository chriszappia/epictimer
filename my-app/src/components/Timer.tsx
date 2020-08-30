import React, { useState, useEffect } from 'react';
import { EditableText } from '@blueprintjs/core'
import NumberFormat from 'react-number-format'

// TODOs
// onTick callback
// onComplete callback
export interface IProps  {
    initialTime: number,
    running: boolean,
    className: string,
    onComplete: () => void,
    cleanup: () => void,
};

export interface IState {
    timeRemaining: number,
    isRunning: boolean,
}

export class Timer extends React.Component<IProps, IState> {

    private static readonly tickLength = 1000;

    private timer: NodeJS.Timeout | null;

    constructor(props: IProps) {
        super(props);

        this.state = {
            timeRemaining: props.initialTime,
            isRunning: false,
        }
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
            }, Timer.tickLength)
        };
    };

    private reset = () => {
        this.stop();
        this.setState({timeRemaining: this.props.initialTime});
    };


    render() {
        return (
            <div className={this.props.className}>
                <div>
                <TimerEditableText value={this.state.timeRemaining}
                                   secsRemaining={this.state.timeRemaining}
                                   enabled={this.state.isRunning}
                                   onChange={(newValue) => {this.setState({timeRemaining: parseInt(newValue)})}}
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
    value: number, // TODO remove
    secsRemaining: number,
    enabled: boolean,
    // TODO update this to number func
    onChange(newValue: string): void,
}

export function TimerEditableText(props: ITimerEditableTextProps) {
    const [totalSecs, setTotalSecs] = useState<number>(0); 
    const [inputMins, setInputMins] = useState<number>(0);
    const [editingMins, setEditingMins] = useState<boolean>(false);
    const [inputSecs, setInputSecs] = useState<number>(0);
    const [editingSecs, setEditingSecs] = useState<boolean>(false);

    const handleMinsChange = (newValue: string) => {
        setInputMins(parseInt(newValue));
    };
    const handleSecsChange = (newValue: string) => {
        setInputSecs(parseInt(newValue));
    };

    useEffect(() => {
        setTotalSecs((inputMins * 60) + inputSecs);
    }, [inputMins, inputSecs]);


    const getMins = (totalSeconds: number) => {
        return Math.floor(totalSeconds / 60);
    };

    const getSecs = (totalSeconds: number) => {
        return (totalSeconds % 60);
    }

    const updateTime = (newValue: string) => {
        setEditingMins(false);
        setEditingSecs(false);
        // Set the total time
        let totalSecs = (inputMins * 60) + inputSecs
        setTotalSecs(totalSecs);
        props.onChange(totalSecs.toString());
        // Update the input mins + secs to the 'normalized', confirmed values.
        setInputMins(getMins(totalSecs));
        setInputSecs(getSecs(totalSecs));
    }

    return (
        <span>
{/* total secs = {totalSecs}
value = {props.value} */}
               <EditableText type="number"
                             disabled={props.enabled}
                             onConfirm={updateTime}
                             onChange={handleMinsChange}
                             maxLength={2}
                             value={editingMins ? inputMins.toString() : getMins(props.secsRemaining).toString()}
                             onEdit={() => {setEditingMins(true)}}
                             onCancel={() => {setEditingMins(false)}}
                /> 
                : 
                <EditableText type="number"
                             disabled={props.enabled}
                             onConfirm={updateTime}
                             onChange={handleSecsChange}
                             maxLength={2}
                             value={editingSecs ? inputSecs.toString() : getSecs(props.secsRemaining).toString()}
                             onEdit={() => {setEditingSecs(true)}}
                             onCancel={() => {setEditingSecs(false)}}
                /> 
        </span> 
    );
}