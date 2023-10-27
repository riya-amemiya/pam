const { withKumaUI } = require("@kuma-ui/next-plugin");
const million = require("million/compiler");
const withInterceptStdout = require("next-intercept-stdout");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
      ],
    },
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
};

module.exports = withKumaUI(
  million.next(
    withInterceptStdout(nextConfig, (text) =>
      text.includes("Duplicate atom key") ? "" : text,
    ),
  ),
);
