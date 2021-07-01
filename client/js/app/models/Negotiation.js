class Negotiation {
  _data;
  _value;
  _quantity;

  constructor(data = new Date(), value = 0.0, quantity = 1) {
    this._data = data;
    this._value = value;
    this._quantity = quantity;
  }

  get data() {
    return this._data
  }

  get value() {
    return this._value
  }

  get quantity() {
    return this._quantity
  }

  getVolume(_value, _quantity) {
    return this._value * this._quantity;
  }
}
