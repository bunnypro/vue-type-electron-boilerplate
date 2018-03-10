const path = require('path');

module.exports = {
    mode: 'production',
    path: path.resolve(__dirname, '../dist'),
    protocol: 'file:',
    publicPath: ''
};