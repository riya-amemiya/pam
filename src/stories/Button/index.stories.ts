import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
<<<<<<< HEAD
	title: "Example/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: {
				control: "select",
				options: ["contained", "outlined", "text"],
			},
		},
	},
=======
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
>>>>>>> 7809b4eefe06ba7df37c9b6ce6f9574aa3a0c5f1
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Small: Story = {
<<<<<<< HEAD
	args: {
		children: "Button",
		size: "small",
		color: "primary",
		variant: "contained",
	},
};

export const Medium: Story = {
	args: {
		children: "Button",
		size: "medium",
		color: "primary",
		variant: "contained",
	},
};

export const Large: Story = {
	args: {
		children: "Button",
		size: "large",
		color: "primary",
		variant: "contained",
	},
=======
  args: {
    children: "Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    size: "large",
  },
>>>>>>> 7809b4eefe06ba7df37c9b6ce6f9574aa3a0c5f1
};
