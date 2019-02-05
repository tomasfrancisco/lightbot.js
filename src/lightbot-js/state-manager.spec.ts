import { LightbotMessage } from "./messenger";
import { AgentState, LayoutState, StateManager } from "./state-manager";

describe("StateManager", () => {
  describe("localStorage unavailable", () => {
    it("not throw any error on constructor", () => {
      const call = () => new StateManager();
      expect(call).not.toThrow();
    });

    describe("messages", () => {
      let stateManager: StateManager;

      beforeEach(() => {
        stateManager = new StateManager();
      });

      it("adds new message when message is saved", () => {
        const message: LightbotMessage = { sender: "human", label: "test message", type: "plain" };
        stateManager.saveMessages([message]);

        expect(stateManager.messages[0]).toMatchObject(message);
      });

      it("removes message when it pops", () => {
        stateManager.popMessage();

        expect(stateManager.messages[0]).toBeUndefined();
      });
    });

    describe("layout", () => {
      let stateManager: StateManager;
      const initialLayout: LayoutState = { isMessengerOpen: false };
      const overrideLayout: LayoutState = { someValue: true };

      beforeEach(() => {
        stateManager = new StateManager();
        stateManager.updateLayout(initialLayout);
      });

      it("adds layout properties", () => {
        stateManager.updateLayout(overrideLayout);
        expect(stateManager.layout).toEqual({ ...initialLayout, ...overrideLayout });
      });

      it("overrides a property", () => {
        stateManager.updateLayout({ isMessengerOpen: true });
        expect(stateManager.layout.isMessengerOpen).toBeTruthy();
      });
    });
  });

  describe("localstorage available", () => {
    beforeEach(() => {
      require("jest-localstorage-mock");
      localStorage.clear();
    });

    describe("with clean localStorage", () => {
      it("initializes empty messages storage", () => {
        expect(new StateManager().messages).toHaveLength(0);
      });
    });

    describe("constructor when existing localStorage", () => {
      let initialMessages: LightbotMessage[];
      let initialLayout: LayoutState;
      let initialAgent: AgentState;
      let stateManager: StateManager;

      beforeEach(() => {
        initialMessages = [{ type: "plain", sender: "bot", label: "Test message from bot" }];
        initialLayout = { isMessengerOpen: true };
        initialAgent = { isInitialized: true };
        localStorage.setItem(StateManager.keys.messages, JSON.stringify(initialMessages));
        localStorage.setItem(StateManager.keys.layout, JSON.stringify(initialLayout));
        localStorage.setItem(StateManager.keys.agent, JSON.stringify(initialAgent));
        stateManager = new StateManager();
      });

      it("initializes messages from localStorage", () => {
        expect(stateManager.messages).toEqual(initialMessages);
      });

      it("initializes layout from localStorage", () => {
        expect(stateManager.layout).toEqual(initialLayout);
      });

      it("initializes agent from localStorage", () => {
        expect(stateManager.agent).toEqual(initialAgent);
      });
    });

    describe("messages", () => {
      let stateManager: StateManager;

      beforeEach(() => {
        stateManager = new StateManager();
      });

      it("adds new message when message is saved", () => {
        const message: LightbotMessage = { sender: "human", label: "test message", type: "plain" };
        stateManager.saveMessages([message]);

        expect(stateManager.messages[0]).toMatchObject(message);
      });

      it("removes message when it pops", () => {
        stateManager.popMessage();

        expect(stateManager.messages[0]).toBeUndefined();
      });
    });

    describe("layout", () => {
      let stateManager: StateManager;
      const initialLayout: LayoutState = { isMessengerOpen: false };
      const overrideLayout: LayoutState = { someValue: true };

      beforeEach(() => {
        stateManager = new StateManager();
        stateManager.updateLayout(initialLayout);
      });

      it("adds layout properties", () => {
        stateManager.updateLayout(overrideLayout);
        expect(stateManager.layout).toEqual({ ...initialLayout, ...overrideLayout });
      });

      it("overrides a property", () => {
        stateManager.updateLayout({ isMessengerOpen: true });
        expect(stateManager.layout.isMessengerOpen).toBeTruthy();
      });
    });
  });
});
