import type { Meta, StoryObj } from "@storybook/react";

import { Looding } from "./Looding";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Looding> = {
  title: "Example/Looding",
  component: Looding,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Looding>;

export const Primary: Story = {
  args: {},
};
