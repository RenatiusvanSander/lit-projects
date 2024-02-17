import { LitElement } from 'lit';
export declare class MyClockNew extends LitElement {
    currentTime?: string;
    private _timerInterval;
    private _timeFormatter;
    constructor();
    connectedCallback(): void;
    private updateCurrentTime;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=my-clock-new.d.ts.map