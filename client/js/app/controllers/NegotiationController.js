class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");
  }

  add(event) {
    event.preventDefault();

    const convertedDate = convertDate(data.value);
    const negotiation = new Negotiation(
      convertedDate,
      this._quantity.value,
      this._value.value
    );

    console.log(negotiation.data);
  }
}
