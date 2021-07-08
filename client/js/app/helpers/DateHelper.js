"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
  function DateHelper() {
    _classCallCheck(this, DateHelper);

    throw new Error("Date helper is not instancied");
  }

  _createClass(DateHelper, null, [{
    key: "convertStringToDate",
    value: function convertStringToDate(date) {
      var convertedDate = new Date(date.split("-"));
      return convertedDate;
    }
  }, {
    key: "convertDateToString",
    value: function convertDateToString(date) {
      var regex = /^[a-z]* [a-z]* \d{2} \d{4}/gi;
      if (!regex.test(date)) {
        throw new Error("Data inválida, informe no padrão yyyy-MM-dd");
      }

      var getDay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var getMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

      var getFullDateInBrFormat = getDay + "/" + getMonth + "/" + date.getFullYear();
      return getFullDateInBrFormat;
    }
  }]);

  return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map