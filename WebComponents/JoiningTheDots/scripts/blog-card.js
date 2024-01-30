//const titles = [
 //   {"title":"One", "subtitle":"We did it!"},
   // {"title":"Two", "subtitle":"We did it twice."},
 //   {"title":"Three", "subtitle":"e did it third time."}
//];

class BlogCard extends HTMLElement {

    static get observedAttributes() {
        return ['title','content','cover'];
    }

    constructor() {
        super();
        /*
        Inside a constructor we populate member varies of class.
        */
       this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrname, oldValue, newValue) {
        if(oldValue !== newValue && newValue !== null) {
            this.[attrName] = newValue;
        }
    }

    connectedCallback() {
        const template = document.getElementById('card-template');

        titles.forEach(title => {
            const instance = document.importNode(template.contentEditable, true);

            instance.querySelector('.title').innerHtml = title.title;
            instance.querySelector('.subtitle').innerHtml = title.subtitle;

            this.appendChild(instance);
        });

        this.render();
    }

    render() {
        const {shadowRoot} = this;
        const templateNode = document.getElementById('card-template');

        shadowRoot.innerHTML = '';
        if(templateNode) {
            const instance = document.importNode(templateNode.contentEditable, true);
            instance.querySelector('.title').innerHTML = this['title'];
            instance.querySelector('.subtitle').innerHTML = this['subtitle'];
            instance.querySelector('.cover').src = this['cover'];

            shadowRoot.appendChild(instance);
        } else {
            shadowRoot.innerHTML = '<p>ShadowRoot failed. Pleae try again later.</p>';
        }
    }

    disconnectedCallback() {
        console.log('Disconnected from the DOM!');
    }
}

customElements.define('blog-card', BlogCard);

document.querySelector('blog-card').remove();