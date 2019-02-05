import { LightbotMessenger, Message } from "./messenger";

describe("messenger", () => {
  const plainMessage: Message = { type: "plain", label: "Hello Test" };
  let messenger: LightbotMessenger;

  beforeEach(() => {
    messenger = new LightbotMessenger({ agentId: "agent-id", hostURL: "host-url" });
  });

  describe("when not initialized", () => {
    it("throws when sending message", () => {
      const call = async () => await messenger.sendMessage(plainMessage);
      expect(call()).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe("when initialized", () => {
    beforeEach(async () => {
      await messenger.startMessenger();
    });

    it("doesn't throw when sending message", () => {
      const call = async () => await messenger.sendMessage(plainMessage);
      expect(call).not.toThrow();
    });
  });
});
