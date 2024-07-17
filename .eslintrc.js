module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/self-closing-comp': 'off',
    semi: ['warn', 'never'],
    curly: ['off', 'never'],
  },
}
