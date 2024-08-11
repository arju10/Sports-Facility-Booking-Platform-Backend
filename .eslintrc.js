module.exports = [
  {
    files: ['*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',
      // Add custom rules here
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'error',
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    globals: {
      process: 'readonly',
    },
    ignorePatterns: ['dist/', 'node_modules/', '.env'],
  },
];
