class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");
  }

  add(event) {
    event.preventDefault();

    const negotiation = new Negotiation(
      DateHelper.convertStringToDate(data.value),
      this._quantity.value,
      this._value.value
    );

    const convertedDateToBrFormat = DateHelper.convertedDateToString(
      negotiation.data
    );

    console.log(convertedDateToBrFormat);
  }
}
