import { APIMessage } from "./api.types";
export declare type LightbotMessage = APIMessage & {
    sender: "human" | "bot" | "supporter";
};
export declare type OnChangeHandler = () => void;
export interface LightbotMessengerProps {
    hostURL: string;
    agentId: string;
    onChange?: OnChangeHandler;
}
export declare class LightbotMessenger {
    private stateManager;
    private apiClient;
    private onChange?;
    constructor({ hostURL, agentId, onChange }: LightbotMessengerProps);
    /**
     * It will set the messenger state as open and initialize conversation
     * in case it's needed.
     */
    toggleMessenger: () => Promise<void>;
    readonly isOpen: boolean | undefined;
    readonly messages: LightbotMessage[];
    sendMessage: (message: LightbotMessage) => Promise<void>;
    /**
     * Notifies the subscriber with the updated messages
     */
    private pushUpdate;
    private initMessenger;
}
