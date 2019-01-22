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
      messages: [],
      agent: {
        isInitialized: false
      },
      layout: {
        isMessengerOpen: false
      }
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

_defineProperty(StateManager, "salt", "19Hgw012xn!@");

_defineProperty(StateManager, "keys", {
  messages: StateManager.getKey("messages"),
  agent: StateManager.getKey("agent"),
  layout: StateManager.getKey("layout")
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0ZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIlN0YXRlTWFuYWdlciIsInZhbHVlIiwic2FsdCIsIm1lc3NhZ2VzIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwibGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwiaW5pdE1lc3NhZ2VzU3RhdGUiLCJpbml0TGF5b3V0U3RhdGUiLCJpbml0QWdlbnRTdGF0ZSIsInN0YXRlIiwiY29uY2F0IiwidXBkYXRlTWVzc2FnZXNTdG9yYWdlIiwibWVzc2FnZSIsInBvcCIsIk9iamVjdCIsImFzc2lnbiIsInVwZGF0ZUxheW91dFN0b3JhZ2UiLCJ1cGRhdGVBZ2VudFN0b3JhZ2UiLCJ0ZXN0TG9jYWxTdG9yYWdlIiwiY29uc29sZSIsIndhcm4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwia2V5cyIsInNldEl0ZW0iLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZSIsImVyciIsIkVycm9yIiwiaXNMb2NhbFN0b3JhZ2VBdmFpbGFibGUiLCJ1bmRlZmluZWQiLCJ0ZXN0S2V5IiwidGVzdFZhbHVlIiwicmVtb3ZlSXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImdldEtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7O0FBYUE7Ozs7Ozs7O0lBUWFBLFk7Ozs7OzJCQUVXQyxLLEVBQXlCO0FBQzdDLHVCQUFVRCxZQUFZLENBQUNFLElBQXZCLFNBQThCRCxLQUE5QjtBQUNEOzs7QUFpQkQsMEJBQWM7QUFBQTs7QUFBQSxtQ0FWYztBQUMxQkUsTUFBQUEsUUFBUSxFQUFFLEVBRGdCO0FBRTFCQyxNQUFBQSxLQUFLLEVBQUU7QUFDTEMsUUFBQUEsYUFBYSxFQUFFO0FBRFYsT0FGbUI7QUFLMUJDLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxlQUFlLEVBQUU7QUFEWDtBQUxrQixLQVVkOztBQUNaLFNBQUtDLGlCQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNBLFNBQUtDLGNB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Ozt3QkFXbUI7QUFDbEIsYUFBTyxLQUFLUSxLQUFMLENBQVdMLE1BQWxCO0FBQ0Q7Ozt3QkFPa0I7QUFDakIsYUFBTyxLQUFLSyxLQUFMLENBQVdQLEtBQWxCO0FBQ0Q7Ozs7Ozs7O2dCQS9EVUosWSxVQUNXLGM7O2dCQURYQSxZLFVBS2M7QUFDdkJHLEVBQUFBLFFBQVEsRUFBRUgsWUFBWSxDQUFDdUMsTUFBYixDQUFvQixVQUFwQixDQURhO0FBRXZCbkMsRUFBQUEsS0FBSyxFQUFFSixZQUFZLENBQUN1QyxNQUFiLENBQW9CLE9BQXBCLENBRmdCO0FBR3ZCakMsRUFBQUEsTUFBTSxFQUFFTixZQUFZLENBQUN1QyxNQUFiLENBQW9CLFFBQXBCO0FBSGUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzZW5nZXJcIjtcbmltcG9ydCB7IEFQSUFnZW50RGF0YSB9IGZyb20gXCJhcGkudHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgTGF5b3V0U3RhdGUgPSB7XG4gIGlzTWVzc2VuZ2VyT3Blbj86IGJvb2xlYW47XG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgQWdlbnRTdGF0ZSA9IEFQSUFnZW50RGF0YSAmIHtcbiAgaXNJbml0aWFsaXplZD86IGJvb2xlYW47XG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBTdGF0ZSBmb3IgU3RhdGUgTWFuYWdlclxuICogU29tZSBwcm9wZXJ0aWVzIGFyZSBub3QgZXhwb3NlZCwgc28gaXQgbWVhbnMgdGhlIHR5cGUgc2hvdWxkIG5vdCBiZSBleHBvc2VkIGVpdGhlclxuICovXG50eXBlIFN0b3JlU3RhdGUgPSB7XG4gIGlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlPzogYm9vbGVhbjtcbiAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcbiAgYWdlbnQ6IEFnZW50U3RhdGU7XG4gIGxheW91dDogTGF5b3V0U3RhdGU7XG59O1xuXG50eXBlIFN0b3JlS2V5cyA9IHsgW0sgaW4ga2V5b2YgU3RvcmVTdGF0ZV06IHN0cmluZyB9O1xuXG4vKipcbiAqIFN0YXRlIE1hbmFnZXJcbiAqIGlzIHJlc3BvbnNpYmxlIGZvciBrZWVwaW5nIG1lc3NhZ2VzIGFuZCBib3QgYWdlbnQgcmVsYXRpdmUgZGF0YS5cbiAqIE5vbiBjcml0aWNhbCBpbmZvcm1hdGlvbiBsaWtlIG1lc3NhZ2VzIGFuZCBhZ2VudCBkYXRhIGlzIHN0b3JlZCBpbiBicm93c2VyIHN0b3JhZ2UuXG4gKlxuICogU2Vzc2lvbiBhbmQgVXNlciBkYXRhIHNob3VsZCBiZSBrZXB0IHVuZGVyIHRoZSBjb250cm9sIG9mIHRoZSBBUEkgLSBlLmcuIGNvb2tpZXMuXG4gKiBXQVJOSU5HOiBORVZFUiBVU0UgU1RBVEUgTUFOQUdFUiBUTyBERUFMIFdJVEggQ1JJVElDQUwgREFUQVxuICovXG5leHBvcnQgY2xhc3MgU3RhdGVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgc2FsdCA9IFwiMTlIZ3cwMTJ4biFAXCI7XG4gIHByaXZhdGUgc3RhdGljIGdldEtleSh2YWx1ZToga2V5b2YgU3RvcmVTdGF0ZSkge1xuICAgIHJldHVybiBgJHtTdGF0ZU1hbmFnZXIuc2FsdH0ke3ZhbHVlfWA7XG4gIH1cbiAgc3RhdGljIGtleXM6IFN0b3JlS2V5cyA9IHtcbiAgICBtZXNzYWdlczogU3RhdGVNYW5hZ2VyLmdldEtleShcIm1lc3NhZ2VzXCIpLFxuICAgIGFnZW50OiBTdGF0ZU1hbmFnZXIuZ2V0S2V5KFwiYWdlbnRcIiksXG4gICAgbGF5b3V0OiBTdGF0ZU1hbmFnZXIuZ2V0S2V5KFwibGF5b3V0XCIpLFxuICB9O1xuXG4gIHByaXZhdGUgc3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgbWVzc2FnZXM6IFtdLFxuICAgIGFnZW50OiB7XG4gICAgICBpc0luaXRpYWxpemVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgaXNNZXNzZW5nZXJPcGVuOiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdE1lc3NhZ2VzU3RhdGUoKTtcbiAgICB0aGlzLmluaXRMYXlvdXRTdGF0ZSgpO1xuICAgIHRoaXMuaW5pdEFnZW50U3RhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzYXZlTWVzc2FnZXMobWVzc2FnZXM6IE1lc3NhZ2VbXSkge1xuICAgIHRoaXMuc3RhdGUubWVzc2FnZXMgPSB0aGlzLnN0YXRlLm1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlcyk7XG4gICAgdGhpcy51cGRhdGVNZXNzYWdlc1N0b3JhZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3BNZXNzYWdlKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0YXRlLm1lc3NhZ2VzLnBvcCgpO1xuICAgIHRoaXMudXBkYXRlTWVzc2FnZXNTdG9yYWdlKCk7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubWVzc2FnZXM7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIHRvIG92ZXJyaWRlIGV4aXN0aW5nIG9yIGNyZWF0ZSBuZXcgbGF5b3V0IHByb3BlcnR5IHZhbHVlc1xuICAgKiBAcGFyYW0gbGF5b3V0IE92ZXJyaWRlcyB0byBsYXlvdXQgc3RvcmVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVMYXlvdXQobGF5b3V0OiBMYXlvdXRTdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUubGF5b3V0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5sYXlvdXQsIGxheW91dCk7XG4gICAgdGhpcy51cGRhdGVMYXlvdXRTdG9yYWdlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxheW91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5sYXlvdXQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQWdlbnQoYWdlbnQ6IEFnZW50U3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlLmFnZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5hZ2VudCwgYWdlbnQpO1xuICAgIHRoaXMudXBkYXRlQWdlbnRTdG9yYWdlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFnZW50KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TWVzc2FnZXNTdGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMudGVzdExvY2FsU3RvcmFnZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgaW5pdGFsaXppbmcgbWVzc2FnZSBzdG9yYWdlLiBMb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZVwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLm1lc3NhZ2VzKTtcblxuICAgIGlmICghbWVzc2FnZXMpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLm1lc3NhZ2VzLCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLm1lc3NhZ2VzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXMgPSB0aGlzLmRlc2VyaWFsaXplKG1lc3NhZ2VzKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5tZXNzYWdlcywgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5tZXNzYWdlcykpO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBtZXNzYWdlIHN0b3JhZ2UuIFRoZSBtZXNzYWdlIGhpc3Rvcnkgd2FzIHJlc2V0XCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVNZXNzYWdlc1N0b3JhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMpO1xuXG4gICAgaWYgKCFtZXNzYWdlcykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubWVzc2FnZXMpKTtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW1vdmluZyBsYXN0IG1lc3NhZ2UuIFRoZSBtZXNzYWdlcyBoaXN0b3J5IHdhcyByZXNldC5cIixcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubWVzc2FnZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdExheW91dFN0YXRlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBsYXlvdXQgc3RvcmFnZS4gTG9jYWxTdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUuXCIsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxheW91dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCk7XG5cbiAgICBpZiAoIWxheW91dCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubGF5b3V0LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmxheW91dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnN0YXRlLmxheW91dCA9IHRoaXMuZGVzZXJpYWxpemUobGF5b3V0KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5sYXlvdXQsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubGF5b3V0KSk7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGxheW91dCBzdG9yYWdlLiBUaGUgbGF5b3V0IHdhcyByZXNldC5cIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVMYXlvdXRTdG9yYWdlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYXlvdXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5sYXlvdXQpO1xuXG4gICAgaWYgKCFsYXlvdXQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5sYXlvdXQpKTtcbiAgICAgIGNvbnNvbGUud2FybihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbW92aW5nIGxhc3QgbWVzc2FnZS4gVGhlIGxheW91dCB3YXMgcmVzZXQuXCIpO1xuICAgIH1cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5sYXlvdXQpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEFnZW50U3RhdGUoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGFnZW50IHN0b3JhZ2UuIExvY2FsU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlLlwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50KTtcblxuICAgIGlmICghYWdlbnQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmFnZW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlbnQgPSB0aGlzLmRlc2VyaWFsaXplKGFnZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5hZ2VudCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5hZ2VudCkpO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBhZ2VudCBzdG9yYWdlLiBUaGUgYWdlbnQgd2FzIHJlc2V0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWdlbnRTdG9yYWdlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50KTtcblxuICAgIGlmICghYWdlbnQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZShbXSkpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdXBkYXRpbmcgYWdlbnQuIFRoZSBhZ2VudCB3YXMgcmVzZXQuXCIpO1xuICAgIH1cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmFnZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIExvY2FsU3RvcmFnZSBpcyBhdmFpbGFibGVcbiAgICovXG4gIHByaXZhdGUgdGVzdExvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXN0S2V5ID0gXCJsb2NhbHN0b3JhZ2VfdGVzdF9rZXlcIjtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBcImxvY2Fsc3RvcmFnZV90ZXN0X3ZhbHVlXCI7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRlc3RLZXksIHRlc3RWYWx1ZSk7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0odGVzdEtleSkgPT09IHRlc3RWYWx1ZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0S2V5KTtcbiAgICAgICAgdGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemUodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==