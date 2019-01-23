export type MessageTypeEnum = "plain" | "link" | "jump" | "decorated";

interface IMessage {
  type: MessageTypeEnum;
  label: string;
}

export interface APIPlainMessage extends IMessage {}

export interface APILinkMessage extends IMessage {
  link: string;
}

export interface APIJumpMessage extends IMessage {
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
