const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        hot: true,
        inline: true,
        compress: true,
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        proxy: {
            '/yahoo': {
                target: 'https://query1.finance.yahoo.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/yahoo': ''
                }
            }
        },
        watchOptions: {
            ignored: [
                /node_modules/
            ],
            poll: true
        }
    },
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    }
};