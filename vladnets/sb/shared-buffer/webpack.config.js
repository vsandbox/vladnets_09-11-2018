const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultConfig = {
    mode: "development",
    devtool: "source-map",
    target: "web",
    // stats: "errors-only",

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
        aggregateTimeout: 1000,

        ignored: [
            /node_modules([\\]+|\/)+(?!@vladnets)/,
            /d\.ts/,
        ],
    },

    plugins: [],
};

const configs = {
    index: {
        entry: "./src/main.ts",
        ...defaultConfig,
        plugins: [...defaultConfig.plugins, new HtmlWebpackPlugin()],
    },
    worker: {
        entry: "./src/worker.ts",
        ...defaultConfig,
        target: "webworker",
        output: {
            ...defaultConfig.output,
            filename: "worker.js",
        }
    }
};

module.exports = env => {
    return configs[env.name];
};