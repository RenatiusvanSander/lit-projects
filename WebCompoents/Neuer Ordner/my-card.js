class MyCard extends HTMLElement {

    connectedCallBack() {
        this.innerHTML = 'Hello World';
    }
}

window.customElements.define('my-card', MyCard);