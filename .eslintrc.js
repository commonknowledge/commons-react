module.exports = {
  root: true,
  env: {
    "shared-node-browser": true,
    commonjs: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "monorepo", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/typescript",
    "plugin:monorepo/recommended",
  ],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-unused-vars": [1, { varsIgnorePattern: "^_.*$" }],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "import/order": [1, { "newlines-between": "always" }],
  },
  ignorePatterns: ["packages/*/dist/**", "packages/*/api/**", "*.spec.ts"],
  settings: {
    react: {
      pragma: "jsx", // Pragma to use, default to "React"
      version: "detect",
    },
  },
};
