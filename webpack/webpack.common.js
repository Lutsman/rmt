'use strict';

const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const autoprefixer = require('autoprefixer');

const dest = Path.join(__dirname, '../dist');

module.exports = {
    entry: {
        vendors: Path.resolve(__dirname, '../src/scripts/vendors/index'),
        app: Path.resolve(__dirname, '../src/scripts/index'),
    },
    output: {
        path: dest,
        filename: 'scripts/[name].[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(
            [dest],
            { root: Path.join(__dirname, '../') }),
        new CopyWebpackPlugin([
            {from: Path.resolve(__dirname, '../public'), to: './'},
            {from: Path.resolve(__dirname, '../src/images'), to: './images'},
        ]),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/index.html'),
            filename: "index.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/gamelist.html'),
            filename: "gamelist.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/info.html'),
            filename: "info.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/404.html'),
            filename: "404.html",
            inject: "body",
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),
        // autoprefixer,
    ],
    module: {
        rules: [
            {
                test: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*$|$)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: '../images/',
                    }
                }
            },
            {
                test: /\.(eot|otf|svg|ttf|woff|woff2)(\?.*$|$)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../fonts/',
                    }
                }
            },
        ]
    }
};
