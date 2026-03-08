// src/core/ComponentRegistry.js
// PUERTO: Registro central de componentes

class ComponentRegistry {
  constructor() {
    this.definitions = new Map(); // tagName -> definición
    this.instances = new WeakMap(); // elemento -> instancia core
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
    // WeakMap no tiene método clear, pero podemos crear una nueva instancia
    this.instances = new WeakMap();
  }
}

const instance = new ComponentRegistry();
export default instance;