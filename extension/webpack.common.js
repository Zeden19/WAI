const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    offscreen: './src/offscreen.js',
    signInPopup: './src/signInPopup.js',
    linkedin: "./src/scripts/linkedin.js",
    urlButton: "./src/scripts/urlButton.js",
    shareButton: "./src/scripts/shareButton.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before emit.
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: 'static'}],
    }),
  ]
}
