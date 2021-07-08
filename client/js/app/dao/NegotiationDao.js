"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationDao = function () {
  function NegotiationDao(connection) {
    _classCallCheck(this, NegotiationDao);

    this._connection = connection;
    this._store = "negotiations";
  }

  _createClass(NegotiationDao, [{
    key: "add",
    value: function add(negotiation) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negotiation);

        request.onsuccess = function (event) {
          resolve();
        };

        request.onerror = function (event) {
          console.log(event.target.error);
          reject("Não foi possível adicionar a negociação");
        };
      });
    }
  }, {
    key: "listNegotiations",
    value: function listNegotiations() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var cursor = _this2._connection.transaction([_this2._store], "readonly").objectStore(_this2._store).openCursor();

        var negotiations = [];

        cursor.onsuccess = function (event) {
          var pointer = event.target.result;

          if (pointer) {
            var data = pointer.value;

            negotiations.push(new Negotiation(new Date(data._data), data._quantity, data._value));

            pointer.continue();
          } else {
            resolve(negotiations);
          }
        };

        cursor.onerror = function (event) {
          console.log(event.target.error);
          reject("Não foi possível listar as negociações");
        };
      });
    }
  }, {
    key: "deleteAllNegotiations",
    value: function deleteAllNegotiations() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();

        request.onsuccess = function (event) {
          return resolve("Negociações removidas com sucesso");
        };
        request.onerror = function (event) {
          console.log(event.target.error);
          reject("Não foi possível apagar as negociações");
        };
      });
    }
  }]);

  return NegotiationDao;
}();
//# sourceMappingURL=NegotiationDao.js.map