// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // テスト対象のファイルを指定
  testMatch: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
  // 除外するフォルダーを指定する
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  // テスト実行前に実行するファイルを指定
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleNameMapper: {
    // "@/*": [
    // 	"./src/*"
    // ],
    // "$/*": [
    // 	"./src/components/*"
    // ]
    // aliasを定義 （tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^$/(.*)$": "<rootDir>/src/components/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        module: {
          type: "commonjs", // 出力するファイルをcommonjsとする
        },
      },
    ],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
