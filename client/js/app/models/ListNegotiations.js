class ListNegotiations {
  constructor() {
    this._negotiations = [];
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
  }

  clear() {
    this._negotiations = [];
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }
}
