import * as React from "react";
import { LightbotMessage, LightbotMessenger } from "../lightbot-js";
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

export function withLightbotMessenger<C extends LightbotMessengerDecoratedProps>(
  messengerProps: LightbotMessengerProps,
) {
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
  type Subtract<T, K> = Omit<T, keyof K>;
  type WrapperProps = Subtract<C, LightbotMessengerDecoratedProps>;

  return (Component: React.ComponentClass<C>): React.ComponentClass<WrapperProps> =>
    class LightbotDecorator extends React.Component<WrapperProps> {
      private messenger: LightbotMessenger;

      constructor(props: WrapperProps) {
        super(props);

        this.messenger = new LightbotMessenger({
          ...messengerProps,
          onChange: this.updateHandler,
        });
      }

      public render() {
        return (
          <Component
            {...this.props as C}
            isMessengerOpen={this.messenger.isOpen}
            messages={this.messenger.messages}
            sendMessage={this.messenger.sendMessage}
            toggleMessenger={this.toggleMessenger}
          />
        );
      }

      private updateHandler = () => {
        this.forceUpdate();
      };

      private toggleMessenger = () => {
        this.messenger.toggleMessenger();
      };
    };
}
