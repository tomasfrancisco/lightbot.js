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
      return "\"19Hgw012xn!@\"".concat(value);
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
    value: function saveMessages(messages, callback) {
      this.state.messages = this.state.messages.concat(messages);
      this.updateMessagesStorage();

      if (callback) {
        callback();
      }
    }
  }, {
    key: "popMessage",
    value: function popMessage(callback) {
      var message = this.state.messages.pop();
      this.updateMessagesStorage();

      if (callback) {
        callback();
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWdodGJvdC1qcy9zdGF0ZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIlN0YXRlTWFuYWdlciIsInZhbHVlIiwiYWdlbnQiLCJpc0luaXRpYWxpemVkIiwibGF5b3V0IiwiaXNNZXNzZW5nZXJPcGVuIiwibWVzc2FnZXMiLCJpbml0TWVzc2FnZXNTdGF0ZSIsImluaXRMYXlvdXRTdGF0ZSIsImluaXRBZ2VudFN0YXRlIiwiY2FsbGJhY2siLCJzdGF0ZSIsImNvbmNhdCIsInVwZGF0ZU1lc3NhZ2VzU3RvcmFnZSIsIm1lc3NhZ2UiLCJwb3AiLCJPYmplY3QiLCJhc3NpZ24iLCJ1cGRhdGVMYXlvdXRTdG9yYWdlIiwidXBkYXRlQWdlbnRTdG9yYWdlIiwidGVzdExvY2FsU3RvcmFnZSIsImNvbnNvbGUiLCJ3YXJuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImtleXMiLCJzZXRJdGVtIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemUiLCJlcnIiLCJFcnJvciIsImlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlIiwidW5kZWZpbmVkIiwidGVzdEtleSIsInRlc3RWYWx1ZSIsInJlbW92ZUl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJnZXRLZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWNBOzs7OztBQWFBOzs7Ozs7OztJQVFhQSxZOzs7OzsyQkFNV0MsSyxFQUF5QjtBQUM3Qyx1Q0FBd0JBLEtBQXhCO0FBQ0Q7OztBQVlELDBCQUFjO0FBQUE7O0FBQUEsbUNBVmM7QUFDMUJDLE1BQUFBLEtBQUssRUFBRTtBQUNMQyxRQUFBQSxhQUFhLEVBQUU7QUFEVixPQURtQjtBQUkxQkMsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLGVBQWUsRUFBRTtBQURYLE9BSmtCO0FBTzFCQyxNQUFBQSxRQUFRLEVBQUU7QUFQZ0IsS0FVZDs7QUFDWixTQUFLQyxpQkFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDQSxTQUFLQyxjQUFMO0FB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QUFZO0FBQzlCLGFBQU9tQyxJQUFJLENBQUNFLEtBQUwsQ0FBV3JDLEtBQVgsQ0FBUDtBQUNEOzs7d0JBMUtxQjtBQUNwQixhQUFPLEtBQUtVLEtBQUwsQ0FBV0wsUUFBbEI7QUFDRDs7O3dCQVdtQjtBQUNsQixhQUFPLEtBQUtLLEtBQUwsQ0FBV1AsTUFBbEI7QUFDRDs7O3dCQU9rQjtBQUNqQixhQUFPLEtBQUtPLEtBQUwsQ0FBV1QsS0FBbEI7QUFDRDs7Ozs7Ozs7Z0JBbkVVRixZLFVBQ3FCO0FBQzlCRSxFQUFBQSxLQUFLLEVBQUVGLFlBQVksQ0FBQ3VDLE1BQWIsQ0FBb0IsT0FBcEIsQ0FEdUI7QUFFOUJuQyxFQUFBQSxNQUFNLEVBQUVKLFlBQVksQ0FBQ3VDLE1BQWIsQ0FBb0IsUUFBcEIsQ0FGc0I7QUFHOUJqQyxFQUFBQSxRQUFRLEVBQUVOLFlBQVksQ0FBQ3VDLE1BQWIsQ0FBb0IsVUFBcEI7QUFIb0IsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUFnZW50RGF0YSB9IGZyb20gXCJsaWdodGJvdC1qcy9hcGkudHlwZXNcIjtcblxuaW1wb3J0IHsgTGlnaHRib3RNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2VuZ2VyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0U3RhdGUge1xuICBpc01lc3Nlbmdlck9wZW4/OiBib29sZWFuO1xuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWdlbnRTdGF0ZSA9IEFQSUFnZW50RGF0YSAmIHtcbiAgaXNJbml0aWFsaXplZD86IGJvb2xlYW47XG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBTdGF0ZSBmb3IgU3RhdGUgTWFuYWdlclxuICogU29tZSBwcm9wZXJ0aWVzIGFyZSBub3QgZXhwb3NlZCwgc28gaXQgbWVhbnMgdGhlIHR5cGUgc2hvdWxkIG5vdCBiZSBleHBvc2VkIGVpdGhlclxuICovXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gIGlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlPzogYm9vbGVhbjtcbiAgbWVzc2FnZXM6IExpZ2h0Ym90TWVzc2FnZVtdO1xuICBhZ2VudDogQWdlbnRTdGF0ZTtcbiAgbGF5b3V0OiBMYXlvdXRTdGF0ZTtcbn1cblxudHlwZSBTdG9yZUtleXMgPSB7IFtLIGluIGtleW9mIFN0b3JlU3RhdGVdOiBzdHJpbmcgfTtcblxuLyoqXG4gKiBTdGF0ZSBNYW5hZ2VyXG4gKiBpcyByZXNwb25zaWJsZSBmb3Iga2VlcGluZyBtZXNzYWdlcyBhbmQgYm90IGFnZW50IHJlbGF0aXZlIGRhdGEuXG4gKiBOb24gY3JpdGljYWwgaW5mb3JtYXRpb24gbGlrZSBtZXNzYWdlcyBhbmQgYWdlbnQgZGF0YSBpcyBzdG9yZWQgaW4gYnJvd3NlciBzdG9yYWdlLlxuICpcbiAqIFNlc3Npb24gYW5kIFVzZXIgZGF0YSBzaG91bGQgYmUga2VwdCB1bmRlciB0aGUgY29udHJvbCBvZiB0aGUgQVBJIC0gZS5nLiBjb29raWVzLlxuICogV0FSTklORzogTkVWRVIgVVNFIFNUQVRFIE1BTkFHRVIgVE8gREVBTCBXSVRIIENSSVRJQ0FMIERBVEFcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTWFuYWdlciB7XG4gIHB1YmxpYyBzdGF0aWMga2V5czogU3RvcmVLZXlzID0ge1xuICAgIGFnZW50OiBTdGF0ZU1hbmFnZXIuZ2V0S2V5KFwiYWdlbnRcIiksXG4gICAgbGF5b3V0OiBTdGF0ZU1hbmFnZXIuZ2V0S2V5KFwibGF5b3V0XCIpLFxuICAgIG1lc3NhZ2VzOiBTdGF0ZU1hbmFnZXIuZ2V0S2V5KFwibWVzc2FnZXNcIiksXG4gIH07XG4gIHByaXZhdGUgc3RhdGljIGdldEtleSh2YWx1ZToga2V5b2YgU3RvcmVTdGF0ZSkge1xuICAgIHJldHVybiBgXCIxOUhndzAxMnhuIUBcIiR7dmFsdWV9YDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgYWdlbnQ6IHtcbiAgICAgIGlzSW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICBpc01lc3Nlbmdlck9wZW46IGZhbHNlLFxuICAgIH0sXG4gICAgbWVzc2FnZXM6IFtdLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdE1lc3NhZ2VzU3RhdGUoKTtcbiAgICB0aGlzLmluaXRMYXlvdXRTdGF0ZSgpO1xuICAgIHRoaXMuaW5pdEFnZW50U3RhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzYXZlTWVzc2FnZXMobWVzc2FnZXM6IExpZ2h0Ym90TWVzc2FnZVtdLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnN0YXRlLm1lc3NhZ2VzID0gdGhpcy5zdGF0ZS5tZXNzYWdlcy5jb25jYXQobWVzc2FnZXMpO1xuICAgIHRoaXMudXBkYXRlTWVzc2FnZXNTdG9yYWdlKCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwb3BNZXNzYWdlKGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0YXRlLm1lc3NhZ2VzLnBvcCgpO1xuICAgIHRoaXMudXBkYXRlTWVzc2FnZXNTdG9yYWdlKCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubWVzc2FnZXM7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIHRvIG92ZXJyaWRlIGV4aXN0aW5nIG9yIGNyZWF0ZSBuZXcgbGF5b3V0IHByb3BlcnR5IHZhbHVlc1xuICAgKiBAcGFyYW0gbGF5b3V0IE92ZXJyaWRlcyB0byBsYXlvdXQgc3RvcmVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVMYXlvdXQobGF5b3V0OiBMYXlvdXRTdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUubGF5b3V0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5sYXlvdXQsIGxheW91dCk7XG4gICAgdGhpcy51cGRhdGVMYXlvdXRTdG9yYWdlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxheW91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5sYXlvdXQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQWdlbnQoYWdlbnQ6IEFnZW50U3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlLmFnZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5hZ2VudCwgYWdlbnQpO1xuICAgIHRoaXMudXBkYXRlQWdlbnRTdG9yYWdlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFnZW50KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFnZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TWVzc2FnZXNTdGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMudGVzdExvY2FsU3RvcmFnZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgaW5pdGFsaXppbmcgbWVzc2FnZSBzdG9yYWdlLiBMb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZVwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLm1lc3NhZ2VzKTtcblxuICAgIGlmICghbWVzc2FnZXMpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLm1lc3NhZ2VzLCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLm1lc3NhZ2VzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXMgPSB0aGlzLmRlc2VyaWFsaXplKG1lc3NhZ2VzKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5tZXNzYWdlcywgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5tZXNzYWdlcykpO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBtZXNzYWdlIHN0b3JhZ2UuIFRoZSBtZXNzYWdlIGhpc3Rvcnkgd2FzIHJlc2V0XCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVNZXNzYWdlc1N0b3JhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMpO1xuXG4gICAgaWYgKCFtZXNzYWdlcykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubWVzc2FnZXMpKTtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW1vdmluZyBsYXN0IG1lc3NhZ2UuIFRoZSBtZXNzYWdlcyBoaXN0b3J5IHdhcyByZXNldC5cIixcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubWVzc2FnZXMsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubWVzc2FnZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdExheW91dFN0YXRlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBsYXlvdXQgc3RvcmFnZS4gTG9jYWxTdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUuXCIsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxheW91dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCk7XG5cbiAgICBpZiAoIWxheW91dCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RhdGVNYW5hZ2VyLmtleXMubGF5b3V0LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmxheW91dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnN0YXRlLmxheW91dCA9IHRoaXMuZGVzZXJpYWxpemUobGF5b3V0KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5sYXlvdXQsIHRoaXMuc2VyaWFsaXplKHRoaXMuc3RhdGUubGF5b3V0KSk7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGxheW91dCBzdG9yYWdlLiBUaGUgbGF5b3V0IHdhcyByZXNldC5cIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVMYXlvdXRTdG9yYWdlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYXlvdXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5sYXlvdXQpO1xuXG4gICAgaWYgKCFsYXlvdXQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5sYXlvdXQpKTtcbiAgICAgIGNvbnNvbGUud2FybihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbW92aW5nIGxhc3QgbWVzc2FnZS4gVGhlIGxheW91dCB3YXMgcmVzZXQuXCIpO1xuICAgIH1cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmxheW91dCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5sYXlvdXQpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEFnZW50U3RhdGUoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGluaXRhbGl6aW5nIGFnZW50IHN0b3JhZ2UuIExvY2FsU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlLlwiLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50KTtcblxuICAgIGlmICghYWdlbnQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmFnZW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlbnQgPSB0aGlzLmRlc2VyaWFsaXplKGFnZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdGF0ZU1hbmFnZXIua2V5cy5hZ2VudCwgdGhpcy5zZXJpYWxpemUodGhpcy5zdGF0ZS5hZ2VudCkpO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBpbml0YWxpemluZyBhZ2VudCBzdG9yYWdlLiBUaGUgYWdlbnQgd2FzIHJlc2V0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWdlbnRTdG9yYWdlKCkge1xuICAgIGlmICghdGhpcy50ZXN0TG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50KTtcblxuICAgIGlmICghYWdlbnQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZShbXSkpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdXBkYXRpbmcgYWdlbnQuIFRoZSBhZ2VudCB3YXMgcmVzZXQuXCIpO1xuICAgIH1cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0YXRlTWFuYWdlci5rZXlzLmFnZW50LCB0aGlzLnNlcmlhbGl6ZSh0aGlzLnN0YXRlLmFnZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIExvY2FsU3RvcmFnZSBpcyBhdmFpbGFibGVcbiAgICovXG4gIHByaXZhdGUgdGVzdExvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXN0S2V5ID0gXCJsb2NhbHN0b3JhZ2VfdGVzdF9rZXlcIjtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBcImxvY2Fsc3RvcmFnZV90ZXN0X3ZhbHVlXCI7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRlc3RLZXksIHRlc3RWYWx1ZSk7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0odGVzdEtleSkgPT09IHRlc3RWYWx1ZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0S2V5KTtcbiAgICAgICAgdGhpcy5zdGF0ZS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemUodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==