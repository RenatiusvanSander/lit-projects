import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-clock')
export class MyClock extends LitElement {
  @property({type: String}) currentTime = "";

  private refreshTime():void {
    let d = new Date();
    this.currentTime = d.toLocaleTimeString();
  }

  override connectedCallback() {
    super.connectedCallback();
    window.setInterval(this.refreshTime ,1000);
  }

  override disconnectedCallback() {
     super.disconnectedCallback();
     window.clearInterval
  }

  protected override render() {
    return html`
      <p>Current time is: ${this.currentTime}</p>
    `;
  }

}