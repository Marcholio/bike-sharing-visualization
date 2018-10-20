module.exports = {
  env: {
    browser: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    indent: ["error", "spaces"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
