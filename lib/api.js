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

var LightbotAPI =
/*#__PURE__*/
function () {
  function LightbotAPI(hostURL, agentId) {
    _classCallCheck(this, LightbotAPI);
  }
  /**
   * Initializes a new bot conversation
   */


  _createClass(LightbotAPI, [{
    key: "postStartConversation",
    value: function () {
      var _postStartConversation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.post("/start", {
                  lightbot_agent_id: this.agentId
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
      }));

      function postStartConversation() {
        return _postStartConversation.apply(this, arguments);
      }

      return postStartConversation;
    }()
    /**
     * Gets agent data, e.g. theme, logo, etc.
     */

  }, {
    key: "getAgentData",
    value: function () {
      var _getAgentData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var response, body;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.get("/agent-data?lightbot_agent_id=".concat(this.agentId));

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();

              case 6:
                body = _context2.sent;

                if (!body.data) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", body.data);

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                throw new Error("An error occurred while fetching agent data.");

              case 14:
                return _context2.abrupt("return", undefined);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
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
      regeneratorRuntime.mark(function _callee3(message) {
        var response, body;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.post("", {
                  human: message,
                  lightbot_agent_id: this.agentId
                });

              case 3:
                response = _context3.sent;
                _context3.next = 6;
                return response.json();

              case 6:
                body = _context3.sent;

                if (!(body.data && body.data.bot)) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", body.data.bot);

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw new Error("An error occurred while sending a message.");

              case 14:
                return _context3.abrupt("return", undefined);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function postMessage(_x) {
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
      regeneratorRuntime.mark(function _callee4(jump) {
        var response, body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.post("/jump", {
                  jump: jump,
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
                throw new Error("An error occured while sending a jump.");

              case 14:
                return _context4.abrupt("return", undefined);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function postJump(_x2) {
        return _postJump.apply(this, arguments);
      }

      return postJump;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(endpoint, body) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _crossFetch.fetch)("".concat(this.hostURL).concat(endpoint), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(body)
                });

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function post(_x3, _x4) {
        return _post.apply(this, arguments);
      }

      return post;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkudHMiXSwibmFtZXMiOlsiTGlnaHRib3RBUEkiLCJob3N0VVJMIiwiYWdlbnRJZCIsInBvc3QiLCJsaWdodGJvdF9hZ2VudF9pZCIsInJlc3BvbnNlIiwianNvbiIsImJvZHkiLCJkYXRhIiwiYm90IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJnZXQiLCJtZXNzYWdlIiwiaHVtYW4iLCJqdW1wIiwiZW5kcG9pbnQiLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFHYUEsVzs7O0FBQ1gsdUJBQW9CQyxPQUFwQixFQUE2Q0MsT0FBN0MsRUFBOEQ7QUFBQTtBQUFFO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSzJCLEtBQUtDLElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ3pDQyxrQkFBQUEsaUJBQWlCLEVBQUUsS0FBS0Y7QUFEaUIsaUJBQXBCLEM7OztBQUFqQkcsZ0JBQUFBLFE7O3VCQUdhQSxRQUFRLENBQUNDLElBQVQsRTs7O0FBQWJDLGdCQUFBQSxJOztzQkFDRkEsSUFBSSxDQUFDQyxJQUFMLElBQWFELElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxHOzs7OztpREFDbEJGLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxHOzs7Ozs7Ozs7c0JBR2IsSUFBSUMsS0FBSixDQUFVLGdEQUFWLEM7OztpREFFREMsUzs7Ozs7Ozs7Ozs7Ozs7OztBQUdUOzs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFLMkIsS0FBS0MsR0FBTCx5Q0FBMEMsS0FBS1YsT0FBL0MsRTs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBRWFBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3FCQUNGQSxJQUFJLENBQUNDLEk7Ozs7O2tEQUNBRCxJQUFJLENBQUNDLEk7Ozs7Ozs7OztzQkFHUixJQUFJRSxLQUFKLENBQVUsOENBQVYsQzs7O2tEQUdEQyxTOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Q7Ozs7Ozs7Ozs7Z0RBSXlCRSxPOzs7Ozs7Ozt1QkFFRSxLQUFLVixJQUFMLENBQVUsRUFBVixFQUFjO0FBQ25DVyxrQkFBQUEsS0FBSyxFQUFFRCxPQUQ0QjtBQUVuQ1Qsa0JBQUFBLGlCQUFpQixFQUFFLEtBQUtGO0FBRlcsaUJBQWQsQzs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBS2FBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3NCQUNGQSxJQUFJLENBQUNDLElBQUwsSUFBYUQsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7O2tEQUNsQkYsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7Ozs7OztzQkFHYixJQUFJQyxLQUFKLENBQVUsNENBQVYsQzs7O2tEQUVEQyxTOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Q7Ozs7Ozs7Ozs7Z0RBSXNCSSxJOzs7Ozs7Ozt1QkFFSyxLQUFLWixJQUFMLENBQVUsT0FBVixFQUFtQjtBQUN4Q1ksa0JBQUFBLElBQUksRUFBSkEsSUFEd0M7QUFFeENYLGtCQUFBQSxpQkFBaUIsRUFBRSxLQUFLRjtBQUZnQixpQkFBbkIsQzs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBS2FBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3NCQUNGQSxJQUFJLENBQUNDLElBQUwsSUFBYUQsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7O2tEQUNsQkYsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7Ozs7OztzQkFHYixJQUFJQyxLQUFKLENBQVUsd0NBQVYsQzs7O2tEQUdEQyxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBR1VLLFEsRUFBa0JULEk7Ozs7Ozt1QkFDdEIsaUNBQVMsS0FBS04sT0FBZCxTQUF3QmUsUUFBeEIsR0FBb0M7QUFDL0NDLGtCQUFBQSxNQUFNLEVBQUUsTUFEdUM7QUFFL0NDLGtCQUFBQSxPQUFPLEVBQUU7QUFDUCxvQ0FBZ0I7QUFEVCxtQkFGc0M7QUFLL0NYLGtCQUFBQSxJQUFJLEVBQUVZLElBQUksQ0FBQ0MsU0FBTCxDQUFlYixJQUFmO0FBTHlDLGlCQUFwQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBU0dTLFE7Ozs7Ozt1QkFDSCxpQ0FBUyxLQUFLZixPQUFkLFNBQXdCZSxRQUF4QixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcbmltcG9ydCB7IEFQSU1lc3NhZ2UsIEFQSUFnZW50RGF0YSB9IGZyb20gXCIuL2FwaS50eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlnaHRib3RBUEkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhvc3RVUkw6IHN0cmluZywgcHJpdmF0ZSBhZ2VudElkOiBzdHJpbmcpIHt9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgbmV3IGJvdCBjb252ZXJzYXRpb25cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwb3N0U3RhcnRDb252ZXJzYXRpb24oKTogUHJvbWlzZTxBUElNZXNzYWdlW10gfCB1bmRlZmluZWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBvc3QoXCIvc3RhcnRcIiwge1xuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKGJvZHkuZGF0YSAmJiBib2R5LmRhdGEuYm90KSB7XG4gICAgICAgIHJldHVybiBib2R5LmRhdGEuYm90IGFzIEFQSU1lc3NhZ2VbXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHN0YXJ0aW5nIGNvbnZlcnNhdGlvbi5cIik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhZ2VudCBkYXRhLCBlLmcuIHRoZW1lLCBsb2dvLCBldGMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0QWdlbnREYXRhKCk6IFByb21pc2U8QVBJQWdlbnREYXRhIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXQoYC9hZ2VudC1kYXRhP2xpZ2h0Ym90X2FnZW50X2lkPSR7dGhpcy5hZ2VudElkfWApO1xuXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKGJvZHkuZGF0YSkge1xuICAgICAgICByZXR1cm4gYm9keS5kYXRhIGFzIEFQSUFnZW50RGF0YTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIGFnZW50IGRhdGEuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGFuZCBnZXRzIGEgcmVwbHkgYmFja1xuICAgKiBAcGFyYW0gbWVzc2FnZSBzdHJpbmcgdmFsdWUgdGhlIHVzZXIgdHlwZWRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdChcIlwiLCB7XG4gICAgICAgIGh1bWFuOiBtZXNzYWdlLFxuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhICYmIGJvZHkuZGF0YS5ib3QpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuZGF0YS5ib3QgYXMgQVBJTWVzc2FnZVtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2VuZGluZyBhIG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEganVtcCBpZCBhbmQgZ2V0cyBhIHJlcGx5IGJhY2tcbiAgICogQHBhcmFtIGp1bXAgaWQgdGhlIHVzZXIgc2VsZWN0ZWQgZnJvbSBqdW1wIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwb3N0SnVtcChqdW1wOiBzdHJpbmcpOiBQcm9taXNlPEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdChcIi9qdW1wXCIsIHtcbiAgICAgICAganVtcCxcbiAgICAgICAgbGlnaHRib3RfYWdlbnRfaWQ6IHRoaXMuYWdlbnRJZCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKGJvZHkuZGF0YSAmJiBib2R5LmRhdGEuYm90KSB7XG4gICAgICAgIHJldHVybiBib2R5LmRhdGEuYm90IGFzIEFQSU1lc3NhZ2VbXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgc2VuZGluZyBhIGp1bXAuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgYm9keTogb2JqZWN0KSB7XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKGAke3RoaXMuaG9zdFVSTH0ke2VuZHBvaW50fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXQoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgIHJldHVybiBhd2FpdCBmZXRjaChgJHt0aGlzLmhvc3RVUkx9JHtlbmRwb2ludH1gKTtcbiAgfVxufVxuIl19