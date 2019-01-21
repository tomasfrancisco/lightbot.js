# Lightbot.js

## Example

```typescript
import LightbotMessenger from "lightbot";

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

| Property        | Description                   | Type                       |
|:----------------|:------------------------------|:---------------------------|
| sendMessage     | Send a message to the service | Function(message: Message) |
| toggleMessenger | Toggle messenger open state   | Function()                 |
| isOpen          | Current open state            | Boolean                    |
