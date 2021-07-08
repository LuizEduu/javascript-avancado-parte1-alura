"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListNegotiationsView = function (_View) {
  _inherits(ListNegotiationsView, _View);

  function ListNegotiationsView(element) {
    _classCallCheck(this, ListNegotiationsView);

    return _possibleConstructorReturn(this, (ListNegotiationsView.__proto__ || Object.getPrototypeOf(ListNegotiationsView)).call(this, element));
  }

  _createClass(ListNegotiationsView, [{
    key: "template",
    value: function template(model) {
      return "\n    <table class=\"table table-hover table-bordered\">\n    <thead>\n      <tr onclick=\"negotiationController.order(event)\">\n        <th>DATA</th>\n        <th>QUANTIDADE</th>\n        <th>VALOR</th>\n        <th>VOLUME</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      " + model.negotiations.map(function (negotiation) {
        return "\n            <tr>\n            <td>" + DateHelper.convertDateToString(negotiation.data) + "</td>\n            <td>" + negotiation.quantity + "</td>\n            <td>" + negotiation.value + "</td>\n            <td>" + negotiation.volume + "</td>\n            </tr>\n          ";
      }).join("") + "\n    </tbody>\n\n    <tfoot>\n          <td colspan=\"3\"></td>\n          <td>\n            " + model.totalVolume + "\n          </td>\n    </tfoot>\n  </table>\n    ";
    }
  }]);

  return ListNegotiationsView;
}(View);
//# sourceMappingURL=ListNegotiationsView.js.map