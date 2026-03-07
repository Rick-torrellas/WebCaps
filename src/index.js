import ComponentCore from './core/ComponentCore.js';
import ComponentFactory from './adapters/ComponentFactory.js';

class Component {
  constructor(data) {
    this.core = this.init(data);
  }

  init(data) {
    // 1. Instanciamos el Core
    const core = new ComponentCore(data);
    
    // 2. Pasamos solo la instancia del core a la fábrica
    ComponentFactory.create(core);
    
    return core;
  }
}

export default Component;