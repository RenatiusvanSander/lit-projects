var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyClockNew = class MyClockNew extends LitElement {
    constructor() {
        super();
        this._timerInterval = 0;
        this._timeFormatter = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        this.currentTime = this.updateCurrentTime();
    }
    connectedCallback() {
        super.connectedCallback();
        this._timerInterval = setInterval(() => this.updateCurrentTime(), 1000 /** 60*/);
    }
    updateCurrentTime() {
        let formattedTime = this._timeFormatter.format(Date.now());
        this.currentTime = formattedTime;
        return formattedTime;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this._timerInterval);
    }
    render() {
        return html `
      <p>Current time is: ${this.currentTime}</p>
    `;
    }
};
__decorate([
    property({ type: String })
], MyClockNew.prototype, "currentTime", void 0);
MyClockNew = __decorate([
    customElement('my-clock-new')
], MyClockNew);
export { MyClockNew };
//# sourceMappingURL=my-clock-new.js.map