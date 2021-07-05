class MessageView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    return `<p class="alert alert-info">${model.message}</p>`;
  }

  update(model) {
    this._element.innerHTML = this._template(model);
  }

  removeMessage() {
    setTimeout(() => {
      this._element.innerHTML = "";
    }, 3000);
  }
}
