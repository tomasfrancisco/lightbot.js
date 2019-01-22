"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightbotAPI = void 0;

var _crossFetch = require("cross-fetch");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LightbotAPI =
/*#__PURE__*/
function () {
  function LightbotAPI(hostURL, agentId) {
    var _this = this;

    _classCallCheck(this, LightbotAPI);

    _defineProperty(this, "postStartConversation",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this.post("/start", {
                lightbot_agent_id: _this.agentId
              });

            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();

            case 6:
              body = _context.sent;

              if (!(body.data && body.data.bot)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", body.data.bot);

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              throw new Error("An error occurred while starting conversation.");

            case 14:
              return _context.abrupt("return", undefined);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 11]]);
    })));

    _defineProperty(this, "post",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(endpoint, body) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _crossFetch.fetch)("".concat(_this.hostURL).concat(endpoint), {
                  body: JSON.stringify(body),
                  headers: {
                    "Content-Type": "application/json"
                  },
                  method: "POST"
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    this.hostURL = hostURL;
    this.agentId = agentId;
  }
  /**
   * Initializes a new bot conversation
   */


  _createClass(LightbotAPI, [{
    key: "getAgentData",

    /**
     * Gets agent data, e.g. theme, logo, etc.
     */
    value: function () {
      var _getAgentData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response, body;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.get("/agent-data?lightbot_agent_id=".concat(this.agentId));

              case 3:
                response = _context3.sent;
                _context3.next = 6;
                return response.json();

              case 6:
                body = _context3.sent;

                if (!body.data) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", body.data);

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw new Error("An error occurred while fetching agent data.");

              case 14:
                return _context3.abrupt("return", undefined);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function getAgentData() {
        return _getAgentData.apply(this, arguments);
      }

      return getAgentData;
    }()
    /**
     * Sends a message and gets a reply back
     * @param message string value the user typed
     */

  }, {
    key: "postMessage",
    value: function () {
      var _postMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(message) {
        var response, body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.post("", {
                  human: message,
                  lightbot_agent_id: this.agentId
                });

              case 3:
                response = _context4.sent;
                _context4.next = 6;
                return response.json();

              case 6:
                body = _context4.sent;

                if (!(body.data && body.data.bot)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", body.data.bot);

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                throw new Error("An error occurred while sending a message.");

              case 14:
                return _context4.abrupt("return", undefined);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function postMessage(_x3) {
        return _postMessage.apply(this, arguments);
      }

      return postMessage;
    }()
    /**
     * Sends a jump id and gets a reply back
     * @param jump id the user selected from jump options
     */

  }, {
    key: "postJump",
    value: function () {
      var _postJump = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(jump) {
        var response, body;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.post("/jump", {
                  jump: jump,
                  lightbot_agent_id: this.agentId
                });

              case 3:
                response = _context5.sent;
                _context5.next = 6;
                return response.json();

              case 6:
                body = _context5.sent;

                if (!(body.data && body.data.bot)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", body.data.bot);

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                throw new Error("An error occured while sending a jump.");

              case 14:
                return _context5.abrupt("return", undefined);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 11]]);
      }));

      function postJump(_x4) {
        return _postJump.apply(this, arguments);
      }

      return postJump;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(endpoint) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _crossFetch.fetch)("".concat(this.hostURL).concat(endpoint));

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function get(_x5) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return LightbotAPI;
}();

exports.LightbotAPI = LightbotAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkudHMiXSwibmFtZXMiOlsiTGlnaHRib3RBUEkiLCJob3N0VVJMIiwiYWdlbnRJZCIsInBvc3QiLCJsaWdodGJvdF9hZ2VudF9pZCIsInJlc3BvbnNlIiwianNvbiIsImJvZHkiLCJkYXRhIiwiYm90IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJlbmRwb2ludCIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwibWV0aG9kIiwiZ2V0IiwibWVzc2FnZSIsImh1bWFuIiwianVtcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUlhQSxXOzs7QUFDWCx1QkFBb0JDLE9BQXBCLEVBQTZDQyxPQUE3QyxFQUE4RDtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBSy9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFSixLQUFJLENBQUNDLElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ3pDQyxnQkFBQUEsaUJBQWlCLEVBQUUsS0FBSSxDQUFDRjtBQURpQixlQUFwQixDQUZJOztBQUFBO0FBRXJCRyxjQUFBQSxRQUZxQjtBQUFBO0FBQUEscUJBS1JBLFFBQVEsQ0FBQ0MsSUFBVCxFQUxROztBQUFBO0FBS3JCQyxjQUFBQSxJQUxxQjs7QUFBQSxvQkFNdkJBLElBQUksQ0FBQ0MsSUFBTCxJQUFhRCxJQUFJLENBQUNDLElBQUwsQ0FBVUMsR0FOQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FPbEJGLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxHQVBROztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFVckIsSUFBSUMsS0FBSixDQUFVLGdEQUFWLENBVnFCOztBQUFBO0FBQUEsK0NBWXRCQyxTQVpzQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUwrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBaUYvQyxrQkFBT0MsUUFBUCxFQUF5QkwsSUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ0EsaUNBQVMsS0FBSSxDQUFDTixPQUFkLFNBQXdCVyxRQUF4QixHQUFvQztBQUMvQ0wsa0JBQUFBLElBQUksRUFBRU0sSUFBSSxDQUFDQyxTQUFMLENBQWVQLElBQWYsQ0FEeUM7QUFFL0NRLGtCQUFBQSxPQUFPLEVBQUU7QUFDUCxvQ0FBZ0I7QUFEVCxtQkFGc0M7QUFLL0NDLGtCQUFBQSxNQUFNLEVBQUU7QUFMdUMsaUJBQXBDLENBREE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQWpGK0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFFO0FBRWhFOzs7Ozs7OztBQWtCQTs7Ozs7Ozs7Ozs7Ozs7dUJBSzJCLEtBQUtDLEdBQUwseUNBQTBDLEtBQUtmLE9BQS9DLEU7OztBQUFqQkcsZ0JBQUFBLFE7O3VCQUVhQSxRQUFRLENBQUNDLElBQVQsRTs7O0FBQWJDLGdCQUFBQSxJOztxQkFDRkEsSUFBSSxDQUFDQyxJOzs7OztrREFDQUQsSUFBSSxDQUFDQyxJOzs7Ozs7Ozs7c0JBR1IsSUFBSUUsS0FBSixDQUFVLDhDQUFWLEM7OztrREFHREMsUzs7Ozs7Ozs7Ozs7Ozs7OztBQUdUOzs7Ozs7Ozs7O2dEQUl5Qk8sTzs7Ozs7Ozs7dUJBRUUsS0FBS2YsSUFBTCxDQUFVLEVBQVYsRUFBYztBQUNuQ2dCLGtCQUFBQSxLQUFLLEVBQUVELE9BRDRCO0FBRW5DZCxrQkFBQUEsaUJBQWlCLEVBQUUsS0FBS0Y7QUFGVyxpQkFBZCxDOzs7QUFBakJHLGdCQUFBQSxROzt1QkFLYUEsUUFBUSxDQUFDQyxJQUFULEU7OztBQUFiQyxnQkFBQUEsSTs7c0JBQ0ZBLElBQUksQ0FBQ0MsSUFBTCxJQUFhRCxJQUFJLENBQUNDLElBQUwsQ0FBVUMsRzs7Ozs7a0RBQ2xCRixJQUFJLENBQUNDLElBQUwsQ0FBVUMsRzs7Ozs7Ozs7O3NCQUdiLElBQUlDLEtBQUosQ0FBVSw0Q0FBVixDOzs7a0RBRURDLFM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHVDs7Ozs7Ozs7OztnREFJc0JTLEk7Ozs7Ozs7O3VCQUVLLEtBQUtqQixJQUFMLENBQVUsT0FBVixFQUFtQjtBQUN4Q2lCLGtCQUFBQSxJQUFJLEVBQUpBLElBRHdDO0FBRXhDaEIsa0JBQUFBLGlCQUFpQixFQUFFLEtBQUtGO0FBRmdCLGlCQUFuQixDOzs7QUFBakJHLGdCQUFBQSxROzt1QkFLYUEsUUFBUSxDQUFDQyxJQUFULEU7OztBQUFiQyxnQkFBQUEsSTs7c0JBQ0ZBLElBQUksQ0FBQ0MsSUFBTCxJQUFhRCxJQUFJLENBQUNDLElBQUwsQ0FBVUMsRzs7Ozs7a0RBQ2xCRixJQUFJLENBQUNDLElBQUwsQ0FBVUMsRzs7Ozs7Ozs7O3NCQUdiLElBQUlDLEtBQUosQ0FBVSx3Q0FBVixDOzs7a0RBR0RDLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFhU0MsUTs7Ozs7O3VCQUNILGlDQUFTLEtBQUtYLE9BQWQsU0FBd0JXLFFBQXhCLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5pbXBvcnQgeyBBUElBZ2VudERhdGEsIEFQSU1lc3NhZ2UgfSBmcm9tIFwiLi9hcGkudHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpZ2h0Ym90QVBJIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0VVJMOiBzdHJpbmcsIHByaXZhdGUgYWdlbnRJZDogc3RyaW5nKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhIG5ldyBib3QgY29udmVyc2F0aW9uXG4gICAqL1xuICBwdWJsaWMgcG9zdFN0YXJ0Q29udmVyc2F0aW9uID0gYXN5bmMgKCk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiL3N0YXJ0XCIsIHtcbiAgICAgICAgbGlnaHRib3RfYWdlbnRfaWQ6IHRoaXMuYWdlbnRJZCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5LmRhdGEgJiYgYm9keS5kYXRhLmJvdCkge1xuICAgICAgICByZXR1cm4gYm9keS5kYXRhLmJvdCBhcyBBUElNZXNzYWdlW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzdGFydGluZyBjb252ZXJzYXRpb24uXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIGFnZW50IGRhdGEsIGUuZy4gdGhlbWUsIGxvZ28sIGV0Yy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBZ2VudERhdGEoKTogUHJvbWlzZTxBUElBZ2VudERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldChgL2FnZW50LWRhdGE/bGlnaHRib3RfYWdlbnRfaWQ9JHt0aGlzLmFnZW50SWR9YCk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhKSB7XG4gICAgICAgIHJldHVybiBib2R5LmRhdGEgYXMgQVBJQWdlbnREYXRhO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgYWdlbnQgZGF0YS5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYW5kIGdldHMgYSByZXBseSBiYWNrXG4gICAqIEBwYXJhbSBtZXNzYWdlIHN0cmluZyB2YWx1ZSB0aGUgdXNlciB0eXBlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiXCIsIHtcbiAgICAgICAgaHVtYW46IG1lc3NhZ2UsXG4gICAgICAgIGxpZ2h0Ym90X2FnZW50X2lkOiB0aGlzLmFnZW50SWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5LmRhdGEgJiYgYm9keS5kYXRhLmJvdCkge1xuICAgICAgICByZXR1cm4gYm9keS5kYXRhLmJvdCBhcyBBUElNZXNzYWdlW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzZW5kaW5nIGEgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBqdW1wIGlkIGFuZCBnZXRzIGEgcmVwbHkgYmFja1xuICAgKiBAcGFyYW0ganVtcCBpZCB0aGUgdXNlciBzZWxlY3RlZCBmcm9tIGp1bXAgb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RKdW1wKGp1bXA6IHN0cmluZyk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiL2p1bXBcIiwge1xuICAgICAgICBqdW1wLFxuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhICYmIGJvZHkuZGF0YS5ib3QpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuZGF0YS5ib3QgYXMgQVBJTWVzc2FnZVtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBzZW5kaW5nIGEganVtcC5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgcG9zdCA9IGFzeW5jIChlbmRwb2ludDogc3RyaW5nLCBib2R5OiBvYmplY3QpID0+IHtcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2goYCR7dGhpcy5ob3N0VVJMfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXQoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgIHJldHVybiBhd2FpdCBmZXRjaChgJHt0aGlzLmhvc3RVUkx9JHtlbmRwb2ludH1gKTtcbiAgfVxufVxuIl19