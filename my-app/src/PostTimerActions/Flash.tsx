import { PostTimerAction } from "./PostTimerAction";

export class FlashAction extends PostTimerAction {

    constructor() {
        super("Flash");
    }

    onTimerComplete(): void {
        console.log("Timer is done");
    }

    cleanup(): void {
        console.log("cleaned up");
    }
}