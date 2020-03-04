/* eslint-env node */
'use strict';
const path = require('path');

module.exports = {
    entry: {
        api: path.join(__dirname, 'src', 'api.ts'),
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: { }
                }
            }
        ]
    },
    optimization: { },
    mode: 'production'
};