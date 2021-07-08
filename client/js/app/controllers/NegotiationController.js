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
    this._sortOrder = "";

    this._messageViewElement = $("#messageView");

    this._message = new DataBinding(
      new Message(),
      (this._messageView = new MessageView(this._messageViewElement)),
      "content"
    );

    this._negotiationService = new NegotiationsService();

    this._init();
  }

  _init() {
    this._negotiationService
      .listAll()
      .then((negotiations) =>
        negotiations.forEach((negotiation) =>
          this._listNegotiations.add(negotiation)
        )
      )
      .catch((err) => (this._message.content = err));

    this.importNegotiations();
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();

    new NegotiationsService()
      .add(negotiation)
      .then((message) => {
        this._listNegotiations.add(negotiation);
        this._message.content = message;
        this._clearForm();
        this._messageView.removeMessage();
      })
      .catch((err) => (this._message.content = err));
  }

  delete() {
    this._negotiationService
      .delete()
      .then((message) => {
        this._message.content = message;
        this._listNegotiations.clear();
      })
      .catch((err) => (this._message.content = err));

    this._messageView.removeMessage();
  }

  importNegotiations() {
    this._negotiationService
      .import(this._listNegotiations.negotiations)
      .then((negotiations) => {
        negotiations.forEach((negotiations) =>
          negotiations.forEach((negotiation) => {
            list.add(negotiation);
          })
        );
      });
  }

  _createNegotiation() {
    const negotiation = new Negotiation(
      DateHelper.convertStringToDate(this._data.value),
      Number(this._quantity.value),
      Number(this._value.value)
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
