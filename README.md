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
| sendMessage     | Send a message to the service                   | Function(message: Message): void |
| toggleMessenger | Toggle messenger open state                     | Function()                       |
| isOpen          | Current open state                              | Boolean                          |
| onChange        | Called when any primitive property gets updated | Function(): void                 |

## Using `withLightbotMessenger` React HOC

Lightbot.js exports a React HOC which can be used to provide a communication interface to your React components.

```js
import {
  LightbotMessage,
  LightbotMessengerDecoratedProps,
  withLightbotMessenger
} from "lightbot/lib/lightbot-react";

class AppDisconnected extends Component {
  render() {
    const { messages, sendMessage } = this.props;
    return (
      <Chat
        messages={messages}
        onMessageSend={sendMessage}
      />
    );
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
