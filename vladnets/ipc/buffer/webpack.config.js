const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultConfig = {
    entry: "",
    mode: "development",
    devtool: "source-map",
    target: "web",
    stats: "errors-only",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        // libraryTarget: "umd",
        globalObject: "this",
    },

    watchOptions: {
        aggregateTimeout: 500,
        ignored: [
            /node_modules([\\]+|\/)+(?!@vladnets)/,
            /d\.ts/,
        ],
    },

    plugins: [],
};

const configs = {
    index: {
        ...defaultConfig,
        entry: "./src/index.ts",
    },
};

module.exports = env => {
    return configs[env.name];
};