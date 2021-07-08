"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationController = function () {
  function NegotiationController() {
    _classCallCheck(this, NegotiationController);

    var $ = document.querySelector.bind(document);
    this._data = $("#data");
    this._quantity = $("#quantidade");
    this._value = $("#valor");

    this._listNegotiationsViewElement = $("#negotiationsView");

    this._listNegotiations = new DataBinding(new ListNegotiations(), this._listNegotiationsView = new ListNegotiationsView(this._listNegotiationsViewElement), "add", "clear", "order", "reverse");
    this._sortOrder = "";

    this._messageViewElement = $("#messageView");

    this._message = new DataBinding(new Message(), this._messageView = new MessageView(this._messageViewElement), "content");

    this._negotiationService = new NegotiationsService();

    this._init();
  }

  _createClass(NegotiationController, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._negotiationService.listAll().then(function (negotiations) {
        return negotiations.forEach(function (negotiation) {
          return _this._listNegotiations.add(negotiation);
        });
      }).catch(function (err) {
        return _this._message.content = err;
      });

      setTimeout(function () {
        _this.importNegotiations();
      }, 3000);
    }
  }, {
    key: "add",
    value: function add(event) {
      var _this2 = this;

      event.preventDefault();

      var negotiation = this._createNegotiation();

      new NegotiationsService().add(negotiation).then(function (message) {
        _this2._listNegotiations.add(negotiation);
        _this2._message.content = message;
        _this2._clearForm();
        _this2._messageView.removeMessage();
      }).catch(function (err) {
        return _this2._message.content = err;
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this3 = this;

      this._negotiationService.delete().then(function (message) {
        _this3._message.content = message;
        _this3._listNegotiations.clear();
      }).catch(function (err) {
        return _this3._message.content = err;
      });

      this._messageView.removeMessage();
    }
  }, {
    key: "importNegotiations",
    value: function importNegotiations() {
      var _this4 = this;

      this._negotiationService.import(this._listNegotiations.negotiations).then(function (negotiations) {
        negotiations.forEach(function (negotiations) {
          return negotiations.forEach(function (negotiation) {
            _this4._listNegotiations.add(negotiation);
          });
        });
      });
    }
  }, {
    key: "_createNegotiation",
    value: function _createNegotiation() {
      var negotiation = new Negotiation(DateHelper.convertStringToDate(this._data.value), Number(this._quantity.value), Number(this._value.value));

      return negotiation;
    }
  }, {
    key: "_clearForm",
    value: function _clearForm() {
      this._data.value = "";
      this._quantity.value = "";
      this._value.value = "";

      this._data.focus();
    }
  }, {
    key: "order",
    value: function order(event) {
      var value = event.target.textContent.toLowerCase(); //pega o alvo filho do evento e seu valor

      if (this._sortOrder == value) {
        this._listNegotiations.reverse();
      } else {
        if (value == "quantidade") {
          this._listNegotiations.order(function (a, b) {
            return a.quantity - b.quantity;
          });
        } else if (value == "valor") {
          this._listNegotiations.order(function (a, b) {
            return a.value - b.value;
          });
        } else {
          this._listNegotiations.order(function (a, b) {
            return a.data - b.data;
          });
        }
      }

      this._sortOrder = value;
    }
  }]);

  return NegotiationController;
}();
//# sourceMappingURL=NegotiationController.js.map