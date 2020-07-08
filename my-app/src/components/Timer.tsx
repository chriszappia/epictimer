import React from 'react';
import { runInThisContext } from 'vm';


// TODOs
// onTick callback
// onComplete callback
export interface IProps  {
    initialTime: number,
    running: boolean,
    className: string,
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
        }
      };

    private stop = () => {
        clearInterval(this.timer!);
        this.setState({isRunning: false});
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
                <div>{this.state.timeRemaining}</div>
                <div>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            </div> 
        );
    }
}