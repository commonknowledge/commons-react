/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync, statSync } = require("fs");

const packages = readdirSync("packages");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // Ensure that package modules are referenced as source rather than dist modules.
  // This is needed to workaround some monorepo weirdness where jest is resolving to the .d.ts files
  moduleNameMapper: Object.assign(
    {},
    ...packages.map((p) => {
      if (!statSync(`packages/${p}`).isDirectory()) {
        return {};
      }

      return readdirSync(`packages/${p}/src`).includes("client")
        ? {
            [`^@commonknowledge/common-${p}$`]: `<rootDir>/packages/${p}/src/client`,
          }
        : {
            [`^@commonknowledge/common-${p}$`]: `<rootDir>/packages/${p}/src`,
          };
    })
  ),
  testPathIgnorePatterns: [
    "/node_modules/",
    "/packages/.*/dist/",
    "/packages/.*/api/",
  ],
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.{ts,tsx}", "!**/*.d.ts"],
};
