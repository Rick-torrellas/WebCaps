import { TemplateProcessor } from './processors/TemplateProcessor.js';

class ComponentCore {
  constructor(data) {
    this.data = data;
    this.state = data.state;
    this.onUpdate = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (this.onUpdate) this.onUpdate(this.state);
  }

  // Aquí el Core decide cómo procesar el template delegando en los procesadores
  processTemplate() {
    const rawTemplate = typeof this.data.template === 'function' 
      ? this.data.template(this.state) 
      : this.data.template;
    
    return TemplateProcessor.stringToFragment(rawTemplate);
  }
}

export default ComponentCore;