module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es6': true,
    'jest/globals': true,
    // 'cypress/globals': true
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'jest',
    '@babel',
    // 'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', {
        'before': true,
        'after': true
      }
    ],
    'no-console': 0,
    'react/prop-types': 0
  }
}