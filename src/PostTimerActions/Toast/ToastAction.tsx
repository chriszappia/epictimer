import { Intent, IToaster, IToastProps, Toaster, ToasterPosition } from '@blueprintjs/core';
import { INTENT_DANGER } from '@blueprintjs/core/lib/esm/common/classes';
import React, { useState, useEffect } from 'react';
import YouTube, { Options } from 'react-youtube';
import { PostTimerAction } from "../PostTimerAction";

/**
 * Surely all these toasts will get the attention of the user
 */
export class ToastAction extends PostTimerAction {
    private toasters: IToaster[];
    private timer: NodeJS.Timeout | null;

    constructor() {
        super("Toast");
        this.timer = null;
        this.toasters = [];
    }

    onTimerComplete(): JSX.Element {
        ["top", "bottom", "top-right", "top-left", "bottom-right", "bottom-left"].forEach((toasterPos) => {
            this.toasters.push(Toaster.create({
                maxToasts: 6,
                position: toasterPos as ToasterPosition,
            }))
        });

        return (
            <ToastDiv toasters={this.toasters}/>
        );
    }

    cleanup(): void {
        this.toasters.forEach((toaster) => {
            toaster.clear();
        });
        this.toasters = [];
    }
}


export interface IToastDivProps {
    toasters: IToaster[],
}

export function ToastDiv(props: IToastDivProps) {
    const intents = [
        Intent.DANGER,
        Intent.SUCCESS,
        Intent.WARNING,
        Intent.PRIMARY
    ];


    useEffect(() => {
      const interval = setInterval(() => {
          const toastProps: IToastProps = {
              message: "Timer has finished!",
              intent: intents[Math.floor(Math.random() * intents.length)]
          };
          props.toasters[Math.floor(Math.random() * props.toasters.length)].show(toastProps);
        //   setCurrentToasterIndex(current => current + 1 > props.toasters.length ? current + 1 : 0);
        }, 200);
      return () => {
          // Cleanup
          clearInterval(interval);
      };
    }, []);

    return (
        <div></div>
    );
}