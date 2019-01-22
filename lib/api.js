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
                  body: JSON.stringify(body),
                  headers: {
                    "Content-Type": "application/json"
                  },
                  method: "POST"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkudHMiXSwibmFtZXMiOlsiTGlnaHRib3RBUEkiLCJob3N0VVJMIiwiYWdlbnRJZCIsInBvc3QiLCJsaWdodGJvdF9hZ2VudF9pZCIsInJlc3BvbnNlIiwianNvbiIsImJvZHkiLCJkYXRhIiwiYm90IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJnZXQiLCJtZXNzYWdlIiwiaHVtYW4iLCJqdW1wIiwiZW5kcG9pbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFJYUEsVzs7O0FBQ1gsdUJBQW9CQyxPQUFwQixFQUE2Q0MsT0FBN0MsRUFBOEQ7QUFBQTtBQUFFO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSzJCLEtBQUtDLElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ3pDQyxrQkFBQUEsaUJBQWlCLEVBQUUsS0FBS0Y7QUFEaUIsaUJBQXBCLEM7OztBQUFqQkcsZ0JBQUFBLFE7O3VCQUdhQSxRQUFRLENBQUNDLElBQVQsRTs7O0FBQWJDLGdCQUFBQSxJOztzQkFDRkEsSUFBSSxDQUFDQyxJQUFMLElBQWFELElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxHOzs7OztpREFDbEJGLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxHOzs7Ozs7Ozs7c0JBR2IsSUFBSUMsS0FBSixDQUFVLGdEQUFWLEM7OztpREFFREMsUzs7Ozs7Ozs7Ozs7Ozs7OztBQUdUOzs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFLMkIsS0FBS0MsR0FBTCx5Q0FBMEMsS0FBS1YsT0FBL0MsRTs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBRWFBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3FCQUNGQSxJQUFJLENBQUNDLEk7Ozs7O2tEQUNBRCxJQUFJLENBQUNDLEk7Ozs7Ozs7OztzQkFHUixJQUFJRSxLQUFKLENBQVUsOENBQVYsQzs7O2tEQUdEQyxTOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Q7Ozs7Ozs7Ozs7Z0RBSXlCRSxPOzs7Ozs7Ozt1QkFFRSxLQUFLVixJQUFMLENBQVUsRUFBVixFQUFjO0FBQ25DVyxrQkFBQUEsS0FBSyxFQUFFRCxPQUQ0QjtBQUVuQ1Qsa0JBQUFBLGlCQUFpQixFQUFFLEtBQUtGO0FBRlcsaUJBQWQsQzs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBS2FBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3NCQUNGQSxJQUFJLENBQUNDLElBQUwsSUFBYUQsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7O2tEQUNsQkYsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7Ozs7OztzQkFHYixJQUFJQyxLQUFKLENBQVUsNENBQVYsQzs7O2tEQUVEQyxTOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Q7Ozs7Ozs7Ozs7Z0RBSXNCSSxJOzs7Ozs7Ozt1QkFFSyxLQUFLWixJQUFMLENBQVUsT0FBVixFQUFtQjtBQUN4Q1ksa0JBQUFBLElBQUksRUFBSkEsSUFEd0M7QUFFeENYLGtCQUFBQSxpQkFBaUIsRUFBRSxLQUFLRjtBQUZnQixpQkFBbkIsQzs7O0FBQWpCRyxnQkFBQUEsUTs7dUJBS2FBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7QUFBYkMsZ0JBQUFBLEk7O3NCQUNGQSxJQUFJLENBQUNDLElBQUwsSUFBYUQsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7O2tEQUNsQkYsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEc7Ozs7Ozs7OztzQkFHYixJQUFJQyxLQUFKLENBQVUsd0NBQVYsQzs7O2tEQUdEQyxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBR1VLLFEsRUFBa0JULEk7Ozs7Ozt1QkFDdEIsaUNBQVMsS0FBS04sT0FBZCxTQUF3QmUsUUFBeEIsR0FBb0M7QUFDL0NULGtCQUFBQSxJQUFJLEVBQUVVLElBQUksQ0FBQ0MsU0FBTCxDQUFlWCxJQUFmLENBRHlDO0FBRS9DWSxrQkFBQUEsT0FBTyxFQUFFO0FBQ1Asb0NBQWdCO0FBRFQsbUJBRnNDO0FBSy9DQyxrQkFBQUEsTUFBTSxFQUFFO0FBTHVDLGlCQUFwQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBU0dKLFE7Ozs7Ozt1QkFDSCxpQ0FBUyxLQUFLZixPQUFkLFNBQXdCZSxRQUF4QixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuaW1wb3J0IHsgQVBJQWdlbnREYXRhLCBBUElNZXNzYWdlIH0gZnJvbSBcIi4vYXBpLnR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaWdodGJvdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdFVSTDogc3RyaW5nLCBwcml2YXRlIGFnZW50SWQ6IHN0cmluZykge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgYSBuZXcgYm90IGNvbnZlcnNhdGlvblxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RTdGFydENvbnZlcnNhdGlvbigpOiBQcm9taXNlPEFQSU1lc3NhZ2VbXSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdChcIi9zdGFydFwiLCB7XG4gICAgICAgIGxpZ2h0Ym90X2FnZW50X2lkOiB0aGlzLmFnZW50SWQsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhICYmIGJvZHkuZGF0YS5ib3QpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuZGF0YS5ib3QgYXMgQVBJTWVzc2FnZVtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc3RhcnRpbmcgY29udmVyc2F0aW9uLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFnZW50IGRhdGEsIGUuZy4gdGhlbWUsIGxvZ28sIGV0Yy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBZ2VudERhdGEoKTogUHJvbWlzZTxBUElBZ2VudERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldChgL2FnZW50LWRhdGE/bGlnaHRib3RfYWdlbnRfaWQ9JHt0aGlzLmFnZW50SWR9YCk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhKSB7XG4gICAgICAgIHJldHVybiBib2R5LmRhdGEgYXMgQVBJQWdlbnREYXRhO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgYWdlbnQgZGF0YS5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYW5kIGdldHMgYSByZXBseSBiYWNrXG4gICAqIEBwYXJhbSBtZXNzYWdlIHN0cmluZyB2YWx1ZSB0aGUgdXNlciB0eXBlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiXCIsIHtcbiAgICAgICAgaHVtYW46IG1lc3NhZ2UsXG4gICAgICAgIGxpZ2h0Ym90X2FnZW50X2lkOiB0aGlzLmFnZW50SWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChib2R5LmRhdGEgJiYgYm9keS5kYXRhLmJvdCkge1xuICAgICAgICByZXR1cm4gYm9keS5kYXRhLmJvdCBhcyBBUElNZXNzYWdlW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzZW5kaW5nIGEgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBqdW1wIGlkIGFuZCBnZXRzIGEgcmVwbHkgYmFja1xuICAgKiBAcGFyYW0ganVtcCBpZCB0aGUgdXNlciBzZWxlY3RlZCBmcm9tIGp1bXAgb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHBvc3RKdW1wKGp1bXA6IHN0cmluZyk6IFByb21pc2U8QVBJTWVzc2FnZVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KFwiL2p1bXBcIiwge1xuICAgICAgICBqdW1wLFxuICAgICAgICBsaWdodGJvdF9hZ2VudF9pZDogdGhpcy5hZ2VudElkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoYm9keS5kYXRhICYmIGJvZHkuZGF0YS5ib3QpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuZGF0YS5ib3QgYXMgQVBJTWVzc2FnZVtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBzZW5kaW5nIGEganVtcC5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcG9zdChlbmRwb2ludDogc3RyaW5nLCBib2R5OiBvYmplY3QpIHtcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2goYCR7dGhpcy5ob3N0VVJMfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldChlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKGAke3RoaXMuaG9zdFVSTH0ke2VuZHBvaW50fWApO1xuICB9XG59XG4iXX0=