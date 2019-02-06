import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import { LightbotMessengerDecoratedProps, withLightbotMessenger } from "./withLightbotMessenger";

type TestComponentProps = LightbotMessengerDecoratedProps & {
  label: string;
  children: any;
};

class TestComponent extends React.Component<TestComponentProps> {
  public componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  public render() {
    const { children, isMessengerOpen } = this.props;
    return (
      <>
        <span>{children}</span>
        <button onClick={this.onClick}>{isMessengerOpen.toString()}</button>
      </>
    );
  }

  private onClick = () => {
    this.props.toggleMessenger();
  };
}

describe("withLightbotMessenger", () => {
  const children = "children-test-content";
  const label = "label-test";
  const agentId = "agent-id";
  const hostURL = "host-url";

  let component: ShallowWrapper;

  beforeEach(() => {
    const ClassComponent = withLightbotMessenger<TestComponentProps>({ agentId, hostURL })(
      TestComponent,
    );

    component = shallow(<ClassComponent label={label}>{children}</ClassComponent>);
  });

  it("renders wrapped component children", () => {
    expect(
      component
        .dive()
        .find("span")
        .text(),
    ).toEqual(children);
  });

  it("passes the wrapped component props down", () => {
    expect(component.find(TestComponent).props()).toHaveProperty("label", label);
  });

  it("isMessengerOpen initialized as false", () => {
    expect(
      component
        .find(TestComponent)
        .dive()
        .find("button")
        .text(),
    ).toBe("false");
  });

  it("isMessengerOpen gets toggled", () => {
    component
      .find(TestComponent)
      .dive()
      .find("button")
      .simulate("click");

    setTimeout(() => {
      component.update();

      expect(
        component
          .find(TestComponent)
          .dive()
          .find("button")
          .text(),
      ).toBe("true");
    }, 100);
  });
});
