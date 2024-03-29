const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            {
                test: /\.glsl$/,
                loader: "webpack-glsl-loader",
            },
            {
                test: /\.(png|jpeg|gif)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                        publicPath: "./"
                    }
                  }
                ]
            }
        ],
    },

    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
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
        entry: {
            index: "./src/index.ts",
        },
        plugins: [...defaultConfig.plugins, new HtmlWebpackPlugin()],
    },
};

module.exports = env => {
    const names = env.names.split(",");
    return names.map(name => configs[name]);
};