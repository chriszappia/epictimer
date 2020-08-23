import React, { useState } from 'react';
import { EditableText } from '@blueprintjs/core'

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

    tick = () => {
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
    value: number,
    enabled: boolean,
    onChange(newValue: string): void,
}

export function TimerEditableText(props: ITimerEditableTextProps) {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
      }

    return (
        <span>
        <input type='number'
               disabled={props.enabled}
               value={props.value.toString()}
               onChange={handleChange}
               min={0}/>
        </span>
    );
}