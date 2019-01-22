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
    var hostURL = _ref.hostURL,
        agentId = _ref.agentId,
        messageListener = _ref.messageListener;

    _classCallCheck(this, LightbotMessenger);

    _defineProperty(this, "stateManager", void 0);

    _defineProperty(this, "apiClient", void 0);

    _defineProperty(this, "messageListener", void 0);

    this.stateManager = new _stateManager.StateManager();
    this.apiClient = new _api.LightbotAPI(hostURL, agentId);

    if (messageListener) {
      this.messageListener = messageListener;
    }
  }
  /**
   * It will set the messenger state as open and initialize conversation
   * in case it's needed.
   */


  _createClass(LightbotMessenger, [{
    key: "toggleMessenger",
    value: function () {
      var _toggleMessenger = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.stateManager.agent.isInitialized) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.initMessenger();

              case 3:
                _context.next = 5;
                return this.stateManager.updateAgent({
                  isInitialized: true
                });

              case 5:
                this.stateManager.updateLayout({
                  isMessengerOpen: !this.stateManager.layout.isMessengerOpen
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggleMessenger() {
        return _toggleMessenger.apply(this, arguments);
      }

      return toggleMessenger;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
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
                return this.apiClient.postJump(message.label);

              case 4:
                messagesResponse = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return this.apiClient.postMessage(message.label);

              case 9:
                messagesResponse = _context2.sent;

              case 10:
                if (messagesResponse) {
                  messages = messagesResponse.map(function (messageResponse) {
                    return _objectSpread({}, messageResponse, {
                      sender: "bot"
                    });
                  });
                  this.stateManager.saveMessages(messages);
                  this.pushUpdate();
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

      function sendMessage(_x) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
    /**
     * Notifies the subscriber with the updated messages
     */

  }, {
    key: "pushUpdate",
    value: function pushUpdate() {
      if (this.messageListener) {
        this.messageListener(this.stateManager.messages);
      }
    }
  }, {
    key: "initMessenger",
    value: function () {
      var _initMessenger = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var messagesResponse, messages;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.apiClient.postStartConversation();

              case 3:
                messagesResponse = _context3.sent;

                if (messagesResponse) {
                  messages = messagesResponse.map(function (message) {
                    return _objectSpread({}, message, {
                      sender: "bot"
                    });
                  });
                  this.stateManager.saveMessages(messages);
                  this.pushUpdate();
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
      }));

      function initMessenger() {
        return _initMessenger.apply(this, arguments);
      }

      return initMessenger;
    }()
  }, {
    key: "isOpen",
    get: function get() {
      return this.stateManager.layout.isMessengerOpen;
    }
  }]);

  return LightbotMessenger;
}();

