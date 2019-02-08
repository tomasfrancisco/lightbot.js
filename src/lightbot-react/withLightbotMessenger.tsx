import { APIMessage } from "lightbot-js/api.types";
import * as React from "react";

import { LightbotMessage, LightbotMessenger } from "../lightbot-js";

export { LightbotMessage };

export interface LightbotMessengerProps {
  hostURL: string;
  agentId: string;
}

export interface LightbotMessengerDecoratedProps extends LightbotMessenger {}

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
            isMessengerOpen={this.messenger.isMessengerOpen}
            messages={this.messenger.messages}
            sendMessage={this.sendMessage}
            toggleMessenger={this.toggleMessenger}
            resetAgent={this.resetAgent}
          />
        );
      }

      private updateHandler = () => {
        this.forceUpdate();
      };

      private sendMessage = (message: APIMessage) => {
        this.messenger.sendMessage(message);
      };

      private toggleMessenger = () => {
        this.messenger.toggleMessenger();
      };
      private resetAgent = () => {
        this.messenger.resetAgent();
      };
    };
}
