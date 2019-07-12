module.exports = {

  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  env: {
    browser: true,
  },
  rules: {
    "indent": ["error", 2, { SwitchCase: 1 }],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": [0],
    "arrow-parens": 0,
    // "semi": [0],
  },
  "parser": "babel-eslint",
} 
