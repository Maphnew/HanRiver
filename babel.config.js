module.exports = {
    presets: [
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            },
        ],
        "@babel/preset-env",
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@": "./src",
                },
            },
        ],
        "@babel/plugin-syntax-dynamic-import",
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: 3,
            },
        ],
    ],
};
