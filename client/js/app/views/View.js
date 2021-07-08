class View {
  constructor(element) {
    this._element = element;
  }

  template() {
    throw new Error("Method template is obrigatory"); //obrigar a sobrescrita do metodo _template
  }

  update(model) {
    return (this._element.innerHTML = this.template(model));
  }

  removeMessage() {
    setTimeout(() => {
      this._element.innerHTML = "";
    }, 3000);
  }
}
