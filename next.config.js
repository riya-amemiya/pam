const withInterceptStdout = require("next-intercept-stdout");
const million = require("million/compiler");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    legacyBrowsers: false,
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

module.exports = million.next(
  withInterceptStdout(nextConfig, (text) =>
    text.includes("Duplicate atom key") ? "" : text,
  ),
);
