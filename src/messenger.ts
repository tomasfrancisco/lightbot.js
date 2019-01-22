import { LightbotAPI } from "./api";
import { APIMessage } from "./api.types";
import { StateManager } from "./state-manager";

export type Message = APIMessage & {
  sender: "human" | "bot" | "supporter";
};

type MessageListenerHandler = (messages: Message[]) => void;

export interface LightbotMessengerProps {
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
  public async toggleMessenger(): Promise<void> {
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

  public async sendMessage(message: Message): Promise<void> {
    try {
      let messagesResponse: APIMessage[] | undefined;
      if (message.type === "jump") {
        messagesResponse = await this.apiClient.postJump(message.label);
      } else {
        messagesResponse = await this.apiClient.postMessage(message.label);
      }
      if (messagesResponse) {
        const messages: Message[] = messagesResponse.map<Message>(messageResponse => ({
          ...messageResponse,
          sender: "bot",
        }));

        this.stateManager.saveMessages(messages);

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
      const messagesResponse = await this.apiClient.postStartConversation();
      if (messagesResponse) {
        const messages: Message[] = messagesResponse.map<Message>(message => ({
          ...message,
          sender: "bot",
        }));

        this.stateManager.saveMessages(messages);

        this.pushUpdate();
      }
    } catch (err) {
      throw new Error("An error occurred initializing messenger.");
    }
  }
}
