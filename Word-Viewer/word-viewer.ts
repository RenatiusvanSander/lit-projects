import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('word-viewer')
export class WordViewer extends LitElement {
  
  render () {
    return html`<pre>Word Viewer</pre>`;
  }
}