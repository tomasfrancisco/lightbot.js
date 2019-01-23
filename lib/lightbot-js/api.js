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
  function LightbotAPI(hostURL, agentId, sessionId, userId) {
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
                lightbot_agent_id: _this.agentId,
                session_id: _this.sessionId
              });

            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();

            case 6:
              body = _context.sent;

              if (!(body && body.bot)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", body.bot);

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
    this.sessionId = sessionId;
    this.userId = userId;
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

                if (!body) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", body);

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
                  lightbot_agent_id: this.agentId,
                  session_id: this.sessionId,
                  user_id: this.userId
                });

              case 3:
                response = _context4.sent;
                _context4.next = 6;
                return response.json();

              case 6:
                body = _context4.sent;

                if (!(body && body.bot)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", body.bot);

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
                  lightbot_agent_id: this.agentId,
                  session_id: this.sessionId,
                  user_id: this.userId
                });

              case 3:
                response = _context5.sent;
                _context5.next = 6;
                return response.json();

              case 6:
                body = _context5.sent;

                if (!(body && body.bot)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", body.bot);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWdodGJvdC1qcy9hcGkudHMiXSwibmFtZXMiOlsiTGlnaHRib3RBUEkiLCJob3N0VVJMIiwiYWdlbnRJZCIsInNlc3Npb25JZCIsInVzZXJJZCIsInBvc3QiLCJsaWdodGJvdF9hZ2VudF9pZCIsInNlc3Npb25faWQiLCJyZXNwb25zZSIsImpzb24iLCJib2R5IiwiYm90IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJlbmRwb2ludCIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwibWV0aG9kIiwiZ2V0IiwibWVzc2FnZSIsImh1bWFuIiwidXNlcl9pZCIsImp1bXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFJYUEsVzs7O0FBQ1gsdUJBQ1VDLE9BRFYsRUFFVUMsT0FGVixFQUdVQyxTQUhWLEVBSVVDLE1BSlYsRUFLRTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBSzZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFSixLQUFJLENBQUNDLElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ3pDQyxnQkFBQUEsaUJBQWlCLEVBQUUsS0FBSSxDQUFDSixPQURpQjtBQUV6Q0ssZ0JBQUFBLFVBQVUsRUFBRSxLQUFJLENBQUNKO0FBRndCLGVBQXBCLENBRkk7O0FBQUE7QUFFckJLLGNBQUFBLFFBRnFCO0FBQUE7QUFBQSxxQkFNUkEsUUFBUSxDQUFDQyxJQUFULEVBTlE7O0FBQUE7QUFNckJDLGNBQUFBLElBTnFCOztBQUFBLG9CQU92QkEsSUFBSSxJQUFJQSxJQUFJLENBQUNDLEdBUFU7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBUWxCRCxJQUFJLENBQUNDLEdBUmE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQVdyQixJQUFJQyxLQUFKLENBQVUsZ0RBQVYsQ0FYcUI7O0FBQUE7QUFBQSwrQ0FhdEJDLFNBYnNCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTDdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFzRmEsa0JBQU9DLFFBQVAsRUFBeUJKLElBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNBLGlDQUFTLEtBQUksQ0FBQ1QsT0FBZCxTQUF3QmEsUUFBeEIsR0FBb0M7QUFDL0NKLGtCQUFBQSxJQUFJLEVBQUVLLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixJQUFmLENBRHlDO0FBRS9DTyxrQkFBQUEsT0FBTyxFQUFFO0FBQ1Asb0NBQWdCO0FBRFQsbUJBRnNDO0FBSy9DQyxrQkFBQUEsTUFBTSxFQUFFO0FBTHVDLGlCQUFwQyxDQURBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0F0RmI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBRTtBQUVKOzs7Ozs7OztBQW1CQTs7Ozs7Ozs7Ozs7Ozs7dUJBSzJCLEtBQUtDLEdBQUwseUNBQTBDLEtBQUtqQixPQUEvQyxFOzs7QUFBakJNLGdCQUFBQSxROzt1QkFFYUEsUUFBUSxDQUFDQyxJQUFULEU7OztBQUFiQyxnQkFBQUEsSTs7cUJBQ0ZBLEk7Ozs7O2tEQUNLQSxJOzs7Ozs7Ozs7c0JBR0gsSUFBSUUsS0FBSixDQUFVLDhDQUFWLEM7OztrREFHREMsUzs7Ozs7Ozs7Ozs7Ozs7OztBQUdUOzs7Ozs7Ozs7O2dEQUl5Qk8sTzs7Ozs7Ozs7dUJBRUUsS0FBS2YsSUFBTCxDQUFVLEVBQVYsRUFBYztBQUNuQ2dCLGtCQUFBQSxLQUFLLEVBQUVELE9BRDRCO0FBRW5DZCxrQkFBQUEsaUJBQWlCLEVBQUUsS0FBS0osT0FGVztBQUduQ0ssa0JBQUFBLFVBQVUsRUFBRSxLQUFLSixTQUhrQjtBQUluQ21CLGtCQUFBQSxPQUFPLEVBQUUsS0FBS2xCO0FBSnFCLGlCQUFkLEM7OztBQUFqQkksZ0JBQUFBLFE7O3VCQU9hQSxRQUFRLENBQUNDLElBQVQsRTs7O0FBQWJDLGdCQUFBQSxJOztzQkFDRkEsSUFBSSxJQUFJQSxJQUFJLENBQUNDLEc7Ozs7O2tEQUNSRCxJQUFJLENBQUNDLEc7Ozs7Ozs7OztzQkFHUixJQUFJQyxLQUFKLENBQVUsNENBQVYsQzs7O2tEQUVEQyxTOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Q7Ozs7Ozs7Ozs7Z0RBSXNCVSxJOzs7Ozs7Ozt1QkFFSyxLQUFLbEIsSUFBTCxDQUFVLE9BQVYsRUFBbUI7QUFDeENrQixrQkFBQUEsSUFBSSxFQUFKQSxJQUR3QztBQUV4Q2pCLGtCQUFBQSxpQkFBaUIsRUFBRSxLQUFLSixPQUZnQjtBQUd4Q0ssa0JBQUFBLFVBQVUsRUFBRSxLQUFLSixTQUh1QjtBQUl4Q21CLGtCQUFBQSxPQUFPLEVBQUUsS0FBS2xCO0FBSjBCLGlCQUFuQixDOzs7QUFBakJJLGdCQUFBQSxROzt1QkFPYUEsUUFBUSxDQUFDQyxJQUFULEU7OztBQUFiQyxnQkFBQUEsSTs7c0JBQ0ZBLElBQUksSUFBSUEsSUFBSSxDQUFDQyxHOzs7OztrREFDUkQsSUFBSSxDQUFDQyxHOzs7Ozs7Ozs7c0JBR1IsSUFBSUMsS0FBSixDQUFVLHdDQUFWLEM7OztrREFHREMsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQWFTQyxROzs7Ozs7dUJBQ0gsaUNBQVMsS0FBS2IsT0FBZCxTQUF3QmEsUUFBeEIsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZldGNoIH0gZnJvbSBcImNyb3NzLWZldGNoXCI7XG5cbmltcG9ydCB7IEFQSUFnZW50RGF0YSwgQVBJTWVzc2FnZSB9IGZyb20gXCIuL2FwaS50eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlnaHRib3RBUEkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhvc3RVUkw6IHN0cmluZyxcbiAgICBwcml2YXRlIGFnZW50SWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIHNlc3Npb25JZDogc3RyaW5nLFxuICAgIHByaXZhdGUgdXNlcklkOiBzdHJpbmcsXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgYSBuZXcgYm90IGNvbnZlcnNhdGlvblxuICAgKi9cbiAgcHVibGljIHBvc3RTdGFydENvbnZlcnNhdGlvbiA9IGFzeW5jICgpOiBQcm9taXNlPEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdChcIi9zdGFydFwiLCB7XG4gICAgICAgIGxpZ2h0Ym90X2FnZW50X2lkOiB0aGlzLmFnZW50SWQsXG4gICAgICAgIHNlc3Npb25faWQ6IHRoaXMuc2Vzc2lvbklkLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKGJvZHkgJiYgYm9keS5ib3QpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuYm90IGFzIEFQSU1lc3NhZ2VbXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHN0YXJ0aW5nIGNvbnZlcnNhdGlvbi5cIik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgYWdlbnQgZGF0YSwgZS5nLiB0aGVtZSwgbG9nbywgZXRjLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEFnZW50RGF0YSgpOiBQcm9taXNlPEFQSUFnZW50RGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KGAvYWdlbnQtZGF0YT9saWdodGJvdF9hZ2VudF9pZD0ke3RoaXMuYWdlbnRJZH1gKTtcblxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5KSB7XG4gICAgICAgIHJldHVybiBib2R5IGFzIEFQSUFnZW50RGF0YTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIGFnZW50IGRhdGEuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGFuZCBnZXRzIGEgcmVwbHkgYmFja1xuICAgKiBAcGFyYW0gbWVzc2FnZSBzdHJpbmcgdmFsdWUgdGhlIHVzZXIgdHlwZWRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdChcIlwiLCB7XG4gICAgICAgIGh1bWFuOiBtZXNzYWdlLFxuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgICBzZXNzaW9uX2lkOiB0aGlzLnNlc3Npb25JZCxcbiAgICAgICAgdXNlcl9pZDogdGhpcy51c2VySWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5ICYmIGJvZHkuYm90KSB7XG4gICAgICAgIHJldHVybiBib2R5LmJvdCBhcyBBUElNZXNzYWdlW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzZW5kaW5nIGEgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBqdW1wIGlkIGFuZCBnZXRzIGEgcmVwbHkgYmFja1xuICAgKiBAcGFyYW0ganVtcCBpZCB0aGUgdXNlciBzZWxlY3RlZCBmcm9tIGp1bXAgb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RKdW1wKGp1bXA6IHN0cmluZyk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiL2p1bXBcIiwge1xuICAgICAgICBqdW1wLFxuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgICBzZXNzaW9uX2lkOiB0aGlzLnNlc3Npb25JZCxcbiAgICAgICAgdXNlcl9pZDogdGhpcy51c2VySWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5ICYmIGJvZHkuYm90KSB7XG4gICAgICAgIHJldHVybiBib2R5LmJvdCBhcyBBUElNZXNzYWdlW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHNlbmRpbmcgYSBqdW1wLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0ID0gYXN5bmMgKGVuZHBvaW50OiBzdHJpbmcsIGJvZHk6IG9iamVjdCkgPT4ge1xuICAgIHJldHVybiBhd2FpdCBmZXRjaChgJHt0aGlzLmhvc3RVUkx9JHtlbmRwb2ludH1gLCB7XG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIGFzeW5jIGdldChlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKGAke3RoaXMuaG9zdFVSTH0ke2VuZHBvaW50fWApO1xuICB9XG59XG4iXX0=