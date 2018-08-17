// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  /**
   * add your custom rules here
   * "off"  0
   * "warn"  1
   * "error"  2
   */
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow == and != but warn
    'eqeqeq': 0,
    // allow var declare multiple variables
    'one-var': 0,
    'no-multi-str': 0,
    // allow regular escape
    'no-useless-escape': 0,
    // switch statements must have a default
    'default-case': 2,
    // allow ;
    "semi": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 0,
    'vue/script-indent': ['error', 2, {'baseIndent': 1, 'switchCase': 1}],
  }
}
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  /**
   * add your custom rules here
   * "off"  0
   * "warn"  1
   * "error"  2
   */
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow == and != but warn
    'eqeqeq': 0,
    // allow var declare multiple variables
    'one-var': 0,
    'no-multi-str': 0,
    // allow regular escape
    'no-useless-escape': 0,
    // switch statements must have a default
    'default-case': 2,
    // allow ;
    "semi": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 0,
    'vue/script-indent': ['error', 2, {'baseIndent': 1, 'switchCase': 1}],
  }
}
