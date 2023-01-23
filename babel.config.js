module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [["react-native-reanimated/plugin"], ["module:react-native-dotenv"],["nativewind/babel"]],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
