import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import { LightbotMessengerDecoratedProps, withLightbotMessenger } from "./withLightbotMessenger";

type TestComponentProps = LightbotMessengerDecoratedProps & {
  label: string;
  children: any;
};

class TestComponent extends React.Component<TestComponentProps> {
  public render() {
    const { children } = this.props;
    return <span>{children}</span>;
  }
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
});
