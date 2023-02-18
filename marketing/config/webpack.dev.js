const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development', 
    devServer: {
        port: 8081, 
        historyApiFallback: {
            index: 'index.html'
        }
    }, 
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing', //be used to declare gloabl variable when our script loads up inside the container
            filename: 'remoteEntry.js', // 
            exposes: { //what file we want to make availbe for the out side world (container)
                './MarketingApp': './src/bootstrap'
            },
            shared: ['react', 'react-dom'] 
        }),
        new HtmlWebpackPlugin({template: './public/index.html'})
    ]
}

module.exports = merge(commonConfig, devConfig); 