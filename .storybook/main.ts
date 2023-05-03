import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-mdx-gfm",
		"@storybook/addon-viewport",
		{
			name: "storybook-addon-next",
			options: {
				nextConfigPath: path.resolve(__dirname, "../next.config.js"),
			},
		},
	],
	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@": path.resolve(__dirname, "../src"),
				$: path.resolve(__dirname, "../src/components"),
			};
		}
		return config;
	},
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
};
export default config;
