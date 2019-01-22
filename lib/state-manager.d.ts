import { Message } from "./messenger";
import { APIAgentData } from "api.types";
export declare type LayoutState = {
    isMessengerOpen?: boolean;
    [propName: string]: any;
};
export declare type AgentState = APIAgentData & {
    isInitialized?: boolean;
    [propName: string]: any;
};
/**
 * Internal State for State Manager
 * Some properties are not exposed, so it means the type should not be exposed either
 */
declare type StoreState = {
    isLocalStorageAvailable?: boolean;
    messages: Message[];
    agent: AgentState;
    layout: LayoutState;
};
declare type StoreKeys = {
    [K in keyof StoreState]: string;
};
/**
 * State Manager
 * is responsible for keeping messages and bot agent relative data.
 * Non critical information like messages and agent data is stored in browser storage.
 *
 * Session and User data should be kept under the control of the API - e.g. cookies.
 * WARNING: NEVER USE STATE MANAGER TO DEAL WITH CRITICAL DATA
 */
export declare class StateManager {
    private static salt;
    private static getKey;
    static keys: StoreKeys;
    private state;
    constructor();
    saveMessages(messages: Message[]): void;
    popMessage(): (import("./api.types").APIPlainMessage & {
        sender: "human" | "bot" | "supporter";
    }) | (import("./api.types").APILinkMessage & {
        sender: "human" | "bot" | "supporter";
    }) | (import("./api.types").APIJumpMessage & {
        sender: "human" | "bot" | "supporter";
    }) | undefined;
    readonly messages: Message[];
    /**
     * Interface to override existing or create new layout property values
     * @param layout Overrides to layout store
     */
    updateLayout(layout: LayoutState): void;
    readonly layout: LayoutState;
    updateAgent(agent: AgentState): void;
    readonly agent: AgentState;
    private initMessagesState;
    private updateMessagesStorage;
    private initLayoutState;
    private updateLayoutStorage;
    private initAgentState;
    private updateAgentStorage;
    /**
     * Returns true if LocalStorage is available
     */
    private testLocalStorage;
    private serialize;
    private deserialize;
}
export {};
