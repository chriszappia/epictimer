import React, { useState, useEffect } from 'react';
import YouTube, { Options } from 'react-youtube';
import { PostTimerAction } from "../PostTimerAction";

/**
 * what's going on?
 */
export class HeyeyeyeyAction extends PostTimerAction {
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Heyeyeyey");
        this.timer = null;
    }

    onTimerComplete(): JSX.Element {
        const opts: Options = {
            height: window.innerHeight.toString(),
            width: window.innerWidth.toString(),
            playerVars: {
              autoplay: 1,
            },
          };

        return (
            <YouTube videoId="Kob0G2hE8IY" opts={opts} />
        );
    }

    cleanup(): void {
    }
}