var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: ['./views/main.js', './views/scss/app.scss'],
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: 'build.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'public': path.resolve(__dirname, './public')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                  }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    objectAssign: 'Object.assign',
                    name: 'images/[name].[ext]'
                }
            },
            { 
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 100,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
