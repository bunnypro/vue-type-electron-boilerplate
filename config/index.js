const dev = require('./dev');
const prod = require('./prod');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    title: 'Electron Vue Type Class Tailwind',

    dev,
    prod
};