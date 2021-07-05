class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");

    this.listNegotiationsViewElement = $("#negotiationsView");
    this.messageViewElement = $("#messageView");

    this.listNegotiations = new ListNegotiations((model) => {
      console.log(this);
      this.listNegotiationsView.update(model);
    });

    this.listNegotiationsView = new ListNegotiationsView(
      this.listNegotiationsViewElement
    );

    this.message = new Message();
    this.messageView = new MessageView(this.messageViewElement);
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();

    this.listNegotiations.add(negotiation);
    this.message.message = "Negociação adicionada com sucesso";
    this.messageView.update(this.message);

    this._clearForm();
    this.messageView.removeMessage();
  }

  delete() {
    this.listNegotiations.clear();
    this.message.message = "Negociações deletadas com sucesso";
    this.messageView.update(this.message);
    this.messageView.removeMessage();
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
