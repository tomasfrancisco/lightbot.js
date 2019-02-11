import { APIAgentData } from "lightbot-js/api.types";

import { LocalStorage } from "./local-storage";
import { LightbotMessage } from "./messenger";

export interface LayoutState {
  isMessengerOpen?: boolean;
  [propName: string]: any;
}

export type AgentState = APIAgentData & {
  agentId: string;
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

export const getInitialState = (agentId: string): StoreState => ({
  agent: {
    agentId,
    isInitialized: false,
  },
  layout: {
    isMessengerOpen: false,
  },
  messages: [],
});
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

  private localStorage: LocalStorage;

  private readonly state: StoreState;

  constructor(private agentId: string) {
    if (!agentId) {
      throw new Error("agentId is not defined.");
    }

    this.localStorage = new LocalStorage();

    this.state = getInitialState(this.agentId);
    this.initState();
  }

  public saveMessages(messages: LightbotMessage[], callback?: () => void) {
    this.state.messages = this.state.messages.concat(messages);
    // Update local storage
    this.localStorage.setItem(StateManager.keys.messages, this.state.messages);

    if (callback) {
      callback();
    }
  }

  public popMessage(callback?: () => void) {
    const message = this.state.messages.pop();
    // Update local storage
    this.localStorage.setItem(StateManager.keys.messages, this.state.messages);

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
    // Update local storage
    this.localStorage.setItem(StateManager.keys.layout, this.state.layout);
  }

  public get layout() {
    return this.state.layout;
  }

  public updateAgent(agent: Partial<AgentState>) {
    this.state.agent = Object.assign({}, this.state.agent, agent);
    // Update local storage
    this.localStorage.setItem(StateManager.keys.agent, this.state.agent);
  }

  public get agent() {
    return this.state.agent;
  }

  public resetState() {
    this.clearMessagesState();
    this.clearLayoutState();
    this.clearAgentState();
  }

  private clearMessagesState() {
    this.state.messages = getInitialState(this.agentId).messages;
    // Update local storage
    this.localStorage.setItem(StateManager.keys.messages, this.state.messages);
  }

  private clearLayoutState() {
    this.state.layout = getInitialState(this.agentId).layout;
    // Update local storage
    this.localStorage.setItem(StateManager.keys.layout, this.state.layout);
  }

  private initState() {
    const agent = this.localStorage.getItem<AgentState>(StateManager.keys.agent);

    if (!agent) {
      this.localStorage.setItem(StateManager.keys.agent, this.state.agent);
      this.localStorage.setItem(StateManager.keys.messages, this.state.messages);
      this.localStorage.setItem(StateManager.keys.layout, this.state.layout);
    } else {
      if (this.agentId && agent.agentId === this.agentId) {
        this.state.agent = agent;

        this.state.messages =
          this.localStorage.getItem(StateManager.keys.messages) ||
          getInitialState(this.agentId).messages;

        this.state.layout =
          this.localStorage.getItem(StateManager.keys.layout) ||
          getInitialState(this.agentId).layout;
      }
    }
  }

  private clearAgentState() {
    this.state.agent = getInitialState(this.agentId).agent;
    // Update local storage
    this.localStorage.setItem(StateManager.keys.agent, this.state.agent);
  }
}
