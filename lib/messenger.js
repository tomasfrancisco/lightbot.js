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
                  messages = messagesResponse.map(function (message) {
                    return _objectSpread({}, message, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzZW5nZXIudHMiXSwibmFtZXMiOlsiTGlnaHRib3RNZXNzZW5nZXIiLCJob3N0VVJMIiwiYWdlbnRJZCIsIm1lc3NhZ2VMaXN0ZW5lciIsInN0YXRlTWFuYWdlciIsIlN0YXRlTWFuYWdlciIsImFwaUNsaWVudCIsIkxpZ2h0Ym90QVBJIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwiaW5pdE1lc3NlbmdlciIsInVwZGF0ZUFnZW50IiwidXBkYXRlTGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwibGF5b3V0IiwibWVzc2FnZSIsInR5cGUiLCJwb3N0SnVtcCIsImxhYmVsIiwibWVzc2FnZXNSZXNwb25zZSIsInBvc3RNZXNzYWdlIiwibWVzc2FnZXMiLCJtYXAiLCJzZW5kZXIiLCJzYXZlTWVzc2FnZXMiLCJwdXNoVXBkYXRlIiwiRXJyb3IiLCJwb3N0U3RhcnRDb252ZXJzYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQWVhQSxpQjs7O0FBS1gsbUNBQTJFO0FBQUEsUUFBN0RDLE9BQTZELFFBQTdEQSxPQUE2RDtBQUFBLFFBQXBEQyxPQUFvRCxRQUFwREEsT0FBb0Q7QUFBQSxRQUEzQ0MsZUFBMkMsUUFBM0NBLGVBQTJDOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN6RSxTQUFLQyxZQUFMLEdBQW9CLElBQUlDLDBCQUFKLEVBQXBCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFJQyxnQkFBSixDQUFnQk4sT0FBaEIsRUFBeUJDLE9BQXpCLENBQWpCOztBQUNBLFFBQUlDLGVBQUosRUFBcUI7QUFDbkIsV0FBS0EsZUFBTCxHQUF1QkEsZUFBdkI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBS08sS0FBS0MsWUFBTCxDQUFrQkksS0FBbEIsQ0FBd0JDLGE7Ozs7Ozt1QkFDckIsS0FBS0MsYUFBTCxFOzs7O3VCQUNBLEtBQUtOLFlBQUwsQ0FBa0JPLFdBQWxCLENBQThCO0FBQUVGLGtCQUFBQSxhQUFhLEVBQUU7QUFBakIsaUJBQTlCLEM7OztBQUdSLHFCQUFLTCxZQUFMLENBQWtCUSxZQUFsQixDQUErQjtBQUM3QkMsa0JBQUFBLGVBQWUsRUFBRSxDQUFDLEtBQUtULFlBQUwsQ0FBa0JVLE1BQWxCLENBQXlCRDtBQURkLGlCQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQVN1QkUsTzs7Ozs7Ozs7c0JBR2pCQSxPQUFPLENBQUNDLElBQVIsS0FBaUIsTTs7Ozs7O3VCQUNNLEtBQUtWLFNBQUwsQ0FBZVcsUUFBZixDQUF3QkYsT0FBTyxDQUFDRyxLQUFoQyxDOzs7QUFBekJDLGdCQUFBQSxnQjs7Ozs7O3VCQUV5QixLQUFLYixTQUFMLENBQWVjLFdBQWYsQ0FBMkJMLE9BQU8sQ0FBQ0csS0FBbkMsQzs7O0FBQXpCQyxnQkFBQUEsZ0I7OztBQUVGLG9CQUFJQSxnQkFBSixFQUFzQjtBQUNkRSxrQkFBQUEsUUFEYyxHQUNRRixnQkFBZ0IsQ0FBQ0csR0FBakIsQ0FBOEIsVUFBQVAsT0FBTztBQUFBLDZDQUM1REEsT0FENEQ7QUFFL0RRLHNCQUFBQSxNQUFNLEVBQUU7QUFGdUQ7QUFBQSxtQkFBckMsQ0FEUjtBQU1wQix1QkFBS25CLFlBQUwsQ0FBa0JvQixZQUFsQixDQUErQkgsUUFBL0I7QUFFQSx1QkFBS0ksVUFBTDtBQUNEOzs7Ozs7OztzQkFFSyxJQUFJQyxLQUFKLENBQVUsc0NBQVYsQzs7Ozs7Ozs7Ozs7Ozs7OztBQUlWOzs7Ozs7aUNBR3FCO0FBQ25CLFVBQUksS0FBS3ZCLGVBQVQsRUFBMEI7QUFDeEIsYUFBS0EsZUFBTCxDQUFxQixLQUFLQyxZQUFMLENBQWtCaUIsUUFBdkM7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozt1QkFJa0MsS0FBS2YsU0FBTCxDQUFlcUIscUJBQWYsRTs7O0FBQXpCUixnQkFBQUEsZ0I7O0FBQ04sb0JBQUlBLGdCQUFKLEVBQXNCO0FBQ2RFLGtCQUFBQSxRQURjLEdBQ1FGLGdCQUFnQixDQUFDRyxHQUFqQixDQUE4QixVQUFBUCxPQUFPO0FBQUEsNkNBQzVEQSxPQUQ0RDtBQUUvRFEsc0JBQUFBLE1BQU0sRUFBRTtBQUZ1RDtBQUFBLG1CQUFyQyxDQURSO0FBTXBCLHVCQUFLbkIsWUFBTCxDQUFrQm9CLFlBQWxCLENBQStCSCxRQUEvQjtBQUVBLHVCQUFLSSxVQUFMO0FBQ0Q7Ozs7Ozs7O3NCQUVLLElBQUlDLEtBQUosQ0FBVSwyQ0FBVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBbERVO0FBQ2xCLGFBQU8sS0FBS3RCLFlBQUwsQ0FBa0JVLE1BQWxCLENBQXlCRCxlQUFoQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlnaHRib3RBUEkgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3N0YXRlLW1hbmFnZXJcIjtcbmltcG9ydCB7IEFQSU1lc3NhZ2UgfSBmcm9tIFwiLi9hcGkudHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZSA9IEFQSU1lc3NhZ2UgJiB7XG4gIHNlbmRlcjogXCJodW1hblwiIHwgXCJib3RcIiB8IFwic3VwcG9ydGVyXCI7XG59O1xuXG50eXBlIE1lc3NhZ2VMaXN0ZW5lckhhbmRsZXIgPSAobWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIExpZ2h0Ym90TWVzc2VuZ2VyUHJvcHMge1xuICBob3N0VVJMOiBzdHJpbmc7XG4gIGFnZW50SWQ6IHN0cmluZztcbiAgbWVzc2FnZUxpc3RlbmVyPzogTWVzc2FnZUxpc3RlbmVySGFuZGxlcjtcbn1cblxuZXhwb3J0IGNsYXNzIExpZ2h0Ym90TWVzc2VuZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0ZU1hbmFnZXI6IFN0YXRlTWFuYWdlcjtcbiAgcHJpdmF0ZSBhcGlDbGllbnQ6IExpZ2h0Ym90QVBJO1xuICBwcml2YXRlIG1lc3NhZ2VMaXN0ZW5lcj86IE1lc3NhZ2VMaXN0ZW5lckhhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoeyBob3N0VVJMLCBhZ2VudElkLCBtZXNzYWdlTGlzdGVuZXIgfTogTGlnaHRib3RNZXNzZW5nZXJQcm9wcykge1xuICAgIHRoaXMuc3RhdGVNYW5hZ2VyID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IExpZ2h0Ym90QVBJKGhvc3RVUkwsIGFnZW50SWQpO1xuICAgIGlmIChtZXNzYWdlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3RlbmVyID0gbWVzc2FnZUxpc3RlbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdCB3aWxsIHNldCB0aGUgbWVzc2VuZ2VyIHN0YXRlIGFzIG9wZW4gYW5kIGluaXRpYWxpemUgY29udmVyc2F0aW9uXG4gICAqIGluIGNhc2UgaXQncyBuZWVkZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdG9nZ2xlTWVzc2VuZ2VyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5zdGF0ZU1hbmFnZXIuYWdlbnQuaXNJbml0aWFsaXplZCkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0TWVzc2VuZ2VyKCk7XG4gICAgICBhd2FpdCB0aGlzLnN0YXRlTWFuYWdlci51cGRhdGVBZ2VudCh7IGlzSW5pdGlhbGl6ZWQ6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZU1hbmFnZXIudXBkYXRlTGF5b3V0KHtcbiAgICAgIGlzTWVzc2VuZ2VyT3BlbjogIXRoaXMuc3RhdGVNYW5hZ2VyLmxheW91dC5pc01lc3Nlbmdlck9wZW4sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZU1hbmFnZXIubGF5b3V0LmlzTWVzc2VuZ2VyT3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBtZXNzYWdlc1Jlc3BvbnNlOiBBUElNZXNzYWdlW10gfCB1bmRlZmluZWQ7XG4gICAgICBpZiAobWVzc2FnZS50eXBlID09PSBcImp1bXBcIikge1xuICAgICAgICBtZXNzYWdlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDbGllbnQucG9zdEp1bXAobWVzc2FnZS5sYWJlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDbGllbnQucG9zdE1lc3NhZ2UobWVzc2FnZS5sYWJlbCk7XG4gICAgICB9XG4gICAgICBpZiAobWVzc2FnZXNSZXNwb25zZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlczogTWVzc2FnZVtdID0gbWVzc2FnZXNSZXNwb25zZS5tYXA8TWVzc2FnZT4obWVzc2FnZSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgc2VuZGVyOiBcImJvdFwiLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuc2F2ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnB1c2hVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHNlbmRpbmcgYSBtZXNzYWdlLlwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTm90aWZpZXMgdGhlIHN1YnNjcmliZXIgd2l0aCB0aGUgdXBkYXRlZCBtZXNzYWdlc1xuICAgKi9cbiAgcHJpdmF0ZSBwdXNoVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2VMaXN0ZW5lcikge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdGVuZXIodGhpcy5zdGF0ZU1hbmFnZXIubWVzc2FnZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5pdE1lc3NlbmdlcigpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZXNSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50LnBvc3RTdGFydENvbnZlcnNhdGlvbigpO1xuICAgICAgaWYgKG1lc3NhZ2VzUmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IG1lc3NhZ2VzUmVzcG9uc2UubWFwPE1lc3NhZ2U+KG1lc3NhZ2UgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICAgIHNlbmRlcjogXCJib3RcIixcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnNhdmVNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpcy5wdXNoVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCBpbml0aWFsaXppbmcgbWVzc2VuZ2VyLlwiKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==