import uuid from "uuid/v4";

import { LightbotAPI } from "./api";
import { APIMessage } from "./api.types";
import { StateManager } from "./state-manager";

export type LightbotMessage = APIMessage & {
  sender: "human" | "bot" | "supporter";
};

export type OnChangeHandler = () => void;

export interface LightbotMessengerProps {
  hostURL: string;
  agentId: string;
  onChange?: OnChangeHandler;
}

export class LightbotMessenger {
  private stateManager: StateManager;
  private apiClient: LightbotAPI;
  private onChange?: OnChangeHandler;

  constructor({ hostURL, agentId, onChange }: LightbotMessengerProps) {
    this.stateManager = new StateManager();
    this.apiClient = new LightbotAPI(hostURL, agentId, uuid(), uuid());
    if (onChange) {
      this.onChange = onChange;
    }
  }

  /**
   * It will set the messenger state as open and initialize conversation
   * in case it's needed.
   */
  public toggleMessenger = async (): Promise<void> => {
    if (!this.stateManager.agent.isInitialized) {
      const isInitialized = await this.initMessenger();
      await this.stateManager.updateAgent({ isInitialized });
    }

    this.stateManager.updateLayout({
      isMessengerOpen: !this.stateManager.layout.isMessengerOpen,
    });

    this.pushUpdate();
  };

  public get isOpen() {
    return this.stateManager.layout.isMessengerOpen;
  }

  public get messages() {
    return this.stateManager.messages;
  }

  public sendMessage = async (message: LightbotMessage): Promise<void> => {
    this.stateManager.saveMessages([message], this.pushUpdate);

    try {
      let messagesResponse: APIMessage[] | undefined;
      if (message.type === "jump") {
        messagesResponse = await this.apiClient.postJump(message.label);
      } else {
        messagesResponse = await this.apiClient.postMessage(message.label);
      }

      if (messagesResponse) {
        const messages: LightbotMessage[] = messagesResponse.map<LightbotMessage>(
          messageResponse => ({
            ...messageResponse,
            sender: "bot",
          }),
        );

        this.stateManager.saveMessages(messages, this.pushUpdate);
      }
    } catch (err) {
      this.stateManager.popMessage(this.pushUpdate);
      throw new Error("An error occurred sending a message.");
    }
  };

  /**
   * Notifies the subscriber with the updated messages
   */
  private pushUpdate = () => {
    if (this.onChange) {
      setTimeout(this.onChange, 0);
    }
  };

  private initMessenger = async (): Promise<boolean> => {
    try {
      const messagesResponse = await this.apiClient.postStartConversation();
      if (messagesResponse) {
        const messages: LightbotMessage[] = messagesResponse.map<LightbotMessage>(message => ({
          ...message,
          sender: "bot",
        }));

        this.stateManager.saveMessages(messages, this.pushUpdate);
      }

      const agentData = await this.apiClient.getAgentData();
      if (agentData && typeof agentData === "object") {
        this.stateManager.updateAgent(agentData);
      }

      return true;
    } catch (err) {
      console.warn("An error occurred initializing messenger.");
    }
    return false;
  };
}
