import { getByText, render } from "@testing-library/react";

import { Button } from ".";

test("Button component should render correctly", () => {
  const { container } = render(<Button>Click me</Button>);

  const buttonElement = getByText(container, "Click me");
  expect(buttonElement).toBeInTheDocument();
});
