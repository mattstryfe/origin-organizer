module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-api-style': [
      'error',
      ['script-setup', 'composition'] // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/new-line-between-multi-line-property': [
      'error',
      {
        minLineOfMultilineProperty: 2
      }
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/block-order': [
      'error',
      {
        order: [['template', 'script'], 'style']
      }
    ],
    'vue/padding-line-between-blocks': ['error', 'always']
  }
}
