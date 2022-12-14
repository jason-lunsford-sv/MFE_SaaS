const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@https://mfe-marketing-1.netlify.app/remoteEntry.js`,
                auth: 'auth@https://mfe-auth-1.netlify.app/remoteEntry.js',
                dashboard: 'dashboard@https://mfe-dashboard-1.netlify.app/remoteEntry.js'
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);