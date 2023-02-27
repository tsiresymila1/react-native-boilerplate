module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            'jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '@': './src',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
      ['module:react-native-dotenv'],
      ['nativewind/babel'],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
