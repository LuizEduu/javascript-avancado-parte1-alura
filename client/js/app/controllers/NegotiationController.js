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

    ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDao(connection))
      .then((dao) => dao.listNegotiations())
      .then((negotiations) =>
        negotiations.forEach((negotiation) =>
          this._listNegotiations.add(negotiation)
        )
      )
      .catch((err) => (this._message.content = "err"));
  }

  add(event) {
    event.preventDefault();

    ConnectionFactory.getConnection()
      .then((connection) => {
        const negotiation = this._createNegotiation();

        new NegotiationDao(connection).add(negotiation).then(() => {
          this._listNegotiations.add(negotiation);
          this._message.content = "Negociação adicionada com sucesso";
          this._clearForm();
          this._messageView.removeMessage();
        });
      })
      .catch((err) => {
        console.log(err);
        this._message.content = "Não foi possível adicionar a negociação";
        this._messageView.removeMessage();
      });
  }

  delete() {
    ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDao(connection))
      .then((dao) => dao.deleteAllNegotiations())
      .then((message) => {
        this._message.content = message;
        this._listNegotiations.clear();
      })
      .catch((error) => console.log(error));

    this._listNegotiations.clear();

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
