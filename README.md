# Lightbot.js

## About

Lightbot.js is a client javascript SDK
> It allows the developer to easily communicate with any lightbot agent.

## Example

```typescript
import { LightbotMessenger } from "lightbot";

const lightbotMessenger = new LightbotMessenger({
  hostURL: "http://localhost:9000",
  agentId: "agent-id",
});

lightbotMessenger.toggleMessenger();

lightbotMessenger.sendMessage({
  type: "plain",
  sender: "human",
  label: "Hello, I need some help!",
});
```

## API Reference

| Property        | Description                                     | Type                             |
|-----------------|-------------------------------------------------|----------------------------------|
| messages        | Message history                                 | Message                          |
| sendMessage     | Sends a message to the bot                      | Function(message: Message): void |
| toggleMessenger | Toggles messenger open state                    | Function()                       |
| isMessengerOpen | Current open state                              | Boolean                          |
| onChange        | Called when any primitive property gets updated | Function(): void                 |

## Message Type

| Property | Description                   | Value                         |
|----------|-------------------------------|-------------------------------|
| sender   | Message sender identification | `"bot" \| "human"`            |
| type     | Type of message               | `"plain" \| "link" \| "jump"` |

when `type: "plain"`:

| Property | Description        | Type   |
|----------|--------------------|--------|
| label    | Plain text message | string |

when `type: "link"`:

| Property | Description               | Type   |
|----------|---------------------------|--------|
| label    | Representative link label | string |
| link     | link                      | string |

when `type: "jump"`:

| Property | Description               | Type                                     |
|----------|---------------------------|------------------------------------------|
| label    | Representative jump label | string                                   |
| jumps    | link                      | Array<{ label: string; event: string; }> |


## `withLightbotMessenger` HOC

Lightbot.js provides a React HOC which can be used to provide a communication interface to your React components.

`withLightbotMessenger<ComponentProps>(options: { agentId: string; hostURL: string; })(Component)`

### How to use

React components are exported from `lib/lightbot-react`.

```js
import {
  LightbotMessage,
  LightbotMessengerDecoratedProps,
  withLightbotMessenger
} from "lightbot/lib/lightbot-react";

type AppProps = LightbotMessengerDecoratedProps & {
  children: any;
}

class AppDisconnected extends Component<AppProps, {}> {
  public render() {
    const { messages, isMessengerOpen, toggleMessenger } = this.props;
    return (
      <>
        {
          isMessengerOpen ? 
          (<ChatWindow
            messages={messages}
            onMessageSend={this.sendMessage}
          />) : 
          null
        }
        <button onClick={toggleMessenger}>
          {isMessengerOpen ? "close" : "open"}
        </button>
      </>
    );
  }

  private sendMessage = (message: string) => {
    this.props.sendMessage({ type: "plain", label: message });
  }
}

export const App = withLightbotMessenger<AppProps>({
  hostURL: "https://localhost:9000",
  agentId: "agent-id"
})(AppDisconnected);

```

### Live Example

[![Edit ⚡️Lightbot Chat Widget Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/94wwqz6lxp)

### Injected props

`withLightbotMessenger` injects the same props as the one defined by the [Lightbot API](#API-Reference) except the onChange is implemented in order to update your React components when any update is available.

### License

[Apache-2.0](LICENSE)
