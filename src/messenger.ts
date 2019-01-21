import { LightbotAPI } from "./api";
import { StateManager } from "./state-manager";
import { APIMessage } from "./api.types";

export type Message = APIMessage & {
  sender: "human" | "bot" | "supporter";
};

type MessageListenerHandler = (messages: Message[]) => void;

interface LightbotMessengerProps {
  hostURL: string;
  agentId: string;
  messageListener?: MessageListenerHandler;
}

export class LightbotMessenger {
  private stateManager: StateManager;
  private apiClient: LightbotAPI;
  private messageListener?: MessageListenerHandler;

  constructor({ hostURL, agentId, messageListener }: LightbotMessengerProps) {
    this.stateManager = new StateManager();
    this.apiClient = new LightbotAPI(hostURL, agentId);
    if (messageListener) {
      this.messageListener = messageListener;
    }
  }

  /**
   * It will set the messenger state as open and initialize conversation
   * in case it's needed.
   */
  public async toggleMessenger() {
    if (!this.stateManager.agent.isInitialized) {
      await this.initMessenger();
      await this.stateManager.updateAgent({ isInitialized: true });
    }

    this.stateManager.updateLayout({
      isMessengerOpen: !this.stateManager.layout.isMessengerOpen,
    });
  }

  public get isOpen() {
    return this.stateManager.layout.isMessengerOpen;
  }

  public async sendMessage(message: Message) {
    try {
      let response;
      if (message.type === "jump") {
        response = await this.apiClient.postJump(message.label);
      } else {
        response = await this.apiClient.postMessage(message.label);
      }
      if (response) {
        this.stateManager.saveMessage({
          ...response,
          sender: "bot",
        });

        this.pushUpdate();
      }
    } catch (err) {
      throw new Error("An error occurred sending a message.");
    }
  }

  /**
   * Notifies the subscriber with the updated messages
   */
  private pushUpdate() {
    if (this.messageListener) {
      this.messageListener(this.stateManager.messages);
    }
  }

  private async initMessenger() {
    try {
      const response = await this.apiClient.postStartConversation();
      if (response) {
        this.stateManager.saveMessage({
          ...response,
          sender: "bot",
        });

        this.pushUpdate();
      }
    } catch (err) {
      throw new Error("An error occurred initializing messenger.");
    }
  }
}
