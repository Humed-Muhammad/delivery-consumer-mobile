module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@Api': './src/Api',
          '@Routes': './src/Routes',
          '@Components': './src/Components',
          '@Screen': './src/Screen',
          '@Redux': './src/Redux/',
          '@Styles': './src/Styles',
          '@Utils': './src/Utils',
          '@Navigation': './src/Navigation',
          '@Assets': './src/Assets',
          '@Language': './src/Language',
          '@ReactQuery': './src/ReactQuery'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

