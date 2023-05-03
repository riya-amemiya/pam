const withInterceptStdout = require("next-intercept-stdout");
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: false,
	},
	serverRuntimeConfig: {
		// Will only be available on the server side
		mySecret: "secret",
		key: process.env.AUTH_KEY, // Pass through env variables
	},
	env: {
		BACKEND_URL: process.env.BACKEND_BASE_URL,
	},
};

module.exports = withInterceptStdout(nextConfig, (text) =>
	text.includes("Duplicate atom key") ? "" : text,
);
