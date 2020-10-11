import React, { useState, useEffect } from 'react';
import { PostTimerAction } from "../PostTimerAction";
import Confetti from 'react-confetti';

export class ConfettiAction extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Confetti");
        this.timer = null;
    }

    onTimerComplete(): JSX.Element {
        return (
            <EpicConfetti/>
        );
    }

    cleanup(): void {
    }
}

export function EpicConfetti() : JSX.Element {
    const [currentColour, setCurrentColour] = useState<string>('yellow');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColour(current => current === 'yellow' ? 'grey' : 'yellow');
        }, 100);
        return () => {
            // Cleanup
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{backgroundColor: currentColour, height: "100%"}}>
          <Confetti/>
        </div>
    );
}
