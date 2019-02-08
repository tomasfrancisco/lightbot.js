import { LightbotMessage } from "./messenger";
import { AgentState, initialState, LayoutState, StateManager } from "./state-manager";

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
      const message: LightbotMessage = { sender: "human", label: "test message", type: "plain" };

      beforeEach(() => {
        stateManager = new StateManager();
      });

      it("adds new message when message is saved", () => {
        stateManager.saveMessages([message]);

        expect(stateManager.messages[stateManager.messages.length - 1]).toMatchObject(message);
      });

      it("removes message when it pops", () => {
        stateManager.saveMessages([message]);

        const previousMessageLength = stateManager.messages.length;
        const poppedMessage = stateManager.popMessage();

        expect(poppedMessage).toEqual(message);
        expect(stateManager.messages.length).toEqual(previousMessageLength - 1);
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

    describe("reset state", () => {
      let stateManager: StateManager;

      const initialMessages: LightbotMessage[] = [
        { type: "plain", sender: "bot", label: "greeting" },
        { type: "plain", sender: "human", label: "hello" },
      ];

      const initialLayout: LayoutState = {
        isMessengerOpen: true,
      };

      const initialAgent: AgentState = {
        id: "agent-id",
      };

      beforeEach(() => {
        localStorage.setItem(StateManager.keys.messages, JSON.stringify(initialMessages));
        localStorage.setItem(StateManager.keys.layout, JSON.stringify(initialLayout));
        localStorage.setItem(StateManager.keys.agent, JSON.stringify(initialAgent));

        stateManager = new StateManager();
      });

      it("loads with localStorage", () => {
        expect(stateManager.messages).toEqual(initialMessages);
        expect(stateManager.agent).toEqual(initialAgent);
        expect(stateManager.layout).toEqual(initialLayout);
      });

      it("resets agent state", () => {
        stateManager.resetState();
        expect(stateManager.messages).toEqual(initialState.messages);
        expect(stateManager.agent).toEqual(initialState.agent);
        expect(stateManager.layout).toEqual(initialState.layout);
      });
    });
  });
});
