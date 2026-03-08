// src/index.js
import ComponentCore from './core/ComponentCore.js';
import ComponentFactory from './adapters/ComponentFactory.js';
import ComponentRegistry from './core/ComponentRegistry.js';

class Component {
  constructor(config) {
    // Guardar configuración
    this.config = config;
    this.tagName = config.tagName.toLowerCase();
    
    // Verificar que tenemos tagName
    if (!this.tagName) {
      throw new Error('Component: tagName es requerido');
    }
    
    // Definir el componente si no existe
    if (!ComponentRegistry.isComponentDefined(this.tagName)) {
      ComponentFactory.defineComponent(config);
    }
    
    // Crear y retornar el elemento
    return this.createElement();
  }

  createElement() {
    // Crear el elemento personalizado
    const element = document.createElement(this.tagName);
    
    // Si hay estado inicial, lo aplicamos cuando el elemento esté listo
    if (this.config.initialState) {
      // Pequeño retraso para asegurar que el core está inicializado
      setTimeout(() => {
        if (element.setState) {
          element.setState(this.config.initialState);
        }
      }, 0);
    }
    
    return element;
  }

  // Método estático para definir componentes sin instanciar
  static define(config) {
    if (!ComponentRegistry.isComponentDefined(config.tagName)) {
      ComponentFactory.defineComponent(config);
    }
  }
}

export default Component;