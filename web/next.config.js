require('dotenv').config();
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = withTypescript(
    withCSS({
        cssModules: true,
        webpack(config, options) {
            // Do not run type checking twice:
            if (options.isServer)
                config.plugins.push(new ForkTsCheckerWebpackPlugin());

            config.plugins = [
                ...config.plugins,

                // Read the .env file
                new Dotenv({
                    path: path.join(__dirname, '.env'),
                    systemvars: true,
                }),
            ];

            return config;
        },
    }),
);
