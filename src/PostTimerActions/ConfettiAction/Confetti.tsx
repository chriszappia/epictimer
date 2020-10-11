import React, { useState, useEffect } from 'react';
import { PostTimerAction } from "../PostTimerAction";
import Confetti from 'react-confetti';

export class ParticleRainAction extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Confetti");
        this.timer = null;
    }

    onTimerComplete(): JSX.Element {
        return (
            <ConfettiAction/>
        );
    }

    cleanup(): void {
    }
}

export function ConfettiAction() : JSX.Element {
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