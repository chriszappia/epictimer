import React, { useState, useEffect, useRef } from 'react';
import { PostTimerAction } from "./PostTimerAction";

export class FlashAction2 extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Flash blue");
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
    const [currentColour, setCurrentColour] = useState<string>('blue'); 

    useEffect(() => {
      const interval = setInterval(() => {
            setCurrentColour(current => current === 'blue' ? 'white' : 'blue');
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