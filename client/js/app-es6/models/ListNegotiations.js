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

  get totalVolume() {
    return this._negotiations.reduce(
      (total, negotation) => (total += negotation.volume),
      0
    );
  }

  order(criteria) {
    this._negotiations.sort(criteria);
  }

  reverse() {
    this._negotiations.reverse();
  }
}
