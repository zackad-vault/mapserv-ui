var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'css/main.css'
});

var config = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            /**
             * Copy html file as layout
             */
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            /**
             * Transpile es2016 into es2015 for compatibility
             */
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            /**
             * Transpile sass into css file
             */
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            /**
             * Copy fonts file
             */
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // extract text into separate file
        extractPlugin
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    // cleanup only when build for production
    var pathsToClean = [
        'dist'
    ];
    var cleanOptions = {
        root: path.resolve(__dirname),
        exclude: [
            '.git'
        ]
    };
    config.plugins.push(new CleanWebpackPlugin(pathsToClean, cleanOptions));
    config.resolve.alias.vue = 'vue/dist/vue.min.js';
}

module.exports = config;
