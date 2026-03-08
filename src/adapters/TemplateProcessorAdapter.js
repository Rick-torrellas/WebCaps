// src/infrastructure/adapters/TemplateProcessorAdapter.js
import TemplateProcessorPort from '../ports/TemplateProcessorPort.js';

class TemplateProcessorAdapter extends TemplateProcessorPort {
  stringToFragment(templateString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateString, 'text/html');
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.childNodes).forEach(node => fragment.appendChild(node));
    return fragment;
  }
}

export default TemplateProcessorAdapter;