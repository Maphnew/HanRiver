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
        stats: "errors-only", // 메시지 출력 옵션
        devServer: {
            open: true, // dev-server 서버가 시작된 후 브라우저 오픈
            compress: true, // 모든 항목에 대해 gzip압축 사용
            host: "localhost", // 사용될 호스트 지정 // 0.0.0.0 일 때 local이 아닌 곳에서 접속가능
            port: 3033, // 접속 포트 설정
            historyApiFallback: true, // 히스토리 api를 사용할 때 설정, 404발생하면 index.html로 리다이렉트된다.
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
            managedPaths: [], // 패키지 관리자가 관리하고 수정되지 않도록 신뢰할 수있는 경로 배열입니다
            // immutablePaths: []	// 패키지 관리자가 관리하고 경로에 버전 또는 해시를 포함하여 모든 파일을 변경할 수없는 경로 배열입니다.
        },
    };
}

module.exports = getConfig;
