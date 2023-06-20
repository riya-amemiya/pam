import type { Meta, StoryObj } from "@storybook/react";

import { Looding } from "./Looding";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Looding> = {
<<<<<<< HEAD
	title: "Example/Looding",
	component: Looding,
	tags: ["autodocs"],
	argTypes: {
		borderColor: { control: "color" },
	},
=======
  title: "Example/Looding",
  component: Looding,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
>>>>>>> 7809b4eefe06ba7df37c9b6ce6f9574aa3a0c5f1
};

export default meta;
type Story = StoryObj<typeof Looding>;

export const Primary: Story = {
  args: {},
};
