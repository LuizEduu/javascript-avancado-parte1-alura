class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");

    this._listNegotiationsViewElement = $("#negotiationsView");

    this._listNegotiations = new DataBinding(
      new ListNegotiations(),
      (this._listNegotiationsView = new ListNegotiationsView(
        this._listNegotiationsViewElement
      )),
      "add",
      "clear",
      "order",
      "reverse"
    );

    this._messageViewElement = $("#messageView");

    this._message = new DataBinding(
      new Message(),
      (this._messageView = new MessageView(this._messageViewElement)),
      "content"
    );

    this._sortOrder = "";
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

  importNegotiations() {
    const importNegotiationsService = new NegotiationsService();

    importNegotiationsService
      .getAllNegotiations()
      .then((negotiations) => {
        negotiations
          .reduce(
            (fletedArray, negotiations) => fletedArray.concat(negotiations),
            []
          )
          .forEach((negotiation) => this._listNegotiations.add(negotiation));

        this._message.content = "Negociações adicionadas com sucesso";
      })
      .catch(
        (err) => (this._message.content = "Erro ao importar as negociações")
      );
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

  order(event) {
    const value = event.target.textContent.toLowerCase(); //pega o alvo filho do evento e seu valor

    if (this._sortOrder == value) {
      this._listNegotiations.reverse();
    } else {
      if (value == "quantidade") {
        this._listNegotiations.order((a, b) => a.quantity - b.quantity);
      } else if (value == "valor") {
        this._listNegotiations.order((a, b) => a.value - b.value);
      } else {
        this._listNegotiations.order((a, b) => a.data - b.data);
      }
    }

    this._sortOrder = value;
  }
}
