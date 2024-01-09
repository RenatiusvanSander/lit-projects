import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('lit-render')
class LitRender extends LitElement {

  render(){
    return html`<p>Hello from my template.</p>`;
  }
}