class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");

    this._listNegotiationsViewElement = $("#negotiationsView");
    this._messageViewElement = $("#messageView");

    this._listNegotiations = new ListNegotiations();
    this._listNegotiationsView = new ListNegotiationsView(
      this._listNegotiationsViewElement
    );

    this._listNegotiationsView.update(this._listNegotiations);

    this._message = new Message();
    this._messageView = new MessageView(this._messageViewElement);

    //criando um proxy para lista de negociações
    this._listNegotiations = ProxyFactory.create(
      new ListNegotiations(),
      ["add", "remove"],
      () => {
        this._listNegotiationsView.update(this._listNegotiations);
      }
    );
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();

    this._listNegotiations.add(negotiation);
    this._message.message = "Negociação adicionada com sucesso";
    this._messageView.update(this._message);

    this._clearForm();
    this._messageView.removeMessage();
  }

  delete() {
    this._listNegotiations.clear();
    this._message.message = "Negociações deletadas com sucesso";
    this._messageView.update(this._message);
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
