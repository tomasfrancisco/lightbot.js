"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightbotMessenger = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _api = require("./api");

var _stateManager = require("./state-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LightbotMessenger =
/*#__PURE__*/
function () {
  function LightbotMessenger(_ref) {
    var _this = this;

    var hostURL = _ref.hostURL,
        agentId = _ref.agentId,
        onChange = _ref.onChange;

    _classCallCheck(this, LightbotMessenger);

    _defineProperty(this, "toggleMessenger",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var isInitialized;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.stateManager.agent.isInitialized) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return _this.initMessenger();

            case 3:
              isInitialized = _context.sent;
              _context.next = 6;
              return _this.stateManager.updateAgent({
                isInitialized: isInitialized
              });

            case 6:
              _this.stateManager.updateLayout({
                isMessengerOpen: !_this.stateManager.layout.isMessengerOpen
              });

              _this.pushUpdate();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    _defineProperty(this, "sendMessage",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(message) {
        var messagesResponse, messages;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.stateManager.saveMessages([message], _this.pushUpdate);

                _context2.prev = 1;

                if (!(message.type === "jump")) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 5;
                return _this.apiClient.postJump(message.label);

              case 5:
                messagesResponse = _context2.sent;
                _context2.next = 11;
                break;

              case 8:
                _context2.next = 10;
                return _this.apiClient.postMessage(message.label);

              case 10:
                messagesResponse = _context2.sent;

              case 11:
                if (messagesResponse) {
                  messages = messagesResponse.map(function (messageResponse) {
                    return _objectSpread({}, messageResponse, {
                      sender: "bot"
                    });
                  });

                  _this.stateManager.saveMessages(messages, _this.pushUpdate);
                }

                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);

                _this.stateManager.popMessage(_this.pushUpdate);

                throw new Error("An error occurred sending a message.");

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "pushUpdate", function () {
      if (_this.onChange) {
        setTimeout(_this.onChange, 0);
      }
    });

    _defineProperty(this, "initMessenger",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var messagesResponse, messages, agentData;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _this.apiClient.postStartConversation();

            case 3:
              messagesResponse = _context3.sent;

              if (messagesResponse) {
                messages = messagesResponse.map(function (message) {
                  return _objectSpread({}, message, {
                    sender: "bot"
                  });
                });

                _this.stateManager.saveMessages(messages, _this.pushUpdate);
              }

              _context3.next = 7;
              return _this.apiClient.getAgentData();

            case 7:
              agentData = _context3.sent;

              if (agentData && _typeof(agentData) === "object") {
                _this.stateManager.updateAgent(agentData);
              }

              return _context3.abrupt("return", true);

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              console.warn("An error occurred initializing messenger.");

            case 15:
              return _context3.abrupt("return", false);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 12]]);
    })));

    this.stateManager = new _stateManager.StateManager();
    this.apiClient = new _api.LightbotAPI(hostURL, agentId, (0, _v.default)(), (0, _v.default)());

    if (onChange) {
      this.onChange = onChange;
    }
  }
  /**
   * It will set the messenger state as open and initialize conversation
   * in case it's needed.
   */


  _createClass(LightbotMessenger, [{
    key: "isOpen",
    get: function get() {
      return this.stateManager.layout.isMessengerOpen;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.stateManager.messages;
    }
  }]);

  return LightbotMessenger;
}();

