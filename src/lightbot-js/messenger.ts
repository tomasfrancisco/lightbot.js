import { v4 as uuid } from "uuid";

import { LightbotAPI } from "./api";
import { APIMessage } from "./api.types";
import { StateManager } from "./state-manager";

export type LightbotMessage = APIMessage & {
  sender: "bot" | "human";
};

export type Message = APIMessage;

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
    this.apiClient = new LightbotAPI(
      hostURL,
      agentId,
      // TODO: Remove when backend gets rid of session and user ids
      uuid(),
      // TODO: Remove when backend gets rid of session and user ids
      uuid(),
    );
    if (onChange) {
      this.onChange = onChange;
    }

    this.initAgent();
  }

  /**
   * It will set the UI messenger state (Open or Close)
   */
  public toggleMessenger = async (): Promise<void> => {
    this.stateManager.updateLayout({
      isMessengerOpen: !this.stateManager.layout.isMessengerOpen,
    });

    this.pushUpdate();
  };

  public get isMessengerOpen(): boolean {
    return !!this.stateManager.layout.isMessengerOpen;
  }

  public get messages(): LightbotMessage[] {
    return this.stateManager.messages;
  }

  public sendMessage = async (message: Message): Promise<void> => {
    if (!this.stateManager.agent.isInitialized) {
      throw new Error(
        `
          Lightbot messenger was not initialized.
          Please refresh the page or make sure LightbotMessenger instance is correctly initialized.
        `,
      );
    }

    this.stateManager.saveMessages([{ ...message, sender: "human" }], this.pushUpdate);

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

  public resetAgent = () => {
    this.stateManager.resetState();
    this.pushUpdate();
  };

  /**
   * Triggers an opening message from the bot.
   */
  private initAgent = async () => {
    if (this.stateManager.agent.isInitialized) {
      console.warn("Lightbot messenger was already initialized.");
      return;
    }

    try {
      const messagesResponse = await this.apiClient.postStartMessenger();
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

      await this.stateManager.updateAgent({ isInitialized: true });
    } catch (err) {
      console.warn("An error occurred initializing messenger.");
    }

    await this.stateManager.updateAgent({ isInitialized: true });

    this.pushUpdate();
  };

  /**
   * Notifies the subscriber with the updated messages
   */
  private pushUpdate = () => {
    if (this.onChange) {
      setTimeout(this.onChange, 0);
    }
  };
}
