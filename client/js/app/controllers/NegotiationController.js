class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");

    this._listNegotiationsViewElement = $("#negotiationsView");

    this._listNegotiations = new DataBinding(
      new ListNegotiations(),
      this._listNegotiationsView = new ListNegotiationsView(
        this._listNegotiationsViewElement),
      "add",
      "clear"
    );

    this._messageViewElement = $("#messageView");

    this._message = new DataBinding(
      new Message(),
      this._messageView = new MessageView(this._messageViewElement),
      "content"
    );
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();
    this._listNegotiations.add(negotiation);
    this._message.content = "Negociação adicionada com sucesso";
    this._clearForm();
    this._messageView.removeMessage();
  }

  delete() {
    this._listNegotiations.clear();
    this._message.content = "Negociações deletadas com sucesso";
    this._messageView.removeMessage();
  }

  _createNegotiation() {
    const negotiation = new Negotiation(
      DateHelper.convertStringToDate(this._data.value),
      this._quantity.value,
      this._value.value
    );

    return negotiation;
  }

  _clearForm() {
    this._data.value = "";
    this._quantity.value = "";
    this._value.value = "";

    this._data.focus();
  }
}
