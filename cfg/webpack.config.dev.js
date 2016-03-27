const path = require('path');
const webpack = require('webpack');

const __dir = path.resolve('.');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
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
                include: path.join(__dir, 'src'),
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][name]___[hash:base64:5]!postcss-loader!',
                include: path.join(__dir, 'src'),
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                loader: 'file-loader',
                include: path.join(__dir, 'src'),
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
        root: path.join(__dir, 'src'),
    },
};

