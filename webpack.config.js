module.exports = {
    entry: './test.js',
    output: {
        filename: './bundle.js',
        target: 'browser',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
