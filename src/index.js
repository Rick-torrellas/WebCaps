// src/index.js
import DefineComponentUseCase from './adapters/DefineComponentUseCase.js';
import ComponentRegistryAdapter from './adapters/ComponentRegistryAdapter.js';
import TemplateProcessorAdapter from './adapters/TemplateProcessorAdapter.js';

// Configuración por defecto (podría ser personalizable)
const defaultRegistry = new ComponentRegistryAdapter();
const defaultTemplateProcessor = new TemplateProcessorAdapter();
const defaultUseCase = new DefineComponentUseCase(defaultRegistry, defaultTemplateProcessor);

class Component {
  constructor(config) {
    this.config = config;
    this.tagName = config.tagName.toLowerCase();
    
    if (!this.tagName) {
      throw new Error('Component: tagName es requerido');
    }
    
    // Usar el caso de uso por defecto
    if (!defaultRegistry.isComponentDefined(this.tagName)) {
      defaultUseCase.execute(config);
    }
    
    return this.createElement();
  }

  createElement() {
    const element = document.createElement(this.tagName);
    
    if (this.config.initialState) {
      setTimeout(() => {
        if (element.setState) {
          element.setState(this.config.initialState);
        }
      }, 0);
    }
    
    return element;
  }

  // Método estático que permite inyección de dependencias
  static define(config, registry = defaultRegistry, useCase = defaultUseCase) {
    if (!registry.isComponentDefined(config.tagName)) {
      useCase.execute(config);
    }
  }

  // Método para configurar la fábrica con implementaciones personalizadas
  static configure(options = {}) {
    const registry = options.registry || defaultRegistry;
    const templateProcessor = options.templateProcessor || defaultTemplateProcessor;
    return {
      define: (config) => {
        const useCase = new DefineComponentUseCase(registry, templateProcessor);
        Component.define(config, registry, useCase);
      },
      registry,
      templateProcessor
    };
  }
}

export default Component;