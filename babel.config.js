module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '.json'],
        alias: {
          '~components': ['./src/components'],
          '~models': ['./src/models'],
          '~stores': ['./src/stores'],
          '~services': ['./src/services'],
          '~styles': ['./src/styles'],
          '~views': ['./src/views'],
          '~db': ['./src/database'],
        },
      },
    ],
    ['react-native-paper/babel'],
    'react-native-reanimated/plugin',
  ],
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsProperties: true,
  },
};
