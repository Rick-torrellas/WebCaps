// La DataClass principal
class ComponentData {
  constructor({ tagName, template, state, listeners = [] }) {
    this.tagName = tagName.toLowerCase();
    this.template = template; // Puede ser string, id de selector, o funcion
    this.state = state;
    this.listeners = listeners;
  }
}

export default ComponentData;