const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    offscreen: './src/offscreen.js',
    signInPopup: './src/signInPopup.js',
    linkedin: "./src/scripts/linkedin.js",
    mainRenderer: "./src/scripts/mainRenderer.js",

    // Major UI Components
    urlButton: "./src/scripts/components/urlButton.js",
    shareButton: "./src/scripts/components/shareButton.js",
    notes: "./src/scripts/components/notes.js",

    // Minor Components
    spinner: "./src/scripts/components/spinner.js",
    toast: "./src/scripts/components/toast.js",

    // Background Tasks
    notes: "./src/backgroundTasks/notes.js",
    profile: "./src/backgroundTasks/profiles.js",
    shareUsers: "./src/backgroundTasks/shareUsers.js",
    utils: "./src/backgroundTasks/utils.js"
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
