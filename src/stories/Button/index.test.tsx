import { getByText, render } from "@testing-library/react";
import { Button } from ".";

test("Button component should render correctly", () => {
  const { container } = render(<Button>Click me</Button>);

  const buttonElement = getByText(container, "Click me");
  expect(buttonElement).toBeInTheDocument();
});

test("Button component should have the correct default styles", () => {
  const { container } = render(<Button>Click me</Button>);

  const buttonElement = getByText(container, "Click me");
  expect(buttonElement).toHaveClass(
    "bg-blue-500 hover:bg-blue-700 rounded text-white text-base w-30",
  );
});

test("Button component should apply color variant correctly", () => {
  const { container } = render(<Button color="secondary">Click me</Button>);

  const buttonElement = getByText(container, "Click me");
  expect(buttonElement).toHaveClass(
    "bg-white text-blue-500 hover:bg-blue-500 hover:text-white",
  );
});

test("Button component should apply size variant correctly", () => {
  const { container } = render(<Button size="small">Click me</Button>);

  const buttonElement = getByText(container, "Click me");
  expect(buttonElement).toHaveClass("text-xs w-20");
});
