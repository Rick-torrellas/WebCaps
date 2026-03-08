// src/adapters/ComponentFactory.js (ahora realmente un adaptador)
import DefineComponentUseCase from './DefineComponentUseCase.js';
import ComponentRegistryAdapter from './ComponentRegistryAdapter.js';
import TemplateProcessorAdapter from './TemplateProcessorAdapter.js';

// Configuración de fábrica (podría inyectarse desde afuera)
const registry = new ComponentRegistryAdapter();
const templateProcessor = new TemplateProcessorAdapter();
const defineComponentUseCase = new DefineComponentUseCase(registry, templateProcessor);

class ComponentFactory {
  static defineComponent(componentData) {
    defineComponentUseCase.execute(componentData);
  }

  // Exponer acceso al registro si es necesario
  static getRegistry() {
    return registry;
  }
}

export default ComponentFactory;