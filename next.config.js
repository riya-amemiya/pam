const withInterceptStdout = require("next-intercept-stdout");
const million = require("million/compiler");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
    legacyBrowsers: false,
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
      ],
    },
  },
  // serverRuntimeConfig: {
  // 	mySecret: "secret",
  // 	key: process.env.AUTH_KEY,
  // },
  // env: {
  // 	BACKEND_URL: process.env.BACKEND_BASE_URL,
  // },
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
