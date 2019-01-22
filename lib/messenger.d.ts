import { APIMessage } from "./api.types";
export declare type Message = APIMessage & {
    sender: "human" | "bot" | "supporter";
};
declare type MessageListenerHandler = (messages: Message[]) => void;
export interface LightbotMessengerProps {
    hostURL: string;
    agentId: string;
    messageListener?: MessageListenerHandler;
}
export declare class LightbotMessenger {
    private stateManager;
    private apiClient;
    private messageListener?;
    constructor({ hostURL, agentId, messageListener }: LightbotMessengerProps);
    /**
     * It will set the messenger state as open and initialize conversation
     * in case it's needed.
     */
    toggleMessenger(): Promise<void>;
    readonly isOpen: boolean | undefined;
    sendMessage(message: Message): Promise<void>;
    /**
     * Notifies the subscriber with the updated messages
     */
    private pushUpdate;
    private initMessenger;
}
export {};
