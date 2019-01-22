"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightbotMessenger = void 0;

var _api = require("./api");

var _stateManager = require("./state-manager");

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
        messageListener = _ref.updateListener;

    _classCallCheck(this, LightbotMessenger);

    _defineProperty(this, "toggleMessenger",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.stateManager.agent.isInitialized) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return _this.initMessenger();

            case 3:
              _context.next = 5;
              return _this.stateManager.updateAgent({
                isInitialized: true
              });

            case 5:
              _this.stateManager.updateLayout({
                isMessengerOpen: !_this.stateManager.layout.isMessengerOpen
              });

              _this.pushUpdate();

            case 7:
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
                _context2.prev = 0;

                if (!(message.type === "jump")) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return _this.apiClient.postJump(message.label);

              case 4:
                messagesResponse = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return _this.apiClient.postMessage(message.label);

              case 9:
                messagesResponse = _context2.sent;

              case 10:
                if (messagesResponse) {
                  messages = messagesResponse.map(function (messageResponse) {
                    return _objectSpread({}, messageResponse, {
                      sender: "bot"
                    });
                  });

                  _this.stateManager.saveMessages(messages);

                  _this.pushUpdate();
                }

                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                throw new Error("An error occurred sending a message.");

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "initMessenger",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var messagesResponse, messages;
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

                _this.stateManager.saveMessages(messages);

                _this.pushUpdate();
              }

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw new Error("An error occurred initializing messenger.");

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 7]]);
    })));

    this.stateManager = new _stateManager.StateManager();
    this.apiClient = new _api.LightbotAPI(hostURL, agentId);

    if (messageListener) {
      this.updateListener = messageListener;
    }
  }
  /**
   * It will set the messenger state as open and initialize conversation
   * in case it's needed.
   */


  _createClass(LightbotMessenger, [{
    key: "pushUpdate",

    /**
     * Notifies the subscriber with the updated messages
     */
    value: function pushUpdate() {
      if (this.updateListener) {
        this.updateListener();
      }
    }
  }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTGlnaHRib3RNZXNzZW5nZXIiLCJob3N0VVJMIiwiYWdlbnRJZCIsIm1lc3NhZ2VMaXN0ZW5lciIsInVwZGF0ZUxpc3RlbmVyIiwic3RhdGVNYW5hZ2VyIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwiaW5pdE1lc3NlbmdlciIsInVwZGF0ZUFnZW50IiwidXBkYXRlTGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwibGF5b3V0IiwicHVzaFVwZGF0ZSIsIm1lc3NhZ2UiLCJ0eXBlIiwiYXBpQ2xpZW50IiwicG9zdEp1bXAiLCJsYWJlbCIsIm1lc3NhZ2VzUmVzcG9uc2UiLCJwb3N0TWVzc2FnZSIsIm1lc3NhZ2VzIiwibWFwIiwibWVzc2FnZVJlc3BvbnNlIiwic2VuZGVyIiwic2F2ZU1lc3NhZ2VzIiwiRXJyb3IiLCJwb3N0U3RhcnRDb252ZXJzYXRpb24iLCJTdGF0ZU1hbmFnZXIiLCJMaWdodGJvdEFQSSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0lBY2FBLGlCOzs7QUFLWCxtQ0FBMkY7QUFBQTs7QUFBQSxRQUE3RUMsT0FBNkUsUUFBN0VBLE9BQTZFO0FBQUEsUUFBcEVDLE9BQW9FLFFBQXBFQSxPQUFvRTtBQUFBLFFBQTNDQyxlQUEyQyxRQUEzREMsY0FBMkQ7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFZbEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNsQixLQUFJLENBQUNDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQXdCQyxhQUROO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBRWYsS0FBSSxDQUFDQyxhQUFMLEVBRmU7O0FBQUE7QUFBQTtBQUFBLHFCQUdmLEtBQUksQ0FBQ0gsWUFBTCxDQUFrQkksV0FBbEIsQ0FBOEI7QUFBRUYsZ0JBQUFBLGFBQWEsRUFBRTtBQUFqQixlQUE5QixDQUhlOztBQUFBO0FBTXZCLGNB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Z2h0Ym90QVBJIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBBUElNZXNzYWdlIH0gZnJvbSBcIi4vYXBpLnR5cGVzXCI7XG5pbXBvcnQgeyBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi9zdGF0ZS1tYW5hZ2VyXCI7XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2UgPSBBUElNZXNzYWdlICYge1xuICBzZW5kZXI6IFwiaHVtYW5cIiB8IFwiYm90XCIgfCBcInN1cHBvcnRlclwiO1xufTtcblxuZXhwb3J0IHR5cGUgVXBkYXRlTGlzdGVuZXJIYW5kbGVyID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBMaWdodGJvdE1lc3NlbmdlclByb3BzIHtcbiAgaG9zdFVSTDogc3RyaW5nO1xuICBhZ2VudElkOiBzdHJpbmc7XG4gIHVwZGF0ZUxpc3RlbmVyPzogVXBkYXRlTGlzdGVuZXJIYW5kbGVyO1xufVxuXG5leHBvcnQgY2xhc3MgTGlnaHRib3RNZXNzZW5nZXIge1xuICBwcml2YXRlIHN0YXRlTWFuYWdlcjogU3RhdGVNYW5hZ2VyO1xuICBwcml2YXRlIGFwaUNsaWVudDogTGlnaHRib3RBUEk7XG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXI/OiBVcGRhdGVMaXN0ZW5lckhhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoeyBob3N0VVJMLCBhZ2VudElkLCB1cGRhdGVMaXN0ZW5lcjogbWVzc2FnZUxpc3RlbmVyIH06IExpZ2h0Ym90TWVzc2VuZ2VyUHJvcHMpIHtcbiAgICB0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcbiAgICB0aGlzLmFwaUNsaWVudCA9IG5ldyBMaWdodGJvdEFQSShob3N0VVJMLCBhZ2VudElkKTtcbiAgICBpZiAobWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVyID0gbWVzc2FnZUxpc3RlbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdCB3aWxsIHNldCB0aGUgbWVzc2VuZ2VyIHN0YXRlIGFzIG9wZW4gYW5kIGluaXRpYWxpemUgY29udmVyc2F0aW9uXG4gICAqIGluIGNhc2UgaXQncyBuZWVkZWQuXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlTWVzc2VuZ2VyID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZU1hbmFnZXIuYWdlbnQuaXNJbml0aWFsaXplZCkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0TWVzc2VuZ2VyKCk7XG4gICAgICBhd2FpdCB0aGlzLnN0YXRlTWFuYWdlci51cGRhdGVBZ2VudCh7IGlzSW5pdGlhbGl6ZWQ6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZU1hbmFnZXIudXBkYXRlTGF5b3V0KHtcbiAgICAgIGlzTWVzc2VuZ2VyT3BlbjogIXRoaXMuc3RhdGVNYW5hZ2VyLmxheW91dC5pc01lc3Nlbmdlck9wZW4sXG4gICAgfSk7XG5cbiAgICB0aGlzLnB1c2hVcGRhdGUoKTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0IGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZU1hbmFnZXIubGF5b3V0LmlzTWVzc2VuZ2VyT3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVNYW5hZ2VyLm1lc3NhZ2VzO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2VzUmVzcG9uc2U6IEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZDtcbiAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwianVtcFwiKSB7XG4gICAgICAgIG1lc3NhZ2VzUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaUNsaWVudC5wb3N0SnVtcChtZXNzYWdlLmxhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2VzUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaUNsaWVudC5wb3N0TWVzc2FnZShtZXNzYWdlLmxhYmVsKTtcbiAgICAgIH1cbiAgICAgIGlmIChtZXNzYWdlc1Jlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBtZXNzYWdlc1Jlc3BvbnNlLm1hcDxNZXNzYWdlPihtZXNzYWdlUmVzcG9uc2UgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlUmVzcG9uc2UsXG4gICAgICAgICAgc2VuZGVyOiBcImJvdFwiLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuc2F2ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnB1c2hVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHNlbmRpbmcgYSBtZXNzYWdlLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSBzdWJzY3JpYmVyIHdpdGggdGhlIHVwZGF0ZWQgbWVzc2FnZXNcbiAgICovXG4gIHByaXZhdGUgcHVzaFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy51cGRhdGVMaXN0ZW5lcikge1xuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdE1lc3NlbmdlciA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RTdGFydENvbnZlcnNhdGlvbigpO1xuICAgICAgaWYgKG1lc3NhZ2VzUmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IG1lc3NhZ2VzUmVzcG9uc2UubWFwPE1lc3NhZ2U+KG1lc3NhZ2UgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICAgIHNlbmRlcjogXCJib3RcIixcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnNhdmVNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpcy5wdXNoVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCBpbml0aWFsaXppbmcgbWVzc2VuZ2VyLlwiKTtcbiAgICB9XG4gIH07XG59XG4iXX0=