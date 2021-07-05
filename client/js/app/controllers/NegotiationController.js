class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");
    
    this.listNegotiations = new ListNegotiations();
    this.listNegotiationsViewElement = $("#negotiationsView");
    this.listNegotiationsView = new ListNegotiationsView(this.listNegotiationsViewElement);
    this.listNegotiationsView.update(this.listNegotiations);
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();

    this.listNegotiations.add(negotiation);
    this.listNegotiationsView.update(this.listNegotiations);

    this._clearForm();
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
