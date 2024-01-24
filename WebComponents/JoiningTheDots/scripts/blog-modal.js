class BlogModal extends HTMLElement {

    static get observedAttributes() {
        return ['title', 'content'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if(oldValue !== newValue) {
            this[attrName] = newValue;
        }

        this.render();
    }

    // 5:15
    get title() {
        return this.getAttribute('title');
    }

    get conntent() {
        return this.getAttribute('content');
    }

    render() {
        const { shadowRoot } = this;
        const templateNode = document.getElementById('modal-template');

        shadowRoot.innerHTML = '';
        if(templateNode) {
            const instance = document.importNode(templateNode.contentEditable, true);
            instance.querySelector('.title').innerHTML = 'Title of the modal';
            instance.querySelector('.content').innerHTML = 'Content of the modal';
            shadowRoot.appendChild(instance);
        } else {
            shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.<p>';
        }
    }
}

customElements.define('blog-modal', BlogModal);