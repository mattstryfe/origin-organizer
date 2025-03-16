// eslint.config.js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import parser from 'vue-eslint-parser' // ✅ Ensure we use the correct parser

export default [
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser, // ✅ Use vue-eslint-parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        //  Define globals to avoid ESLint error
        navigator: 'readonly',
        window: 'readonly',
        document: 'readonly',
        structuredClone: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        crypto: 'readonly'
      }
    },
    plugins: {
      vue
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...vue.configs['strongly-recommended'].rules, // Vue 3 recommended rules
      ...prettier.rules, // Prettier rules

      // Custom rules
      'max-len': ['error', { code: 120, ignoreComments: true }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // Vue-specific rules
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/new-line-between-multi-line-property': [
        'error',
        {
          minLineOfMultilineProperty: 4
        }
      ],
      'vue/block-order': [
        'error',
        {
          order: [['template', 'script'], 'style']
        }
      ],
      'vue/padding-line-between-blocks': ['error', 'always'],

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
            'props',
            'computed',
            'data',
            'methods',
            'emits',
            'watch',
            'template'
          ]
        }
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          alphabetical: true
        }
      ]
    }
  }
]
