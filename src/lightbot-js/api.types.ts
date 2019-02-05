export type MessageTypeEnum = "plain" | "link" | "jump";

interface IMessage {
  type: MessageTypeEnum;
}

export interface APIPlainMessage extends IMessage {
  label: string;
}

export interface APILinkMessage extends IMessage {
  label: string;
  link: string;
}

export interface APIJumpMessage extends IMessage {
  label: string;
  jumps: Array<{
    label: string;
    event: string;
  }>;
}

export type APIMessage = APIPlainMessage | APILinkMessage | APIJumpMessage;

export interface APIAgentData {
  name?: string;
  widgetInputPlaceholder?: string;
  widgetTeaser?: string;
  widgetThemeData?: { [propName: string]: string };
  widgetHotspotIcon?: string;
}
