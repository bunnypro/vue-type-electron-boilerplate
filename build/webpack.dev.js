const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const config = require('../config/dev');

module.exports = merge(baseConfig, {
    mode: config.mode,
    output: {
        publicPath: config.publicPath
    },
    serve: {
        host: config.host,
        port: config.port,
        dev: {
            publicPath: config.publicPath
        },
        open: {
            app: 'electron'
        },
        add: (app, middleware, options) => {
            app.use(convert(history()));
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    }
});