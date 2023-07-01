import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Loading> = {
  title: "Example/Looding",
  component: Loading,
  tags: ["autodocs"],
  argTypes: {
    borderColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Primary: Story = {
  args: {},
};
