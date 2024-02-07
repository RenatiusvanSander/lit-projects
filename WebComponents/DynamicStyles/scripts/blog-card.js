//const titles = [
 //   {"title":"One", "subtitle":"We did it!"},
   // {"title":"Two", "subtitle":"We did it twice."},
 //   {"title":"Three", "subtitle":"e did it third time."}
//];

class BlogCard extends HTMLElement {

    static get observedAttributes() {
        return ['title','subtitle','cover'];
    }

    constructor() {
        super();
        /*
        Inside a constructor we populate member varies of class.
        */
       this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(oldValue, newValue);
        if(oldValue !== newValue && newValue !== null) {
            this[attrName] = newValue;
        }
        // this.render();
    }

    connectedCallback() { 
        console.log('Here');
        this.render();
    }

    disconnectedCallback() {
        console.log('Disconnected from the DOM!');
    }

    render() {
        const {shadowRoot} = this;
        const templateNode = document.getElementById('card-template');

        console.log(templateNode);

        shadowRoot.innerHTML = '';
        if(templateNode) {
            const instance = document.importNode(templateNode.content, true);
            instance.querySelector('.title').innerHTML = this['title'];
            instance.querySelector('.subtitle').innerHTML = this['subtitle'];
            instance.querySelector('.cover').src = this['cover'];

            shadowRoot.appendChild(instance);
        } else {
            shadowRoot.innerHTML = '<p>ShadowRoot failed. Pleae try again later.</p>';
        }
    }
}

customElements.define('blog-card', BlogCard);

document.querySelector('blog-card').remove();