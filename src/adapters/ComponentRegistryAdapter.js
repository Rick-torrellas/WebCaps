import ComponentRegistryPort from '../ports/ComponentRegistryPort.js';

class ComponentRegistryAdapter extends ComponentRegistryPort {
  constructor() {
    super();
    this.definitions = new Map();
    this.instances = new WeakMap();
  }

  registerDefinition(tagName, definition) {
    const key = tagName.toLowerCase();
    if (this.definitions.has(key)) {
      console.warn(`Componente ${key} ya está definido. Usando definición existente.`);
      return false;
    }
    this.definitions.set(key, definition);
    return true;
  }

  getDefinition(tagName) {
    return this.definitions.get(tagName.toLowerCase());
  }

  registerInstance(element, coreInstance) {
    this.instances.set(element, coreInstance);
  }

  getInstance(element) {
    return this.instances.get(element);
  }

  isComponentDefined(tagName) {
    return this.definitions.has(tagName.toLowerCase());
  }

  clear() {
    this.definitions.clear();
    this.instances = new WeakMap();
  }
}

export default ComponentRegistryAdapter;