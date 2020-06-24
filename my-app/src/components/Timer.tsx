import React from 'react';
import { runInThisContext } from 'vm';


// TODOs
// onTick callback
// onComplete callback
export interface IProps  {
    initialTime: number,
    running: boolean,
};

export interface IState {
    timeRemaining: number,
    isRunning: boolean,
}

export class Timer extends React.Component<IProps, IState> {

    private static tickLength = 1000;

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
        }
      };

    private stop = () => {
        clearInterval(this.timer!);
    };

    private start = () => {
        this.timer = setInterval(() => {
            this.tick();
        }, Timer.tickLength)
    };


    render() {
        return (
            <div>
                <span>hello world {this.state.timeRemaining}</span>
                <span>
                    <button onClick={this.start}>Start Timer</button>
                    <button onClick={this.stop}>Stop Timer</button>
                </span>
            </div> 
        );
    }
}