exports.LightbotMessenger = LightbotMessenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWdodGJvdC1qcy9tZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTGlnaHRib3RNZXNzZW5nZXIiLCJob3N0VVJMIiwiYWdlbnRJZCIsIm9uQ2hhbmdlIiwic3RhdGVNYW5hZ2VyIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwiaW5pdE1lc3NlbmdlciIsInVwZGF0ZUFnZW50IiwidXBkYXRlTGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwibGF5b3V0IiwicHVzaFVwZGF0ZSIsIm1lc3NhZ2UiLCJzYXZlTWVzc2FnZXMiLCJ0eXBlIiwiYXBpQ2xpZW50IiwicG9zdEp1bXAiLCJsYWJlbCIsIm1lc3NhZ2VzUmVzcG9uc2UiLCJwb3N0TWVzc2FnZSIsIm1lc3NhZ2VzIiwibWFwIiwibWVzc2FnZVJlc3BvbnNlIiwic2VuZGVyIiwicG9wTWVzc2FnZSIsIkVycm9yIiwic2V0VGltZW91dCIsInBvc3RTdGFydENvbnZlcnNhdGlvbiIsImdldEFnZW50RGF0YSIsImFnZW50RGF0YSIsImNvbnNvbGUiLCJ3YXJuIiwiU3RhdGVNYW5hZ2VyIiwiTGlnaHRib3RBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjYUEsaUI7OztBQUtYLG1DQUFvRTtBQUFBOztBQUFBLFFBQXREQyxPQUFzRCxRQUF0REEsT0FBc0Q7QUFBQSxRQUE3Q0MsT0FBNkMsUUFBN0NBLE9BQTZDO0FBQUEsUUFBcENDLFFBQW9DLFFBQXBDQSxRQUFvQzs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQVkzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDbEIsS0FBSSxDQUFDQyxZQUFMLENBQWtCQyxLQUFsQixDQUF3QkMsYUFETjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUVPLEtBQUksQ0FBQ0MsYUFBTCxFQUZQOztBQUFBO0FBRWZELGNBQUFBLGFBRmU7QUFBQTtBQUFBLHFC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LENBQUMxQixZQUFMLENBQWtCSSxXQUFsQixDQUE4QnNCLFNBQTlCO0FBQ0Q7O0FBZm1CLGdEQWlCYixJQWpCYTs7QUFBQTtBQUFBO0FBQUE7QUFtQnBCQyxjQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSwyQ0FBYjs7QUFuQm9CO0FBQUEsZ0RBcUJmLEtBckJlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBckU0Qzs7QUFDbEUsU0FBSzVCLFlBQUwsR0FBb0IsSUFBSTZCLDBCQUFKLEVBQXBCO0FBQ0EsU0FBS2pCLFNBQUwsR0FBaUIsSUFBSWtCLGdCQUFKLENBQWdCakMsT0FBaEIsRUFBeUJDLE9BQXpCLEVBQWtDLGlCQUFsQyxFQUEwQyxpQkFBMUMsQ0FBakI7O0FBQ0EsUUFBSUMsUUFBSixFQUFjO0FBQ1osV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7O3dCQWlCb0I7QUFDbEIsYUFBTyxLQUFLQyxZQUFMLENBQWtCTyxNQUFsQixDQUF5QkQsZUFBaEM7QUFDRDs7O3dCQUVxQjtBQUNwQixhQUFPLEtBQUtOLFlBQUwsQ0FBa0JpQixRQUF6QjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSBcInV1aWQvdjRcIjtcblxuaW1wb3J0IHsgTGlnaHRib3RBUEkgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IEFQSU1lc3NhZ2UgfSBmcm9tIFwiLi9hcGkudHlwZXNcIjtcbmltcG9ydCB7IFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3N0YXRlLW1hbmFnZXJcIjtcblxuZXhwb3J0IHR5cGUgTGlnaHRib3RNZXNzYWdlID0gQVBJTWVzc2FnZSAmIHtcbiAgc2VuZGVyOiBcImh1bWFuXCIgfCBcImJvdFwiIHwgXCJzdXBwb3J0ZXJcIjtcbn07XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZUxpc3RlbmVySGFuZGxlciA9ICgpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlnaHRib3RNZXNzZW5nZXJQcm9wcyB7XG4gIGhvc3RVUkw6IHN0cmluZztcbiAgYWdlbnRJZDogc3RyaW5nO1xuICBvbkNoYW5nZT86IFVwZGF0ZUxpc3RlbmVySGFuZGxlcjtcbn1cblxuZXhwb3J0IGNsYXNzIExpZ2h0Ym90TWVzc2VuZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0ZU1hbmFnZXI6IFN0YXRlTWFuYWdlcjtcbiAgcHJpdmF0ZSBhcGlDbGllbnQ6IExpZ2h0Ym90QVBJO1xuICBwcml2YXRlIG9uQ2hhbmdlPzogVXBkYXRlTGlzdGVuZXJIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHsgaG9zdFVSTCwgYWdlbnRJZCwgb25DaGFuZ2UgfTogTGlnaHRib3RNZXNzZW5nZXJQcm9wcykge1xuICAgIHRoaXMuc3RhdGVNYW5hZ2VyID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IExpZ2h0Ym90QVBJKGhvc3RVUkwsIGFnZW50SWQsIHV1aWQoKSwgdXVpZCgpKTtcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UgPSBvbkNoYW5nZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXQgd2lsbCBzZXQgdGhlIG1lc3NlbmdlciBzdGF0ZSBhcyBvcGVuIGFuZCBpbml0aWFsaXplIGNvbnZlcnNhdGlvblxuICAgKiBpbiBjYXNlIGl0J3MgbmVlZGVkLlxuICAgKi9cbiAgcHVibGljIHRvZ2dsZU1lc3NlbmdlciA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGVNYW5hZ2VyLmFnZW50LmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSBhd2FpdCB0aGlzLmluaXRNZXNzZW5nZXIoKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RhdGVNYW5hZ2VyLnVwZGF0ZUFnZW50KHsgaXNJbml0aWFsaXplZCB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlTWFuYWdlci51cGRhdGVMYXlvdXQoe1xuICAgICAgaXNNZXNzZW5nZXJPcGVuOiAhdGhpcy5zdGF0ZU1hbmFnZXIubGF5b3V0LmlzTWVzc2VuZ2VyT3BlbixcbiAgICB9KTtcblxuICAgIHRoaXMucHVzaFVwZGF0ZSgpO1xuICB9O1xuXG4gIHB1YmxpYyBnZXQgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5sYXlvdXQuaXNNZXNzZW5nZXJPcGVuO1xuICB9XG5cbiAgcHVibGljIGdldCBtZXNzYWdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZU1hbmFnZXIubWVzc2FnZXM7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZTogTGlnaHRib3RNZXNzYWdlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdGhpcy5zdGF0ZU1hbmFnZXIuc2F2ZU1lc3NhZ2VzKFttZXNzYWdlXSwgdGhpcy5wdXNoVXBkYXRlKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZXNSZXNwb25zZTogQVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJqdW1wXCIpIHtcbiAgICAgICAgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RKdW1wKG1lc3NhZ2UubGFiZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RNZXNzYWdlKG1lc3NhZ2UubGFiZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVzc2FnZXNSZXNwb25zZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlczogTGlnaHRib3RNZXNzYWdlW10gPSBtZXNzYWdlc1Jlc3BvbnNlLm1hcDxMaWdodGJvdE1lc3NhZ2U+KFxuICAgICAgICAgIG1lc3NhZ2VSZXNwb25zZSA9PiAoe1xuICAgICAgICAgICAgLi4ubWVzc2FnZVJlc3BvbnNlLFxuICAgICAgICAgICAgc2VuZGVyOiBcImJvdFwiLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnNhdmVNZXNzYWdlcyhtZXNzYWdlcywgdGhpcy5wdXNoVXBkYXRlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBvcE1lc3NhZ2UodGhpcy5wdXNoVXBkYXRlKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHNlbmRpbmcgYSBtZXNzYWdlLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSBzdWJzY3JpYmVyIHdpdGggdGhlIHVwZGF0ZWQgbWVzc2FnZXNcbiAgICovXG4gIHByaXZhdGUgcHVzaFVwZGF0ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgc2V0VGltZW91dCh0aGlzLm9uQ2hhbmdlLCAwKTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBpbml0TWVzc2VuZ2VyID0gYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDbGllbnQucG9zdFN0YXJ0Q29udmVyc2F0aW9uKCk7XG4gICAgICBpZiAobWVzc2FnZXNSZXNwb25zZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlczogTGlnaHRib3RNZXNzYWdlW10gPSBtZXNzYWdlc1Jlc3BvbnNlLm1hcDxMaWdodGJvdE1lc3NhZ2U+KG1lc3NhZ2UgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICAgIHNlbmRlcjogXCJib3RcIixcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnNhdmVNZXNzYWdlcyhtZXNzYWdlcywgdGhpcy5wdXNoVXBkYXRlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWdlbnREYXRhID0gYXdhaXQgdGhpcy5hcGlDbGllbnQuZ2V0QWdlbnREYXRhKCk7XG4gICAgICBpZiAoYWdlbnREYXRhICYmIHR5cGVvZiBhZ2VudERhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIudXBkYXRlQWdlbnQoYWdlbnREYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJBbiBlcnJvciBvY2N1cnJlZCBpbml0aWFsaXppbmcgbWVzc2VuZ2VyLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuIl19