"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    _classCallCheck(this, Message);

    this._content = content;
  }

  _createClass(Message, [{
    key: "content",
    get: function get() {
      return this._content;
    },
    set: function set(content) {
      this._content = content;
    }
  }]);

  return Message;
}();
//# sourceMappingURL=Message.js.map