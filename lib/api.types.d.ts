export declare type MessageTypeEnum = "plain" | "link" | "jump" | "decorated";
interface IMessage {
    type: MessageTypeEnum;
    label: string;
}
export interface APIPlainMessage extends IMessage {
}
export interface APILinkMessage extends IMessage {
    link: string;
}
export interface APIJumpMessage extends IMessage {
    jumps: Array<{
        label: string;
        event: string;
    }>;
}
export declare type APIMessage = APIPlainMessage | APILinkMessage | APIJumpMessage;
export declare type APIAgentData = {
    name?: string;
    widgetInputPlaceholder?: string;
    widgetTeaser?: string;
    widgetThemeData?: {
        [propName: string]: string;
    };
    widgetHotspotIcon?: string;
};
export {};
