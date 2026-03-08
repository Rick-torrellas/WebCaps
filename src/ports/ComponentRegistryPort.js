// src/core/ports/ComponentRegistryPort.js
/**
 * Puerto para el registro de componentes
 * Abstrae el almacenamiento de definiciones e instancias
 */
class ComponentRegistryPort {
  registerDefinition(tagName, definition) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
  
  getDefinition(tagName) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
  
  registerInstance(element, coreInstance) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
  
  getInstance(element) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
  
  isComponentDefined(tagName) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
}

export default ComponentRegistryPort;