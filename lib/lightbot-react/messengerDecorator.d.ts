import * as React from "react";
import { LightbotMessage } from "../lightbot-js";
export { LightbotMessage } from "../lightbot-js";
export interface LightbotMessengerProps {
    hostURL: string;
    agentId: string;
}
export interface LightbotMessengerDecoratedProps {
    messages: LightbotMessage[];
    isMessengerOpen: boolean;
    sendMessage(message: LightbotMessage): void;
    toggleMessenger(): void;
}
export declare function withLightbotMessenger<C extends LightbotMessengerDecoratedProps>(messengerProps: LightbotMessengerProps): (Component: React.ComponentClass<C, any>) => React.ComponentClass<Pick<C, Exclude<keyof C, "messages" | "isMessengerOpen" | "sendMessage" | "toggleMessenger">>, any>;
