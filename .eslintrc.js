module.exports = {
  root: true,
  env: {
    es2024: true,
    node: true
  },
  globals: {
    structuredClone: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'max-len': ['error', { code: 100, ignoreComments: true }],
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
    'vue/padding-line-between-blocks': ['error', 'always'],
    // Additional rules
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
        selfClosingTag: {
          singleline: 'never',
          multiline: 'always'
        }
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'name',
          'props', // Position props near the top
          'computed',
          'data',
          'methods',
          'emits',
          'watch',
          'template'
        ]
      }
    ],
    // Enforce alphabetical order for props
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION', // is, v-is
          'LIST_RENDERING', // v-for
          'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
          'RENDER_MODIFIERS', // v-pre, v-once
          'GLOBAL', // id
          'UNIQUE', // ref, key, v-slot, slot
          'OTHER_ATTR', // custom attributes
          'EVENTS', // @click, v-on
          'CONTENT' // v-text, v-html
        ],
        alphabetical: true // Enforce alphabetical sorting within each group
      }
    ]
  }
}
