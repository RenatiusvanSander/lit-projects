const titles = [
    {"title":"One", "subtitle":"We did it!"},
    {"title":"Two", "subtitle":"We did it twice."},
    {"title":"Three", "subtitle":"e did it third time."}
];

class BlogCard extends HTMLElement {

    constructor() {
        super();
        /*
        Inside a constructor we populate member varies of class.
        */
       this.attachShadow({mode: 'open'});
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
            titles.forEach(title => {
                const instance = document.importNode(template.contentEditable, true);
    
                instance.querySelector('.title').innerHtml = title.title;
                instance.querySelector('.subtitle').innerHtml = title.subtitle;
    
                this.appendChild(instance);
            });
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