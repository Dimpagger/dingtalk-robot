
module.exports = {
    entry: __dirname + "/app/main.js",
    devtool: 'eval-source-map',
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: { loader: "babel-loader"},
                exclude: /node_modules/
            },
            {
                test: /(\.css|\.less)$/,
                use: [{loader: "style-loader"}, {loader: "css-loader", options: {modules: true}}]
            }
        ]
    }
};