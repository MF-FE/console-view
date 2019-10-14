module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "parser": "vue-eslint-parser",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
}