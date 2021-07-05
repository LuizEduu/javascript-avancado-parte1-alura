class ListNegotiations {
  constructor(callback) {
    this._negotiations = [];
    this._callback = callback;
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
    //negotiationController.listNegotiationsView.update(listNegotiations)
    this._callback(this);
  }

  clear() {
    this._negotiations = [];
    this._callback(this);
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }
}
