import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-clock-new')
export class MyClockNew extends LitElement {

  @property({type: String}) currentTime?: string;

  private _timerInterval:number;
  private _timeFormatter:Intl.DateTimeFormat;

  constructor() {
    super();
    this._timerInterval = 0;
    this._timeFormatter = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    this.currentTime = this.updateCurrentTime();
  }

  override connectedCallback() {
    super.connectedCallback();
    this._timerInterval = setInterval(() => this.updateCurrentTime(), 1000 /** 60*/);
  }

  private updateCurrentTime():string {
    let formattedTime = this._timeFormatter.format(Date.now());
    this.currentTime = formattedTime;

    return formattedTime;
  }

  override disconnectedCallback() {
     super.disconnectedCallback();
     clearInterval(this._timerInterval);
  }

  protected override render() {
    return html`
      <p>Current time is: ${this.currentTime}</p>
    `;
  }

}