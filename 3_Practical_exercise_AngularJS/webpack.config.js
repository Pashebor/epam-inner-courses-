var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var root = path.resolve(__dirname, 'app');
var modules = path.resolve(__dirname, 'app/modules');

module.exports = {
    entry: {
        app_spec: path.resolve(root, 'app.spec.js'),
        bundle: path.resolve(root, 'app.js'),
        styles: path.resolve(root, 'assets/css/style.css'),
        svg: path.resolve(root, 'assets/img/sprite.svg'),
        flower: path.resolve(root, 'assets/img/flowers.png'),
        paint: path.resolve(root, 'assets/img/paint.png'),
        loading: path.resolve(root, 'assets/img/loading.png')
    },
    output:{
        path: __dirname + '/build',
        filename: '[name].js'
    },
    module: {
        loaders: [

            {
             test: /\.js$/,
             exclude: /(node_modules)/,
             loader: "babel",
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(svg)$/,
                loader: 'file?name=images/[name].[ext]'
            },
            {
              test: /\.png?$/,
              loader: "file?name=images/[name].[ext]"
            }
        ]
    },

    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(root, './index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/create_article.template.html',
            template: path.resolve(root, './create-article/create_article.template.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/start_page.template.html',
            template: path.resolve(root, './start-page/start_page.template.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/edit_article.template.html',
            template: path.resolve(root, './edit-article/edit_article.template.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/modal_delete.template.html',
            template: path.resolve(root, './edit-article/modal_delete.template.html')
        }),

        new ExtractTextPlugin("css/style.css", {allChunk:true})
    ]
};
