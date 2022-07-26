module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/prettier',
    'prettier',
  ],

  env: {
    es6: true,
    node: true,
    browser: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  plugins: ['vue'],

  rules: {
    // ? javascript rules
    // 开发模式允许使用console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 开发环境允许使用调试 (生产模式禁用)
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 允许使用 async-await
    'generator-star-spacing': 'off',
    // 禁止使用 var
    'no-var': 'error',
    // 函数名括号前不需要有空格
    'space-before-function-paren': 'off',
    // 代码块中避免多余留白
    'padded-blocks': 'off',
    // 最多出现3个连续空行
    'no-multiple-empty-lines': [
      'error',
      {
        max: 3,
        maxBOF: 1,
      },
    ],

    // 自定义规则
    'no-eval': 0,
    eqeqeq: 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'commit',
      },
    ],
    // 自定义规则

    // ? vue rules
    // html属性必须换行
    'vue/max-attributes-per-line': 'off',
    // 没有内容的元素需要使用闭合标签
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 0,
    'vue/no-deprecated-slot-attribute': 0,
    'vue/no-deprecated-dollar-listeners-api': 0,
    'vue/no-deprecated-filter': 0,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
