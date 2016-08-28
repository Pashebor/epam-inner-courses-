module.exports = {
    context: __dirname + '/app',
    entry: './app.js',
    output:{
        path: __dirname + '/app',
        filename: 'bundle.js'
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
            }
        ]
    }
}