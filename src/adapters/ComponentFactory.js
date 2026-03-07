import ComponentCore from '../core/ComponentCore.js';

class ComponentFactory {
  // Ahora recibe el core, que tiene acceso a data.tagName y a los métodos
  static create(core) {
    const { tagName, listeners } = core.data; 

    customElements.define(tagName, class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        core.onUpdate = () => this.render();
        this.render();
      }

      render() {
        this.shadowRoot.innerHTML = '';
        // Usamos el core para obtener el fragmento
        this.shadowRoot.appendChild(core.processTemplate());
        this.applyListeners();
      }

      applyListeners() {
        listeners.forEach(({ event, selector, handler }) => {
          this.shadowRoot.querySelectorAll(selector).forEach(el => {
            el.addEventListener(event, (e) => handler(e, core));
          });
        });
      }
    });
  }
}

export default ComponentFactory;