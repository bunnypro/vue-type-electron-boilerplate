const url = require('url');
const { merge } = require('lodash');

const config = {
    mode: 'development',
    host: 'localhost',
    port: '8099',
    protocol: 'http:'
};

module.exports = merge(config, {
    publicPath: url.format({
        host: `${config.host}:${config.port}/`,
        protocol: config.protocol
    })
});