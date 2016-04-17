const path = require('path');
const webpack = require('webpack');

const __dir = path.resolve('.');
const src = path.join(__dir, 'src');

module.exports = {
    devtool: 'source-map',
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        path: path.join(__dir, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: src,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][name]___[hash:base64:5]!postcss-loader!',
            },
            {
                test: /\.(jpg|png|mp3|wav|ogg)$/,
                loader: 'file-loader',
                include: src,
            },
        ],
        postcss: () => {
            return [
                require('autoprefixer'),
                require('precss'),
            ];
        },
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        root: src,
    },
};

