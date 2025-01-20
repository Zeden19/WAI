const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        background: "./src/background.js",
        firebase: "./src/firebase.js",
        offscreen: "./src/offscreen.js",
        signInPopup: "./src/signInPopup.js",
        "scripts/linkedin": "./src/scripts/linkedin.js",
        "scripts/mainRenderer": "./src/scripts/mainRenderer.js",

        // Major UI Components
        "scripts/components/urlButton": "./src/scripts/components/urlButton.js",
        "scripts/components/shareButton":
            "./src/scripts/components/shareButton.js",
        "scripts/components/notes": "./src/scripts/components/notes.js",

        // Minor Components
        "scripts/components/toast": "./src/scripts/components/toast.js",

        // Background Tasks
        "backgroundTasks/notes": "./src/backgroundTasks/notes.js",
        "backgroundTasks/profile": "./src/backgroundTasks/profiles.js",
        "backgroundTasks/shareUsers": "./src/backgroundTasks/shareUsers.js",
        "backgroundTasks/utils": "./src/backgroundTasks/utils.js",
    },
    output: {
        filename: "[name].js", // Use the entry keys to determine output paths
        path: path.resolve(__dirname, "dist"),
        clean: true, // Clean the output directory before emit.
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "static" }],
        }),
    ],
};
