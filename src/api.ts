import { fetch } from "cross-fetch";

import { APIAgentData, APIMessage } from "./api.types";

export class LightbotAPI {
  constructor(private hostURL: string, private agentId: string) {}

  /**
   * Initializes a new bot conversation
   */
  public postStartConversation = async (): Promise<APIMessage[] | undefined> => {
    try {
      const response = await this.post("/start", {
        lightbot_agent_id: this.agentId,
      });
      const body = await response.json();
      if (body.data && body.data.bot) {
        return body.data.bot as APIMessage[];
      }
    } catch (err) {
      throw new Error("An error occurred while starting conversation.");
    }
    return undefined;
  };

  /**
   * Gets agent data, e.g. theme, logo, etc.
   */
  public async getAgentData(): Promise<APIAgentData | undefined> {
    try {
      const response = await this.get(`/agent-data?lightbot_agent_id=${this.agentId}`);

      const body = await response.json();
      if (body.data) {
        return body.data as APIAgentData;
      }
    } catch (err) {
      throw new Error("An error occurred while fetching agent data.");
    }

    return undefined;
  }

  /**
   * Sends a message and gets a reply back
   * @param message string value the user typed
   */
  public async postMessage(message: string): Promise<APIMessage[] | undefined> {
    try {
      const response = await this.post("", {
        human: message,
        lightbot_agent_id: this.agentId,
      });

      const body = await response.json();
      if (body.data && body.data.bot) {
        return body.data.bot as APIMessage[];
      }
    } catch (err) {
      throw new Error("An error occurred while sending a message.");
    }
    return undefined;
  }

  /**
   * Sends a jump id and gets a reply back
   * @param jump id the user selected from jump options
   */
  public async postJump(jump: string): Promise<APIMessage[] | undefined> {
    try {
      const response = await this.post("/jump", {
        jump,
        lightbot_agent_id: this.agentId,
      });

      const body = await response.json();
      if (body.data && body.data.bot) {
        return body.data.bot as APIMessage[];
      }
    } catch (err) {
      throw new Error("An error occured while sending a jump.");
    }

    return undefined;
  }

  private post = async (endpoint: string, body: object) => {
    return await fetch(`${this.hostURL}${endpoint}`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  private async get(endpoint: string) {
    return await fetch(`${this.hostURL}${endpoint}`);
  }
}
