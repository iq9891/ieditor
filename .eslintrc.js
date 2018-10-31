// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: "airbnb-base",
  globals: {
    "ENV": true,
  },
  // add your custom rules here
  "rules": {
    "import/no-unresolved": 0,
    "spaced-comment": "off",
    "no-dupe-keys": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-console": "off",
    "no-plusplus": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": ["error", { "props": false }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
}
