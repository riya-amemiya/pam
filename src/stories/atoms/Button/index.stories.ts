import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["atoms", "button", "autodocs"],
  argTypes: {
    variant: {
      control: {
        control: "select",
        options: ["contained", "outlined", "text"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Small: Story = {
  args: {
    children: "Button",

    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Button",

    size: "default",
  },
};

export const Large: Story = {
  args: {
    children: "Button",

    size: "lg",
  },
};
