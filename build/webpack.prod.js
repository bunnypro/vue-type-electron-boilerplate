const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const config = require('../config/prod');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

module.exports = merge(baseConfig, {
    mode: config.mode,
    output: {
        publicPath: config.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/[name].css'
        }),
        new PurgeCssPlugin({
            paths: glob.sync([
                path.join(__dirname, "../src/**/*.ts"),
                path.join(__dirname, "../src/**/*.vue")
            ]),
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ["css", "js", "ts", "vue"]
                }
            ]
        }),
        new OptimizeCssPlugin({
            cssProcessorOptions: { safe: true, map: { inline: false } }
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/,
                    enforce: true
                }
            },
            minChunks: Infinity
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});