var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var root = path.resolve(__dirname, 'app');

module.exports = {
    entry: {
        bundle: path.resolve(root, 'app.jsx'),
        style: path.resolve(root, 'style.less'),
        svg: path.resolve(root, 'assets/img/sprite.svg'),
        flower: path.resolve(root, 'assets/img/flowers.png'),
        paint: path.resolve(root, 'assets/img/paint.png'),
        loading: path.resolve(root, 'assets/img/loading.png')
    },
    output:{
        path: __dirname + '/build',
        filename: '[name].js'
    },

    watch: true,

    module: {
        loaders: [
            {
             test: /\.jsx?$/,
             exclude: /(node_modules)/,
             loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader?safe=true!less-loader")
            },
            {
                test: /\.(svg)|(png)$/,
                loader: 'file?name=images/[name].[ext]'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
           template: path.resolve(root, './index.html')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("css/[name].css", {allChunk:true})
   ]
}
