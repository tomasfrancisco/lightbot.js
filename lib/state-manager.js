"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateManager = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Internal State for State Manager
 * Some properties are not exposed, so it means the type should not be exposed either
 */

/**
 * State Manager
 * is responsible for keeping messages and bot agent relative data.
 * Non critical information like messages and agent data is stored in browser storage.
 *
 * Session and User data should be kept under the control of the API - e.g. cookies.
 * WARNING: NEVER USE STATE MANAGER TO DEAL WITH CRITICAL DATA
 */
var StateManager =
/*#__PURE__*/
function () {
  _createClass(StateManager, null, [{
    key: "getKey",
    value: function getKey(value) {
      return "".concat(StateManager.salt).concat(value);
    }
  }]);

  function StateManager() {
    _classCallCheck(this, StateManager);

    _defineProperty(this, "state", {
      agent: {
        isInitialized: false
      },
      layout: {
        isMessengerOpen: false
      },
      messages: []
    });

    this.initMessagesState();
    this.initLayoutState();
    this.initAgentState();
  }

  _createClass(StateManager, [{
    key: "saveMessages",
    value: function saveMessages(messages) {
      this.state.messages = this.state.messages.concat(messages);
      this.updateMessagesStorage();
    }
  }, {
    key: "popMessage",
    value: function popMessage() {
      var message = this.state.messages.pop();
      this.updateMessagesStorage();
      return message;
    }
  }, {
    key: "updateLayout",

    /**
     * Interface to override existing or create new layout property values
     * @param layout Overrides to layout store
     */
    value: function updateLayout(layout) {
      this.state.layout = Object.assign({}, this.state.layout, layout);
      this.updateLayoutStorage();
    }
  }, {
    key: "updateAgent",
    value: function updateAgent(agent) {
      this.state.agent = Object.assign({}, this.state.agent, agent);
      this.updateAgentStorage();
    }
  }, {
    key: "initMessagesState",
    value: function initMessagesState() {
      if (!this.testLocalStorage()) {
        console.warn("An error occurred while initalizing message storage. LocalStorage is not available");
        return;
      }

      var messages = localStorage.getItem(StateManager.keys.messages);

      if (!messages) {
        localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
      } else {
        try {
          this.state.messages = this.deserialize(messages);
        } catch (err) {
          localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
          console.warn("An error occurred while initalizing message storage. The message history was reset");
        }
      }
    }
  }, {
    key: "updateMessagesStorage",
    value: function updateMessagesStorage() {
      if (!this.testLocalStorage()) {
        return;
      }

      var messages = localStorage.getItem(StateManager.keys.messages);

      if (!messages) {
        localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
        console.warn("An error occurred while removing last message. The messages history was reset.");
        return;
      }

      localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
    }
  }, {
    key: "initLayoutState",
    value: function initLayoutState() {
      if (!this.testLocalStorage()) {
        console.warn("An error occurred while initalizing layout storage. LocalStorage is not available.");
        return;
      }

      var layout = localStorage.getItem(StateManager.keys.layout);

      if (!layout) {
        localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
      } else {
        try {
          this.state.layout = this.deserialize(layout);
        } catch (err) {
          localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
          console.warn("An error occurred while initalizing layout storage. The layout was reset.");
        }
      }
    }
  }, {
    key: "updateLayoutStorage",
    value: function updateLayoutStorage() {
      if (!this.testLocalStorage()) {
        return;
      }

      var layout = localStorage.getItem(StateManager.keys.layout);

      if (!layout) {
        localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
        console.warn("An error occurred while removing last message. The layout was reset.");
      }

      localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
    }
  }, {
    key: "initAgentState",
    value: function initAgentState() {
      if (!this.testLocalStorage()) {
        console.warn("An error occurred while initalizing agent storage. LocalStorage is not available.");
        return;
      }

      var agent = localStorage.getItem(StateManager.keys.agent);

      if (!agent) {
        localStorage.setItem(StateManager.keys.agent, this.serialize(this.state.agent));
      } else {
        try {
          this.state.agent = this.deserialize(agent);
        } catch (err) {
          localStorage.setItem(StateManager.keys.agent, this.serialize(this.state.agent));
          console.warn("An error occurred while initalizing agent storage. The agent was reset");
        }
      }
    }
  }, {
    key: "updateAgentStorage",
    value: function updateAgentStorage() {
      if (!this.testLocalStorage()) {
        return;
      }

      var agent = localStorage.getItem(StateManager.keys.agent);

      if (!agent) {
        localStorage.setItem(StateManager.keys.agent, this.serialize([]));
        throw new Error("An error occurred while updating agent. The agent was reset.");
      }

      localStorage.setItem(StateManager.keys.agent, this.serialize(this.state.agent));
    }
    /**
     * Returns true if LocalStorage is available
     */

  }, {
    key: "testLocalStorage",
    value: function testLocalStorage() {
      if (this.state.isLocalStorageAvailable !== undefined) {
        return this.state.isLocalStorageAvailable;
      }

      var testKey = "localstorage_test_key";
      var testValue = "localstorage_test_value";

      try {
        localStorage.setItem(testKey, testValue);

        if (localStorage.getItem(testKey) === testValue) {
          localStorage.removeItem(testKey);
          this.state.isLocalStorageAvailable = true;
        }
      } catch (err) {
        this.state.isLocalStorageAvailable = false;
      }

      return this.state.isLocalStorageAvailable;
    }
  }, {
    key: "serialize",
    value: function serialize(value) {
      return JSON.stringify(value);
    }
  }, {
    key: "deserialize",
    value: function deserialize(value) {
      return JSON.parse(value);
    }
  }, {
    key: "messages",
    get: function get() {
      return this.state.messages;
    }
  }, {
    key: "layout",
    get: function get() {
      return this.state.layout;
    }
  }, {
    key: "agent",
    get: function get() {
      return this.state.agent;
    }
  }]);

  return StateManager;
}();

