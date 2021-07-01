class Negotiation {
  constructor(data, value = 0.0, quantity = 1) {
    this._data = new Date(data.getTime()); //cria um novo objeto de date a partir dos miliseconds da data informada pelo usuário
    this._value = value;
    this._quantity = quantity;
    Object.freeze(this);
  }

  get data() {
    return new Date(this._data.getTime()); //dessa forma qualquer alteração feita diretamente na data não vai ser válida pois está sendo criado uma nova referência de data
  }

  get value() {
    return this._value;
  }

  get quantity() {
    return this._quantity;
  }

  get volume() {
    return this._value * this._quantity;
  }
}
