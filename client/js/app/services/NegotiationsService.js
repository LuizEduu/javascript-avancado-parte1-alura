"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationsService = function () {
  function NegotiationsService() {
    _classCallCheck(this, NegotiationsService);

    this._httpService = new HttpService();
  }

  _createClass(NegotiationsService, [{
    key: "getNegotiationsWeek",
    value: function getNegotiationsWeek() {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "negociacoes/semana");

        // funcão vai ser chamada toda vez que o estado do xhr mudar
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText).map(function (negotiation) {
              return new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor);
            }));
          } else if (xhr.readyState == 4 && xhr.status == 400) {
            console.log(xhr.responseText);
            reject("Não foi possível importar as negociações");
          }
        };

        xhr.send();
      });
    }
  }, {
    key: "getNegotiationsLastWeek",
    value: function getNegotiationsLastWeek() {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "negociacoes/anterior");

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText).map(function (negotiation) {
              return new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor);
            }));
          } else if (xhr.readyState == 4 && xhr.status == 400) {
            reject("Não foi possível obter as negociações da semana retrasada");
          }
        };

        xhr.send();
      });
    }
  }, {
    key: "getNegotiationsDelayedWeek",
    value: function getNegotiationsDelayedWeek() {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "negociacoes/retrasada");

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText).map(function (negotiation) {
              return new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor);
            }));
          } else if (xhr.readyState == 4 && xhr.status == 400) {
            reject("Não foi possível obter as negociações da semana retrasada");
          }
        };

        xhr.send();
      });
    }
  }, {
    key: "getAllNegotiations",
    value: function getAllNegotiations() {
      return Promise.all([this.getNegotiationsWeek(), this.getNegotiationsLastWeek(), this.getNegotiationsDelayedWeek()]).then().catch(function (err) {
        return err;
      });
    }
  }, {
    key: "add",
    value: function add(negotiation) {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.add(negotiation);
      }).then(function () {
        return "Negociação adicionada com sucesso";
      }).catch(function () {
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: "listAll",
    value: function listAll() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.listNegotiations();
      }).catch(function () {
        throw new Error("Não foi possível listar as negociações");
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.deleteAllNegotiations();
      }).catch(function () {
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }, {
    key: "import",
    value: function _import(list) {
      return this.getAllNegotiations().then(function (negotiations) {
        return negotiations.filter(function (negotiations) {
          return !list.some(function (existsNegotiation) {
            return JSON.stringify(existsNegotiation) == JSON.stringify(negotiations);
          });
        });
      }).catch(function () {
        return "Não foi possível importar as negociações";
      });
    }
  }]);

  return NegotiationsService;
}();
//# sourceMappingURL=NegotiationsService.js.map