/* eslint-env node */
'use strict';
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'api.ts'),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'api.js',
        library: 'PluginApi',
        libraryTarget: 'umd',
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
    optimization: {
        minimize: true
    },
    mode: 'production'
};