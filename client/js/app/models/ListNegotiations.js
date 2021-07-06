class ListNegotiations {
  constructor() {
    this._negotiations = [];
  }

  add(negotiation) {
    console.log(negotiation)
    this._negotiations.push(negotiation);
  }

  clear() {
    this._negotiations = [];
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }
}
