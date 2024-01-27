var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Events02 = class Events02 extends LitElement {
    constructor() {
        super();
        this.hostName = '';
        this.shadowName = '';
        this.addEventListener('click', (e) => this.hostName = e.target.localName);
    }
    createRenderRoot() {
        const root = super.createRenderRoot();
        root.addEventListener('click', (e) => this.shadowName = e.target.localName);
        root.addEventListener('click', (e) => this._resetHandler(e));
        return root;
    }
    _resetHandler(e) {
        this.hostName = e.target.localName;
        this.shadowName = e.target.clientWidth.toString();
    }
    render() {
        return html `
      <p><button>Click Me!</button></p>
      <p><button name="resethandler" @click="${this._resetHandler}">Reset Me!</button></p>
      <p>Component target: ${this.hostName}</p>
      <p>Shadow target: ${this.shadowName}</p>
    `;
    }
};
__decorate([
    property()
], Events02.prototype, "hostName", void 0);
__decorate([
    property()
], Events02.prototype, "shadowName", void 0);
Events02 = __decorate([
    customElement('events-02')
], Events02);
export { Events02 };
//# sourceMappingURL=events-02.js.map