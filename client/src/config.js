const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    // Getting env vars
    const env = dotenv.config().parsed;

    // Reduce it to a nice object
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ]
    };
};