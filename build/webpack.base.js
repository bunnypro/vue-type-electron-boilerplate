const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const config = require('../config');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'script/[name].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.ts', '.vue'],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.env)
        }),
        new HtmlPlugin({
            inject: false,
            template: require('html-webpack-template'),
            title: config.title,
            appMountId: 'app',
            minify: process.env.NODE_ENV === 'development' ? false : {
                caseSensitive: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
};