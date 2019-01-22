import { APIAgentData, APIMessage } from "./api.types";
export declare class LightbotAPI {
    private hostURL;
    private agentId;
    constructor(hostURL: string, agentId: string);
    /**
     * Initializes a new bot conversation
     */
    postStartConversation(): Promise<APIMessage[] | undefined>;
    /**
     * Gets agent data, e.g. theme, logo, etc.
     */
    getAgentData(): Promise<APIAgentData | undefined>;
    /**
     * Sends a message and gets a reply back
     * @param message string value the user typed
     */
    postMessage(message: string): Promise<APIMessage[] | undefined>;
    /**
     * Sends a jump id and gets a reply back
     * @param jump id the user selected from jump options
     */
    postJump(jump: string): Promise<APIMessage[] | undefined>;
    private post;
    private get;
}
