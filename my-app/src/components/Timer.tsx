import React from 'react';
import { runInThisContext } from 'vm';
import { Stage, Layer,Text, Rect, Group } from 'react-konva';


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
    };

    private start = () => {
        this.timer = setInterval(() => {
            this.tick();
            console.log(this.state.timeRemaining);
        }, Timer.tickLength)
    };


    render() {
        return (
            <Group>
            <Text text={this.state.timeRemaining.toString()} />
            <Rect            x={20}
            y={20}
            width={50}
            height={50}
            fill={'red'}
            shadowBlur={5}
            onClick={this.start}
          /> 
          </Group>
            );
            // <div>
                // {/* <span>hello world {this.state.timeRemaining}</span> */}
                // {/* <Text>Hello World {this.state.timeRemaining}</Text> */}
                // {/* <span> */}
                    // {/* <button onClick={this.start} Text={"aaa"} />  */}
                    // {/*</span>Start Timer</button> */}
                    // {/* <button onClick={this.stop}>Stop Timer</button> */}
                // {/* </span> */}
            // </div> 
    }
}