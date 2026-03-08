import TemplateProcessorPort from '../ports/TemplateProcessorPort.js';

class ComponentCore {
  /**
   * @param {Object} definition - Definición del componente
   * @param {TemplateProcessorPort} templateProcessor - Adaptador para procesar templates
   */
  constructor(definition, templateProcessor) {
    this.definition = { ...definition };
    this.state = { ...(definition.state || {}) };
    this.templateProcessor = templateProcessor; // Inyección de dependencia
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
    
    // Usa el puerto inyectado en lugar de importar directamente
    return this.templateProcessor.stringToFragment(rawTemplate);
  }

  getListeners() {
    return this.definition.listeners || [];
  }
}

export default ComponentCore;