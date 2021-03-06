const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'georgi-gl');
const buildPath = path.join(__dirname, 'public/js');

const config = {
  context: srcPath,
  entry: path.join(srcPath, 'app.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  }, 
  module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
};

module.exports = config;