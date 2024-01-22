import { LitElement, html} from "lit";
import {customElement, property} from 'lit/decorators.js';

@customElement('name-tag')
class NameTag extends LitElement {
  @property()
  name?: string;

  override render() {
    return html`Hello I'm ${this.name}.`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'name-tag': NameTag
  }
}

const tag = document.createElement('name-tag');
tag.name = 'dynamically initiliazed';
document.body.appendChild(tag);