exports.LightbotMessenger = LightbotMessenger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTGlnaHRib3RNZXNzZW5nZXIiLCJob3N0VVJMIiwiYWdlbnRJZCIsIm1lc3NhZ2VMaXN0ZW5lciIsInN0YXRlTWFuYWdlciIsIlN0YXRlTWFuYWdlciIsImFwaUNsaWVudCIsIkxpZ2h0Ym90QVBJIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwiaW5pdE1lc3NlbmdlciIsInVwZGF0ZUFnZW50IiwidXBkYXRlTGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwibGF5b3V0IiwibWVzc2FnZSIsInR5cGUiLCJwb3N0SnVtcCIsImxhYmVsIiwibWVzc2FnZXNSZXNwb25zZSIsInBvc3RNZXNzYWdlIiwibWVzc2FnZXMiLCJtYXAiLCJtZXNzYWdlUmVzcG9uc2UiLCJzZW5kZXIiLCJzYXZlTWVzc2FnZXMiLCJwdXNoVXBkYXRlIiwiRXJyb3IiLCJwb3N0U3RhcnRDb252ZXJzYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQWNhQSxpQjs7O0FBS1gsbUNBQTJFO0FBQUEsUUFBN0RDLE9BQTZELFFBQTdEQSxPQUE2RDtBQUFBLFFBQXBEQyxPQUFvRCxRQUFwREEsT0FBb0Q7QUFBQSxRQUEzQ0MsZUFBMkMsUUFBM0NBLGVBQTJDOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN6RSxTQUFLQyxZQUFMLEdBQW9CLElBQUlDLDBCQUFKLEVBQXBCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFJQyxnQkFBSixDQUFnQk4sT0FBaEIsRUFBeUJDLE9BQXpCLENBQWpCOztBQUNBLFFBQUlDLGVBQUosRUFBcUI7QUFDbkIsV0FBS0EsZUFBTCxHQUF1QkEsZUFBdkI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBS08sS0FBS0MsWUFBTCxDQUFrQkksS0FBbEIsQ0FBd0JDLGE7Ozs7Ozt1QkFDckIsS0FBS0MsYUFBTCxFOzs7O3VCQUNBLEtBQUtOLFlBQUwsQ0FBa0JPLFdBQWxCLENBQThCO0FBQUVGLGtCQUFBQSxhQUFhLEVBQUU7QUFBakIsaUJBQTlCLEM7OztBQUdSLHFCQUFLTCxZQUFMLENBQWtCUSxZQUFsQixDQUErQjtBQUM3QkMsa0JBQUFBLGVBQWUsRUFBRSxDQUFDLEtBQUtULFlBQUwsQ0FBa0JVLE1BQWxCLENBQXlCRDtBQURkLGlCQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQVN1QkUsTzs7Ozs7Ozs7c0JBR2pCQSxPQUFPLENBQUNDLElBQVIsS0FBaUIsTTs7Ozs7O3VCQUNNLEtBQUtWLFNBQUwsQ0FBZVcsUUFBZixDQUF3QkYsT0FBTyxDQUFDRyxLQUFoQyxDOzs7QUFBekJDLGdCQUFBQSxnQjs7Ozs7O3VCQUV5QixLQUFLYixTQUFMLENBQWVjLFdBQWYsQ0FBMkJMLE9BQU8sQ0FBQ0csS0FBbkMsQzs7O0FBQXpCQyxnQkFBQUEsZ0I7OztBQUVGLG9CQUFJQSxnQkFBSixFQUFzQjtBQUNkRSxrQkFBQUEsUUFEYyxHQUNRRixnQkFBZ0IsQ0FBQ0csR0FBakIsQ0FBOEIsVUFBQUMsZUFBZTtBQUFBLDZDQUNwRUEsZUFEb0U7QUFFdkVDLHNCQUFBQSxNQUFNLEVBQUU7QUFGK0Q7QUFBQSxtQkFBN0MsQ0FEUjtBQU1wQix1QkFBS3BCLFlBQUwsQ0FBa0JxQixZQUFsQixDQUErQkosUUFBL0I7QUFFQSx1QkFBS0ssVUFBTDtBQUNEOzs7Ozs7OztzQkFFSyxJQUFJQyxLQUFKLENBQVUsc0NBQVYsQzs7Ozs7Ozs7Ozs7Ozs7OztBQUlWOzs7Ozs7aUNBR3FCO0FBQ25CLFVBQUksS0FBS3hCLGVBQVQsRUFBMEI7QUFDeEIsYUFBS0EsZUFBTCxDQUFxQixLQUFLQyxZQUFMLENBQWtCaUIsUUFBdkM7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozt1QkFJa0MsS0FBS2YsU0FBTCxDQUFlc0IscUJBQWYsRTs7O0FBQXpCVCxnQkFBQUEsZ0I7O0FBQ04sb0JBQUlBLGdCQUFKLEVBQXNCO0FBQ2RFLGtCQUFBQSxRQURjLEdBQ1FGLGdCQUFnQixDQUFDRyxHQUFqQixDQUE4QixVQUFBUCxPQUFPO0FBQUEsNkNBQzVEQSxPQUQ0RDtBQUUvRFMsc0JBQUFBLE1BQU0sRUFBRTtBQUZ1RDtBQUFBLG1CQUFyQyxDQURSO0FBTXBCLHVCQUFLcEIsWUFBTCxDQUFrQnFCLFlBQWxCLENBQStCSixRQUEvQjtBQUVBLHVCQUFLSyxVQUFMO0FBQ0Q7Ozs7Ozs7O3NCQUVLLElBQUlDLEtBQUosQ0FBVSwyQ0FBVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBbERVO0FBQ2xCLGFBQU8sS0FBS3ZCLFlBQUwsQ0FBa0JVLE1BQWxCLENBQXlCRCxlQUFoQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlnaHRib3RBUEkgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IEFQSU1lc3NhZ2UgfSBmcm9tIFwiLi9hcGkudHlwZXNcIjtcbmltcG9ydCB7IFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3N0YXRlLW1hbmFnZXJcIjtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZSA9IEFQSU1lc3NhZ2UgJiB7XG4gIHNlbmRlcjogXCJodW1hblwiIHwgXCJib3RcIiB8IFwic3VwcG9ydGVyXCI7XG59O1xuXG50eXBlIE1lc3NhZ2VMaXN0ZW5lckhhbmRsZXIgPSAobWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBMaWdodGJvdE1lc3NlbmdlclByb3BzIHtcbiAgaG9zdFVSTDogc3RyaW5nO1xuICBhZ2VudElkOiBzdHJpbmc7XG4gIG1lc3NhZ2VMaXN0ZW5lcj86IE1lc3NhZ2VMaXN0ZW5lckhhbmRsZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBMaWdodGJvdE1lc3NlbmdlciB7XG4gIHByaXZhdGUgc3RhdGVNYW5hZ2VyOiBTdGF0ZU1hbmFnZXI7XG4gIHByaXZhdGUgYXBpQ2xpZW50OiBMaWdodGJvdEFQSTtcbiAgcHJpdmF0ZSBtZXNzYWdlTGlzdGVuZXI/OiBNZXNzYWdlTGlzdGVuZXJIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHsgaG9zdFVSTCwgYWdlbnRJZCwgbWVzc2FnZUxpc3RlbmVyIH06IExpZ2h0Ym90TWVzc2VuZ2VyUHJvcHMpIHtcbiAgICB0aGlzLnN0YXRlTWFuYWdlciA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcbiAgICB0aGlzLmFwaUNsaWVudCA9IG5ldyBMaWdodGJvdEFQSShob3N0VVJMLCBhZ2VudElkKTtcbiAgICBpZiAobWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ZW5lciA9IG1lc3NhZ2VMaXN0ZW5lcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXQgd2lsbCBzZXQgdGhlIG1lc3NlbmdlciBzdGF0ZSBhcyBvcGVuIGFuZCBpbml0aWFsaXplIGNvbnZlcnNhdGlvblxuICAgKiBpbiBjYXNlIGl0J3MgbmVlZGVkLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHRvZ2dsZU1lc3NlbmdlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGVNYW5hZ2VyLmFnZW50LmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdE1lc3NlbmdlcigpO1xuICAgICAgYXdhaXQgdGhpcy5zdGF0ZU1hbmFnZXIudXBkYXRlQWdlbnQoeyBpc0luaXRpYWxpemVkOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnVwZGF0ZUxheW91dCh7XG4gICAgICBpc01lc3Nlbmdlck9wZW46ICF0aGlzLnN0YXRlTWFuYWdlci5sYXlvdXQuaXNNZXNzZW5nZXJPcGVuLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVNYW5hZ2VyLmxheW91dC5pc01lc3Nlbmdlck9wZW47XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZXNSZXNwb25zZTogQVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJqdW1wXCIpIHtcbiAgICAgICAgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RKdW1wKG1lc3NhZ2UubGFiZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RNZXNzYWdlKG1lc3NhZ2UubGFiZWwpO1xuICAgICAgfVxuICAgICAgaWYgKG1lc3NhZ2VzUmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IG1lc3NhZ2VzUmVzcG9uc2UubWFwPE1lc3NhZ2U+KG1lc3NhZ2VSZXNwb25zZSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2VSZXNwb25zZSxcbiAgICAgICAgICBzZW5kZXI6IFwiYm90XCIsXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlci5zYXZlTWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgIHRoaXMucHVzaFVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgc2VuZGluZyBhIG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGUgc3Vic2NyaWJlciB3aXRoIHRoZSB1cGRhdGVkIG1lc3NhZ2VzXG4gICAqL1xuICBwcml2YXRlIHB1c2hVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ZW5lcih0aGlzLnN0YXRlTWFuYWdlci5tZXNzYWdlcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbml0TWVzc2VuZ2VyKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDbGllbnQucG9zdFN0YXJ0Q29udmVyc2F0aW9uKCk7XG4gICAgICBpZiAobWVzc2FnZXNSZXNwb25zZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlczogTWVzc2FnZVtdID0gbWVzc2FnZXNSZXNwb25zZS5tYXA8TWVzc2FnZT4obWVzc2FnZSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgc2VuZGVyOiBcImJvdFwiLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuc2F2ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnB1c2hVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIGluaXRpYWxpemluZyBtZXNzZW5nZXIuXCIpO1xuICAgIH1cbiAgfVxufVxuIl19