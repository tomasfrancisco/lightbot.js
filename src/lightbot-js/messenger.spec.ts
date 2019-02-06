import { LightbotMessenger } from "./messenger";

describe("messenger instance", () => {
  let messenger: LightbotMessenger;

  beforeEach(() => {
    messenger = new LightbotMessenger({ hostURL: "host-url", agentId: "agent-id" });
  });

  it("initializes isMessengerOpen with status false", () => {
    expect(messenger.isMessengerOpen).toBeFalsy();
  });

  it("toggles isMessengerOpen on toggleMessenger", () => {
    messenger.toggleMessenger();
    expect(messenger.isMessengerOpen).toBeTruthy();
  });
});
