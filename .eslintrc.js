/** @format */

module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  globals: {},
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': 'off',
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none'
      }
    ],
    'max-nested-callbacks': 'off',
    'react/no-children-prop': 'off',
    'typescript/member-ordering': 'off',
    'typescript/member-delimiter-style': 'off',
    'react/jsx-indent-props': 'off',
    'react/no-did-update-set-state': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/camelcase': ['off', { properties: 'always' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ]
  }
}
