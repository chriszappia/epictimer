export abstract class PostTimerAction {

    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    /**
     * What to do when the timer finishes.
     */
    abstract onTimerComplete(): void;

    /**
     * Timer actions should clean up after themselves.
     */
    abstract cleanup(): void;
}