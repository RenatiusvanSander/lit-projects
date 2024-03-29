var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from 'lit/decorators.js';
let NameTag = class NameTag extends LitElement {
    render() {
        return html `Hello I'm ${this.name}.`;
    }
};
__decorate([
    property()
], NameTag.prototype, "name", void 0);
NameTag = __decorate([
    customElement('name-tag')
], NameTag);
const tag = document.createElement('name-tag');
tag.name = 'dynamically initiliazed';
document.body.appendChild(tag);
//# sourceMappingURL=name-tag.js.map