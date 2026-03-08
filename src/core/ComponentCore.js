// src/core/ComponentCore.js
import { TemplateProcessor } from './processors/TemplateProcessor.js';

class ComponentCore {
  constructor(definition) {
    // Guardamos la definición completa
    this.definition = { ...definition };
    // Inicializamos el estado con una copia del estado de la definición
    this.state = { ...(definition.state || {}) };
    this.onUpdate = null;
    this.instanceId = Symbol('instanceId');
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (this.onUpdate) {
      this.onUpdate(this.state);
    }
    return this;
  }

  processTemplate() {
    const template = this.definition.template;
    
    if (!template) {
      console.warn('Template no definido');
      return document.createDocumentFragment();
    }

    const rawTemplate = typeof template === 'function' 
      ? template(this.state) 
      : template;
    
    return TemplateProcessor.stringToFragment(rawTemplate);
  }

  // Método de utilidad para obtener los listeners
  getListeners() {
    return this.definition.listeners || [];
  }
}

export default ComponentCore;