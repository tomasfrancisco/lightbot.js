import { APIAgentData } from "lightbot-js/api.types";

import { LightbotMessage } from "./messenger";

export interface LayoutState {
  isMessengerOpen?: boolean;
  [propName: string]: any;
}

export type AgentState = APIAgentData & {
  isInitialized?: boolean;
  [propName: string]: any;
};

/**
 * Internal State for State Manager
 * Some properties are not exposed, so it means the type should not be exposed either
 */
interface StoreState {
  isLocalStorageAvailable?: boolean;
  messages: LightbotMessage[];
  agent: AgentState;
  layout: LayoutState;
}

type StoreKeys = { [K in keyof StoreState]: string };

export const initialState: StoreState = {
  agent: {
    isInitialized: false,
  },
  layout: {
    isMessengerOpen: false,
  },
  messages: [],
};
/**
 * State Manager
 * is responsible for keeping messages and bot agent relative data.
 * Non critical information like messages and agent data is stored in browser storage.
 *
 * Session and User data should be kept under the control of the API - e.g. cookies.
 * WARNING: NEVER USE STATE MANAGER TO DEAL WITH CRITICAL DATA
 */
export class StateManager {
  public static keys: StoreKeys = {
    agent: StateManager.getKey("agent"),
    layout: StateManager.getKey("layout"),
    messages: StateManager.getKey("messages"),
  };
  private static getKey(value: keyof StoreState) {
    return `"19Hgw012xn!@"${value}`;
  }

  private state: StoreState = initialState;

  constructor() {
    if (!this.testLocalStorage()) {
      console.warn(
        "An error occurred while initalizing from local storage. LocalStorage is not available",
      );
      return;
    }

    this.initMessagesState();
    this.initLayoutState();
    this.initAgentState();
  }

  public saveMessages(messages: LightbotMessage[], callback?: () => void) {
    this.state.messages = this.state.messages.concat(messages);
    this.updateMessagesStorage();
    if (callback) {
      callback();
    }
  }

  public popMessage(callback?: () => void) {
    const message = this.state.messages.pop();
    this.updateMessagesStorage();
    if (callback) {
      callback();
    }
    return message;
  }

  public get messages() {
    return this.state.messages;
  }

  /**
   * Interface to override existing or create new layout property values
   * @param layout Overrides to layout store
   */
  public updateLayout(layout: LayoutState) {
    this.state.layout = Object.assign({}, this.state.layout, layout);
    this.updateLayoutStorage();
  }

  public get layout() {
    return this.state.layout;
  }

  public updateAgent(agent: AgentState) {
    this.state.agent = Object.assign({}, this.state.agent, agent);
    this.updateAgentStorage();
  }

  public get agent() {
    return this.state.agent;
  }

  public resetState() {
    this.clearMessagesState();
    this.clearLayoutState();
    this.clearAgentState();
  }

  private initMessagesState() {
    const messages = localStorage.getItem(StateManager.keys.messages);

    if (!messages) {
      localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
    } else {
      try {
        this.state.messages = this.deserialize(messages);
      } catch (err) {
        localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
        console.warn(
          "An error occurred while initalizing message storage. The message history was reset",
        );
      }
    }
  }

  private updateMessagesStorage() {
    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    const messages = localStorage.getItem(StateManager.keys.messages);

    if (!messages) {
      localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
      console.warn(
        "An error occurred while removing last message. The messages history was reset.",
      );
      return;
    }

    localStorage.setItem(StateManager.keys.messages, this.serialize(this.state.messages));
  }

  private clearMessagesState() {
    this.state.messages = initialState.messages;

    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    localStorage.removeItem(StateManager.keys.messages);
  }

  private initLayoutState() {
    const layout = localStorage.getItem(StateManager.keys.layout);

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

  private updateLayoutStorage() {
    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    const layout = localStorage.getItem(StateManager.keys.layout);

    if (!layout) {
      localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
      console.warn("An error occurred while removing last message. The layout was reset.");
    }

    localStorage.setItem(StateManager.keys.layout, this.serialize(this.state.layout));
  }

  private clearLayoutState() {
    this.state.layout = initialState.layout;

    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    localStorage.removeItem(StateManager.keys.layout);
  }

  private initAgentState() {
    const agent = localStorage.getItem(StateManager.keys.agent);

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

  private updateAgentStorage() {
    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    const agent = localStorage.getItem(StateManager.keys.agent);

    if (!agent) {
      localStorage.setItem(StateManager.keys.agent, this.serialize([]));
      throw new Error("An error occurred while updating agent. The agent was reset.");
    }

    localStorage.setItem(StateManager.keys.agent, this.serialize(this.state.agent));
  }

  private clearAgentState() {
    this.state.agent = initialState.agent;

    if (!this.state.isLocalStorageAvailable) {
      return;
    }

    localStorage.removeItem(StateManager.keys.agent);
  }

  /**
   * Returns true if LocalStorage is available
   */
  private testLocalStorage() {
    if (this.state.isLocalStorageAvailable !== undefined) {
      return this.state.isLocalStorageAvailable;
    }

    const testKey = "localstorage_test_key";
    const testValue = "localstorage_test_value";
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

  private serialize(value: any) {
    return JSON.stringify(value);
  }

  private deserialize(value: any) {
    return JSON.parse(value);
  }
}
