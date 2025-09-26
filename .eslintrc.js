module.exports = {
  extends: "next",
  rules: {
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-require-imports": "off",
    "no-unused-expressions": "off",
  },
  ignorePatterns: [
    "app/generated/**/*", // Ignore all generated files
    "prisma/generated/**/*", // Ignore prisma generated files
    "**/*.d.ts", // Ignore declaration files
    "**/*.config.js", // Ignore config files
    "**/*.config.ts", // Ignore TypeScript config files
  ],
};
