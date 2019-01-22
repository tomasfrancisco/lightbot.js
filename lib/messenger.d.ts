import { APIMessage } from "./api.types";
export declare type Message = APIMessage & {
    sender: "human" | "bot" | "supporter";
};
export declare type UpdateListenerHandler = () => void;
export interface LightbotMessengerProps {
    hostURL: string;
    agentId: string;
    updateListener?: UpdateListenerHandler;
}
export declare class LightbotMessenger {
    private stateManager;
    private apiClient;
    private updateListener?;
    constructor({ hostURL, agentId, updateListener: messageListener }: LightbotMessengerProps);
    /**
     * It will set the messenger state as open and initialize conversation
     * in case it's needed.
     */
    toggleMessenger: () => Promise<void>;
    readonly isOpen: boolean | undefined;
    readonly messages: Message[];
    sendMessage: (message: Message) => Promise<void>;
    /**
     * Notifies the subscriber with the updated messages
     */
    private pushUpdate;
    private initMessenger;
}
