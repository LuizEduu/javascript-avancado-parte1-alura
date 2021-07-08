"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
  function ProxyFactory() {
    _classCallCheck(this, ProxyFactory);
  }

  _createClass(ProxyFactory, null, [{
    key: "create",
    value: function create(model, props, action) {

      return new Proxy(model, {
        get: function get(target, prop, reciever) {

          if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
            return function () {
              //se for retorna uma nova function aplicando as traps
              Reflect.apply(target[prop], target, arguments); //aplica a trap na função especifica, passando o arguments que contem todos os argumentos passados a função
              return action(target);
            };
          }

          return Reflect.get(target, prop, reciever); //se não for uma função só pega a propriedade
        },
        set: function set(target, prop, value, reciever) {
          var result = Reflect.set(target, prop, value, reciever);
          if (props.includes(prop)) {
            action(target);
          }

          return result;
        }
      });
    }
  }, {
    key: "_isFunction",
    value: function _isFunction(fn) {
      return (typeof fn === "undefined" ? "undefined" : _typeof(fn)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function)); //verifica se é uma function
    }
  }]);

  return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map