exports.StateManager = StateManager;

_defineProperty(StateManager, "keys", {
  agent: StateManager.getKey("agent"),
  layout: StateManager.getKey("layout"),
  messages: StateManager.getKey("messages")
});

_defineProperty(StateManager, "salt", "19Hgw012xn!@");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0ZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIlN0YXRlTWFuYWdlciIsInZhbHVlIiwic2FsdCIsImFnZW50IiwiaXNJbml0aWFsaXplZCIsImxheW91dCIsImlzTWVzc2VuZ2VyT3BlbiIsIm1lc3NhZ2VzIiwiaW5pdE1lc3NhZ2VzU3RhdGUiLCJpbml0TGF5b3V0U3RhdGUiLCJpbml0QWdlbnRTdGF0ZSIsInN0YXRlIiwiY29uY2F0IiwidXBkYXRlTWVzc2FnZXNTdG9yYWdlIiwibWVzc2FnZSIsInBvcCIsIk9iamVjdCIsImFzc2lnbiIsInVwZGF0ZUxheW91dFN0b3JhZ2UiLCJ1cGRhdGVBZ2VudFN0b3JhZ2UiLCJ0ZXN0TG9jYWxTdG9yYWdlIiwiY29uc29sZSIsIndhcm4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwia2V5cyIsInNldEl0ZW0iLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZSIsImVyciIsIkVycm9yIiwiaXNMb2NhbFN0b3JhZ2VBdmFpbGFibGUiLCJ1bmRlZmluZWQiLCJ0ZXN0S2V5IiwidGVzdFZhbHVlIiwicmVtb3ZlSXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImdldEtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7O0FBYUE7Ozs7Ozs7O0lBUWFBLFk7Ozs7OzJCQVFXQyxLLEVBQXlCO0FBQzdDLHVCQUFVRCxZQUFZLENBQUNFLElBQXZCLFNBQThCRCxLQUE5QjtBQUNEOzs7QUFZRCwwQkFBYztBQUFBOztBQUFBLG1DQVZjO0FBQzFCRSxNQUFBQSxLQUFLLEVBQUU7QUFDTEMsUUFBQUEsYUFBYSxFQUFFO0FBRFYsT0FEbUI7QUFJMUJDLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxlQUFlLEVBQUU7QUFEWCxPQUprQjtBQU8xQkMsTUFBQUEsUUFBUSxFQUFFO0FBUGdCLEtBVWQ7O0FBQ1osU0FBS0MsaUJBQUw7QUFDQSxTQUFLQyxlQUFMO0FBQ0EsU0FBS0MsY0FB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QkFXbUI7QUFDbEIsYUFBTyxLQUFLSSxLQUFMLENBQVdOLE1BQWxCO0FBQ0Q7Ozt3QkFPa0I7QUFDakIsYUFBTyxLQUFLTSxLQUFMLENBQVdSLEtBQWxCO0FBQ0Q7Ozs7Ozs7O2dCQWhFVUgsWSxVQUNxQjtBQUM5QkcsRUFBQUEsS0FBSyxFQUFFSCxZQUFZLENBQUN1QyxNQUFiLENBQW9CLE9BQXBCLENBRHVCO0FBRTlCbEMsRUFBQUEsTUFBTSxFQUFFTCxZQUFZLENBQUN1QyxNQUFiLENBQW9CLFFBQXBCLENBRnNCO0FBRzlCaEMsRUFBQUEsUUFBUSxFQUFFUCxZQUFZLENBQUN1QyxNQUFiLENBQW9CLFVBQXBCO0FBSG9CLEM7O2dCQURyQnZDLFksVUFPVyxjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJQWdlbnREYXRhIH0gZnJvbSBcImFwaS50eXBlc1wiO1xuXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2VuZ2VyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0U3RhdGUge1xuICBpc01lc3Nlbmdlck9wZW4/OiBib29sZWFuO1xuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWdlbnRTdGF0ZSA9IEFQSUFnZW50RGF0YSAmIHtcbiAgaXNJbml0aWFsaXplZD86IGJvb2xlYW47XG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBTdGF0ZSBmb3IgU3RhdGUgTWFuYWdlclxuICogU29tZSBwcm9wZXJ0aWVzIGFyZSBub3QgZXhwb3NlZCwgc28gaXQgbWVhbnMgdGhlIHR5cGUgc2hvdWxkIG5vdCBiZSBleHBvc2VkIGVpdGhlclxuICovXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gIGlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlPzogYm9vbGVhbjtcbiAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcbiAgYWdlbnQ6IEFnZW50U3RhdGU7XG4gIGxheW91dDogTGF5b3V0U3RhdGU7XG59XG5cbnR5cGUgU3RvcmVLZXlzID0geyBbSyBpbiBrZXlvZiBTdG9yZVN0YXRlXTogc3RyaW5nIH07XG5cbi8qKlxuICogU3RhdGUgTWFuYWdlclxuICogaXMgcmVzcG9uc2libGUgZm9yIGtlZXBpbmcgbWVzc2FnZXMgYW5kIGJvdCBhZ2VudCByZWxhdGl2ZSBkYXRhLlxuICogTm9uIGNyaXRpY2FsIGluZm9ybWF0aW9uIGxpa2UgbWVzc2FnZXMgYW5kIGFnZW50IGRhdGEgaXMgc3RvcmVkIGluIGJyb3dzZXIgc3RvcmFnZS5cbiAqXG4gKiBTZXNzaW9uIGFuZCBVc2VyIGRhdGEgc2hvdWxkIGJlIGtlcHQgdW5kZXIgdGhlIGNvbnRyb2wgb2YgdGhlIEFQSSAtIGUuZy4gY29va2llcy5cbiAqIFdBUk5JTkc6IE5FVkVSIFVTRSBTVEFURSBNQU5BR0VSIFRPIERFQUwgV0lUSCBDUklUSUNBTCBEQVRBXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0ZU1hbmFnZXIge1xuICBwdWJsaWMgc3RhdGljIGtleXM6IFN0b3JlS2V5cyA9IHtcbiAgICBhZ2VudDogU3RhdGVNYW5hZ2VyLmdldEtleShcImFnZW50XCIpLFxuICAgIGxheW91dDogU3RhdGVNYW5hZ2VyLmdldEtleShcImxheW91dFwiKSxcbiAgICBtZXNzYWdlczogU3RhdGVNYW5hZ2VyLmdldEtleShcIm1lc3NhZ2VzXCIpLFxuICB9O1xuXG4gIHByaXZhdGUgc3RhdGljIHNhbHQgPSBcIjE5SGd3MDEyeG4hQFwiO1xuICBwcml2YXRlIHN0YXRpYyBnZXRLZXkodmFsdWU6IGtleW9mIFN0b3JlU3RhdGUpIHtcbiAgICByZXR1cm4gYCR7U3RhdGVNYW5hZ2VyLnNhbHR9JHt2YWx1ZX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZTogU3RvcmVTdGF0ZSA9IHtcbiAgICBhZ2VudDoge1xuICAgICAgaXNJbml0aWFsaXplZDogZmFsc2UsXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIGlzTWVzc2VuZ2VyT3BlbjogZmFsc2UsXG4gICAgfSxcbiAgICBtZXNzYWdlczogW10sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0TWVzc2FnZXNTdGF0ZSgpO1xuICAgIHRoaXMuaW5pdExheW91dFN0YXRlKCk7XG4gICAgdGhpcy5pbml0QWdlbnRTdGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHNhdmVNZXNzYWdlcyhtZXNzYWdlczogTWVzc2FnZVtdKSB7XG4gICAgdGhpcy5zdGF0ZS5tZXNzYWdlcyA9IHRoaXMuc3RhdGUubWVzc2FnZXMuY29uY2F0KG1lc3NhZ2VzKTtcbiAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzU3RvcmFnZSgpO1xuICB9XG5cbiAgcHVibGljIHBvcE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuc3RhdGUubWVzc2FnZXMucG9wKCk7XG4gICAgdGhpcy51cGRhdGVNZXNzYWdlc1N0b3JhZ2UoKTtcblxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG5cbiAgcHVibGljIGdldCBtZXNzYWdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXNzYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgdG8gb3ZlcnJpZGUgZXhpc3Rpbmcgb3IgY3JlYXRlIG5ldyBsYXlvdXQgcHJvcGVydHkgdmFsdWVzXG4gICAqIEBwYXJhbSBsYXlvdXQgT3ZlcnJpZGVzIHRvIGxheW91dCBzdG9yZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUxheW91dChsYXlvdXQ6IExheW91dFN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZS5sYXlvdXQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLmxheW91dCwgbGF5b3V0KTtcbiAgICB0aGlzLnVwZGF0ZUxheW91dFN0b3JhZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbGF5b3V0KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmxheW91dDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBZ2VudChhZ2VudDogQWdlbnRTdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUuYWdlbnQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLmFnZW50LCBhZ2VudCk7XG4gICAgdGhpcy51cGRhdGVBZ2VudFN0b3JhZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWdlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuYWdlbnQ7XG4gIH1cblxuICBwcml2YXRlIGluaXRNZXNzYWdlc1N0YXRlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBtZXNzYWdlIHN0b3JhZ2UuIExvY2FsU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlXCIsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMpO1xuXG4gICAgaWYgKCFtZXNzYWdlcykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubWVzc2FnZXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tZXNzYWdlcyA9IHRoaXMuZGVzZXJpYWxpemUobWVzc2FnZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLm1lc3NhZ2VzLCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLm1lc3NhZ2VzKSk7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIG1lc3NhZ2Ugc3RvcmFnZS4gVGhlIG1lc3NhZ2UgaGlzdG9yeSB3YXMgcmVzZXRcIixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU1lc3NhZ2VzU3RvcmFnZSgpIHtcbiAgICBpZiAoIXRoaXMudGVzdExvY2FsU3RvcmFnZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5tZXNzYWdlcyk7XG5cbiAgICBpZiAoIW1lc3NhZ2VzKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5tZXNzYWdlcywgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5tZXNzYWdlcykpO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbW92aW5nIGxhc3QgbWVzc2FnZS4gVGhlIG1lc3NhZ2VzIGhpc3Rvcnkgd2FzIHJlc2V0LlwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5tZXNzYWdlcywgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5tZXNzYWdlcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TGF5b3V0U3RhdGUoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGxheW91dCBzdG9yYWdlLiBMb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZS5cIixcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGF5b3V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubGF5b3V0KTtcblxuICAgIGlmICghbGF5b3V0KSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5sYXlvdXQsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubGF5b3V0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGUubGF5b3V0ID0gdGhpcy5kZXNlcmlhbGl6ZShsYXlvdXQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5sYXlvdXQpKTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgaW5pdGFsaXppbmcgbGF5b3V0IHN0b3JhZ2UuIFRoZSBsYXlvdXQgd2FzIHJlc2V0LlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUxheW91dFN0b3JhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxheW91dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCk7XG5cbiAgICBpZiAoIWxheW91dCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubGF5b3V0LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmxheW91dCkpO1xuICAgICAgY29uc29sZS53YXJuKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVtb3ZpbmcgbGFzdCBtZXNzYWdlLiBUaGUgbGF5b3V0IHdhcyByZXNldC5cIik7XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubGF5b3V0LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmxheW91dCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0QWdlbnRTdGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMudGVzdExvY2FsU3RvcmFnZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgaW5pdGFsaXppbmcgYWdlbnQgc3RvcmFnZS4gTG9jYWxTdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUuXCIsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFnZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMuYWdlbnQpO1xuXG4gICAgaWYgKCFhZ2VudCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMuYWdlbnQsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUuYWdlbnQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2VudCA9IHRoaXMuZGVzZXJpYWxpemUoYWdlbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmFnZW50KSk7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGFnZW50IHN0b3JhZ2UuIFRoZSBhZ2VudCB3YXMgcmVzZXRcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBZ2VudFN0b3JhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFnZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMuYWdlbnQpO1xuXG4gICAgaWYgKCFhZ2VudCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMuYWdlbnQsIHRoaXMuc2VyaWFsaXplKFtdKSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSB1cGRhdGluZyBhZ2VudC4gVGhlIGFnZW50IHdhcyByZXNldC5cIik7XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMuYWdlbnQsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUuYWdlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgTG9jYWxTdG9yYWdlIGlzIGF2YWlsYWJsZVxuICAgKi9cbiAgcHJpdmF0ZSB0ZXN0TG9jYWxTdG9yYWdlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlO1xuICAgIH1cblxuICAgIGNvbnN0IHRlc3RLZXkgPSBcImxvY2Fsc3RvcmFnZV90ZXN0X2tleVwiO1xuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IFwibG9jYWxzdG9yYWdlX3Rlc3RfdmFsdWVcIjtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGVzdEtleSwgdGVzdFZhbHVlKTtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0ZXN0S2V5KSA9PT0gdGVzdFZhbHVlKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRlc3RLZXkpO1xuICAgICAgICB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuc3RhdGUuaXNMb2NhbFN0b3JhZ2VBdmFpbGFibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNMb2NhbFN0b3JhZ2VBdmFpbGFibGU7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZSh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzZXJpYWxpemUodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgfVxufVxuIl19