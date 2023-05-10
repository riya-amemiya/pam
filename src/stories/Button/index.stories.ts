import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
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
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Small: Story = {
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
};
