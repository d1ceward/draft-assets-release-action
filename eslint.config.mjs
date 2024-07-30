import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/',
      'lib/',
      'jest.config.js'
    ]
  },
  eslint.configs.all,
  ...tseslint.configs.all,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      sourceType: 'module'
    },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'comma-dangle': 'off',
      'curly': ['error', 'multi'],
      'eslint-comments/no-use': 'off',
      'i18n-text/no-en': 'off',
      'import/no-namespace': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'one-var': 'off',
      'prettier/prettier': 'off',
      'semi': 'off',
      'sort-import': 'off',
      'sort-imports': 'off'
    }
  }
]
