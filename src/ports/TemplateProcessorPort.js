// src/core/ports/TemplateProcessorPort.js
/**
 * Puerto para el procesamiento de templates
 * El núcleo depende de esta abstracción, no de una implementación concreta
 */
class TemplateProcessorPort {
  /**
   * Convierte un template string a un DocumentFragment
   * @param {string} templateString - El template HTML
   * @returns {DocumentFragment}
   */
  stringToFragment(templateString) {
    throw new Error('Método debe ser implementado por el adaptador');
  }
}

export default TemplateProcessorPort;