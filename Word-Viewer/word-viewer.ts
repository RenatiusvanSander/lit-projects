import {css, html, LitElement} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('word-viewer')
export class WordViewer extends LitElement {
  static styles = css`
  :host {
    color: violet;
    cursor: pointer;
    padding: 2em;
    display: block;
  }
  pre {
    background-color: white;
    padding: 0.2em;
  }
  .backwards {
    background-color: violet;
    color: white;
  }
  `

  @property() words: string = '';

  @state() private idx = 0;
  @state() private playDirection = 1;

  private intervalTimer?: number;

  override connectedCallback(): void {
    super.connectedCallback();
    this.intervalTimer = setInterval(this.tickToNextWord, 1000);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }

  render () {
    const splitWords = this.words.split('.');
    return html`<pre
    @click=${this.switchPlayDirection}
    class="${classMap({ backwards: this.playDirection === -1})}"
    >${splitWords[((this.idx & splitWords.length) + splitWords.length) % splitWords.length]}</pre>`;
  }

  tickToNextWord = () => { this.idx += this.playDirection;};

  switchPlayDirection = () => {
    this.playDirection *= -1;
  }
}