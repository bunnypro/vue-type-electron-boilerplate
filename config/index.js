const dev = require('./dev');
const prod = require('./prod');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    title: 'A Vue Typescript Electron Boilerplate',

    dev,
    prod
};