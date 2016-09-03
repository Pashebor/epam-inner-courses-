module.exports = {
    entry: './app/app.jsx',
    output:{
        path: __dirname + '/public/build',
        filename: 'bundle.js'
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
            }

        ]
    }
}