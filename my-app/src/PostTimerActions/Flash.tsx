import React, { useState, useEffect } from 'react';
import { PostTimerAction } from "./PostTimerAction";
import { cleanup } from '@testing-library/react';

export class FlashAction extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Flash");
        this.timer = null;
    }

    onTimerComplete(): JSX.Element {
        return (
            <FlashingDiv/>
        );
    }

    cleanup(): void {
    }
}


export function FlashingDiv() {

    const [currentColour, setCurrentColour] = useState<string>("red"); 
    const [timer] = useState<NodeJS.Timeout>(setInterval(() => {
        tick();
    }, 100));

    useEffect(() => {
        return function cleanup() {
            console.log("clearing timeout");
            clearInterval(timer);
        }
    });


    const tick = () => {
        setCurrentColour(currentColour === 'red' ? 'white' : 'red');
    };

    return (
        <div style={{backgroundColor: currentColour}} className={"full" } />
    );
}