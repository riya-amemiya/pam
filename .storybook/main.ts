import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import KumaUIWebpackPlugin from "@kuma-ui/webpack-plugin";
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
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
  ],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        $: path.resolve(__dirname, "../src/components"),
        "%": path.resolve(__dirname, "../src/app"),
      };
    }
    config.plugins = [...(config.plugins ?? []), new KumaUIWebpackPlugin({})];
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
