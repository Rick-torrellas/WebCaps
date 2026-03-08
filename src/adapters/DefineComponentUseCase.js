// src/application/usecases/DefineComponentUseCase.js
import ComponentCore from '../core/ComponentCore.js';
/**
 * Caso de uso: Definir un nuevo componente web
 * Orquesta el registro y la definición del componente
 */
class DefineComponentUseCase {
  /**
   * @param {ComponentRegistryPort} registry - Puerto para registro de componentes
   * @param {TemplateProcessorPort} templateProcessor - Puerto para procesar templates
   */
  constructor(registry, templateProcessor) {
    this.registry = registry;
    this.templateProcessor = templateProcessor;
  }

  execute(componentData) {
    const { tagName } = componentData;
    
    if (this.registry.isComponentDefined(tagName)) {
      console.log(`Componente ${tagName} ya estaba definido`);
      return;
    }

    // Guardar SOLO la definición
    this.registry.registerDefinition(tagName, componentData);

    // Definir el Web Component
    customElements.define(tagName, this._createComponentClass());
    
    console.log(`✅ Componente ${tagName} definido correctamente`);
  }

  _createComponentClass() {
    // Guardamos referencia al caso de uso para usarla en la clase
    const useCase = this;
    
    return class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.core = null;
      }

      connectedCallback() {
        const definition = useCase.registry.getDefinition(this.tagName.toLowerCase());
        
        if (!definition) {
          console.error(`No se encontró definición para ${this.tagName}`);
          return;
        }
        
        // Crear el core con el procesador de templates inyectado
        this.core = new ComponentCore(definition, useCase.templateProcessor);
        
        // Registrar la instancia
        useCase.registry.registerInstance(this, this.core);
        
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
        this._applyListeners();
      }

      _applyListeners() {
        if (!this.core) return;
        
        const { listeners = [] } = this.core.definition;
        
        listeners.forEach(({ event, selector, handler }) => {
          this.shadowRoot.querySelectorAll(selector).forEach(el => {
            el.addEventListener(event, (e) => handler.call(this, e, this.core));
          });
        });
      }

      // Métodos públicos del componente
      getState() {
        return this.core ? this.core.state : null;
      }

      setState(newState) {
        if (this.core) {
          this.core.setState(newState);
        }
      }
    };
  }
}

export default DefineComponentUseCase;