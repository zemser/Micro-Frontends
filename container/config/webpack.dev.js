const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development', 
    devServer: {
        port: 8080, 
        historyApiFallback: {
            index: 'index.html'
        }
    }, 
    plugins: [
        new ModuleFederationPlugin({
            name: 'Container', //not really used just convetion
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js' // the marketing in the string needs to match the name in the marketing plugin config
            },
            shared: ['react', 'react-dom'] 
        }),
        new HtmlWebpackPlugin({template: './public/index.html'})
    ]
}

module.exports = merge(commonConfig, devConfig); 