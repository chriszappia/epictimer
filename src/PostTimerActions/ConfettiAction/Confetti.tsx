import React, { useState, useEffect } from 'react';
import { PostTimerAction } from "../PostTimerAction";
import Confetti from 'react-confetti';

/**
 * A PostTimerAction that rains Confetti on the screen while flashing using the EpicConfetti
 * component.
 */
export class ConfettiAction extends PostTimerAction {
    constructor() {
        super("Confetti");
    }

    /** @inheritDoc */
    onTimerComplete(): JSX.Element {
        return (
            <EpicConfetti/>
        );
    }

    /** @inheritDoc */
    cleanup(): void {
        // Do nothing.
    }
}

/**
 * The EpicConfetti component that rains confetti on the screen and flashes yellow light.
 */
export function EpicConfetti() : JSX.Element {
    const [currentColour, setCurrentColour] = useState<string>('yellow');

    /**
     * Toggles the current colour in state after a delay of 100ms.
     * The useEffect React-hook lifecycle function runs on first render and after every state update, which means
     * that this function will continue to run while the component is mounted.
     */
    useEffect(() => {
       setTimeout(() => {
            setCurrentColour(current => current === 'yellow' ? 'grey' : 'yellow');
        }, 100);
    });

    return (
        <div style={{backgroundColor: currentColour, height: "100%"}}>
          <Confetti/>
        </div>
    );
}
