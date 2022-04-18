const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    es2021: true,
    jest: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    semi: [2, 'always'],
    'arrow-body-style': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'error',
    'max-params': ['error', 3],
    'import/no-extraneous-dependencies': 'off',
    'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'space-before-function-paren': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: ['function'], next: '*' },
    ],
    eqeqeq: 'error',
    'no-param-reassign': 'error',
    'newline-per-chained-call': 'error',
    'no-console': 'warn',
    'no-use-before-define': 'error',
    camelcase: [
      'error',
      {
        ignoreDestructuring: true,
        allow: ['_id$', '_token$', '_key$', 'cred_card', 'pending_payment'],
        properties: 'never',
      },
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-props-no-spreading': 'off',
    'no-duplicate-imports': 'error',
    'no-restricted-exports': 'off',
    'no-useless-escape': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-use-before-define': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-alert': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-cycle': 'off',
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/forbid-prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    radix: 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/*.tsx?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
