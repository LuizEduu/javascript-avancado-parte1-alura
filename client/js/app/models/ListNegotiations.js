class ListNegotiations {
  constructor(context, callback) {
    this._negotiations = [];
    this._callback = callback;
    this._context = context;
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
    //this.callback(this);

    Reflect.apply(this._callback, this._context, [this]);
  }

  clear() {
    this._negotiations = [];
    //this.callback(this);

    Reflect.apply(this._callback, this._context, [this]);
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }
}
