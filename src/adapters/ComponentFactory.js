// src/adapters/ComponentFactory.js
import ComponentRegistry from '../core/ComponentRegistry.js';
import ComponentCore from '../core/ComponentCore.js';

class ComponentFactory {
  static defineComponent(componentData) {
    const { tagName } = componentData;
    
    if (ComponentRegistry.isComponentDefined(tagName)) {
      console.log(`Componente ${tagName} ya estaba definido`);
      return;
    }

    // Guardar SOLO la definición, no una instancia del core
    ComponentRegistry.registerDefinition(tagName, componentData);

    customElements.define(tagName, class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.core = null; // Inicializamos como null
      }

      connectedCallback() {
        // Obtener la definición del registro
        const definition = ComponentRegistry.getDefinition(this.tagName.toLowerCase());
        
        if (!definition) {
          console.error(`No se encontró definición para ${this.tagName}`);
          return;
        }
        
        // Crear el core con la definición
        this.core = new ComponentCore(definition);
        
        // Registrar la instancia
        ComponentRegistry.registerInstance(this, this.core);
        
        // Configurar actualizaciones
        this.core.onUpdate = () => this.render();
        
        // Render inicial
        this.render();
      }

      render() {
        if (!this.core) return;
        
        this.shadowRoot.innerHTML = '';
        const fragment = this.core.processTemplate();
        if (fragment) {
          this.shadowRoot.appendChild(fragment);
        }
        this.applyListeners();
      }

      applyListeners() {
        if (!this.core) return;
        
        // Ahora accedemos correctamente a los listeners desde la definición
        const { listeners = [] } = this.core.definition; // Cambiamos core.data por core.definition
        
        listeners.forEach(({ event, selector, handler }) => {
          this.shadowRoot.querySelectorAll(selector).forEach(el => {
            el.addEventListener(event, (e) => handler.call(this, e, this.core));
          });
        });
      }

      // Métodos útiles para interactuar con el componente
      getState() {
        return this.core ? this.core.state : null;
      }

      setState(newState) {
        if (this.core) {
          this.core.setState(newState);
        }
      }
    });

    console.log(`✅ Componente ${tagName} definido correctamente`);
  }
}

export default ComponentFactory;