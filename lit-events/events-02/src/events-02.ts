import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('events-02')
export class Events02 extends LitElement {

  @property() hostName = '';
  
  @property() shadowName = '';
  constructor() {
    super();
    this.addEventListener('click',
      (e: Event) => this.hostName = (e.target as Element).localName);
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener('click',
      (e: Event) => this.shadowName = (e.target as Element).localName);
    root.addEventListener('click', (e:Event) => this._resetHandler(e));
    return root;
  }

  public _resetHandler(e: Event) {
    this.hostName = (e.target as Element).localName;
    this.shadowName = (e.target as Element).clientWidth.toString();
  }

  protected override render() {
    return html`
      <p><button>Click Me!</button></p>
      <p><button name="resethandler" @click="${this._resetHandler}">Reset Me!</button></p>
      <p>Component target: ${this.hostName}</p>
      <p>Shadow target: ${this.shadowName}</p>
    `;
  }
}