"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negotiation = function () {
  function Negotiation(data) {
    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;

    _classCallCheck(this, Negotiation);

    this._data = new Date(data.getTime()); //cria um novo objeto de date a partir dos miliseconds da data informada pelo usuário
    this._quantity = quantity;
    this._value = value;
    Object.freeze(this);
  }

  _createClass(Negotiation, [{
    key: "data",
    get: function get() {
      return new Date(this._data.getTime()); //dessa forma qualquer alteração feita diretamente na data não vai ser válida pois está sendo criado uma nova referência de data
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    }
  }, {
    key: "quantity",
    get: function get() {
      return this._quantity;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._value * this._quantity;
    }
  }]);

  return Negotiation;
}();
//# sourceMappingURL=Negotiation.js.map