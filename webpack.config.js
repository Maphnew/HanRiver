const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const developmentEnvironment = "development";
const productionEnvironment = "production";
const testEnvironment = "test";

const DEV_API_ENDPOINT_URL = "http://localhost:8080";
const PROD_API_ENDPOINT_URL = "http://localhost:8080";

const getPlugins = function (mode) {
    const plugins = [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            noInfo: true, // set to false to see a list of every file being bundled.
        }),
        new webpack.DefinePlugin({
            "process.env.DEV_API_ENDPOINT_URL":
                JSON.stringify(DEV_API_ENDPOINT_URL),
            "process.env.PROD_API_ENDPOINT_URL": JSON.stringify(
                PROD_API_ENDPOINT_URL
            ),
        }), // process.env.NODE_ENV
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // favicon: "./src/assets/images/ds_favicon.ico",
        }),
        new ForkTsCheckerWebpackPlugin(),
    ];

    switch (mode) {
        case productionEnvironment:
            plugins.push(
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash:8].css",
                    chunkFilename: "[id].[contenthash:8].css",
                })
            );
            break;
        case developmentEnvironment:
            plugins.push(new webpack.HotModuleReplacementPlugin());
            break;
    }

    return plugins;
};

const getEntry = function (mode) {
    const entry = [];

    entry.push("core-js/modules/es.promise");
    entry.push("core-js/modules/es.array.iterator");
    // entry.push('./webpack-public-path');

    if (mode === testEnvironment) {
        return;
    }

    return {
        index: entry.concat(path.join(__dirname, "src", "index")),
    };
};

const getRules = function (mode) {
    const rules = [
        {
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, "src")],
            exclude: [/node_modules(\/|\\)(?!common-js)/],
            loader: "babel-loader",
        },
        {
            test: /\.ts(x?)$/,
            use: "babel-loader",
            exclude: "/node_modules/",
        },
        {
            test: /(\.png|\.gif|\.svg)\??[\w\d]*$/,
            type: "asset/inline",
        },
        {
            test: /(\.woff2|\.woff|\.ttf|\.eot)\??[\w\d]*$/,
            type: "asset/resource",
        },
    ];

    switch (mode) {
        case productionEnvironment:
            rules.push({
                test: /(\.css|\.scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: false, importLoaders: 2 },
                    },
                    { loader: "sass-loader", options: { sourceMap: false } },
                ],
            });
            break;
        case developmentEnvironment:
            rules.push({
                test: /(\.css|\.scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { sourceMap: true, importLoaders: 2 },
                    },
                    {
                        loader: "resolve-url-loader",
                        options: { sourceMap: true },
                    },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            });
            break;
    }

    return rules;
};

function getConfig(env, argv) {
    return {
        mode:
            argv.mode === productionEnvironment
                ? productionEnvironment
                : developmentEnvironment,
        devtool:
            argv.mode === productionEnvironment
                ? "source-map"
                : "eval-source-map",
        entry: getEntry(argv.mode),
        target: "browserslist",
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            filename: "[name].[contenthash:8].js",
        },
        plugins: getPlugins(argv.mode),
        resolve: {
            descriptionFiles: ["package.json"],
            extensions: [".js", ".jsx", ".json", ".tsx"],
            modules: [path.resolve(__dirname, "node_modules")],
            alias: {
                "fonts": "common-js/fonts",
                "images": "common-js/images",
            }
        },
        module: {
            rules: getRules(argv.mode),
        },
        stats: "errors-only", // ????????? ?????? ??????
        devServer: {
            open: true, // dev-server ????????? ????????? ??? ???????????? ??????
            compress: true, // ?????? ????????? ?????? gzip?????? ??????
            host: "localhost", // ????????? ????????? ?????? // 0.0.0.0 ??? ??? local??? ?????? ????????? ????????????
            port: 3033, // ?????? ?????? ??????
            historyApiFallback: true, // ???????????? api??? ????????? ??? ??????, 404???????????? index.html??? ?????????????????????.
            proxy: {
                "/api": "http://localhost:5050",
                "/meta": DEV_API_ENDPOINT_URL,
            },
            devMiddleware: {
                // index: true,
                // mimeTypes: { 'text/html': ['phtml'] },
                publicPath: "/",
                // serverSideRender: true,
                // writeToDisk: true,
            },
        },
        snapshot: {
            managedPaths: [], // ????????? ???????????? ???????????? ???????????? ????????? ????????? ????????? ?????? ???????????????
            // immutablePaths: []	// ????????? ???????????? ???????????? ????????? ?????? ?????? ????????? ???????????? ?????? ????????? ????????? ????????? ?????? ???????????????.
        },
    };
}

module.exports = getConfig;
