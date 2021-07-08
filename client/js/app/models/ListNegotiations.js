"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListNegotiations = function () {
  function ListNegotiations() {
    _classCallCheck(this, ListNegotiations);

    this._negotiations = [];
  }

  _createClass(ListNegotiations, [{
    key: "add",
    value: function add(negotiation) {
      this._negotiations.push(negotiation);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._negotiations = [];
    }
  }, {
    key: "order",
    value: function order(criteria) {
      this._negotiations.sort(criteria);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      this._negotiations.reverse();
    }
  }, {
    key: "negotiations",
    get: function get() {
      return [].concat(this._negotiations);
    }
  }, {
    key: "totalVolume",
    get: function get() {
      return this._negotiations.reduce(function (total, negotation) {
        return total += negotation.volume;
      }, 0);
    }
  }]);

  return ListNegotiations;
}();
//# sourceMappingURL=ListNegotiations.js.map