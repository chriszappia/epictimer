import React, { useState, useEffect } from 'react';
import { PostTimerAction } from "../PostTimerAction";

export class FlashAction extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Flash Red");
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


export interface IFlashingDivProps {
    timer: NodeJS.Timeout | null;
}

export function FlashingDiv() {
    const [currentColour, setCurrentColour] = useState<string>('red'); 

    useEffect(() => {
      const interval = setInterval(() => {
            setCurrentColour(current => current === 'red' ? 'white' : 'red');
        }, 100);
      return () => {
          // Cleanup
          clearInterval(interval);
      };
    }, []);

    return (
        <div style={{backgroundColor: currentColour}} className={"full" } />
    );
}