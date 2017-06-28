var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssnext = require('postcss-cssnext');
var webpack = require('webpack');
var path = require('path');
var combineLoaders = require('webpack-combine-loaders');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: [ 'bootstrap-loader/extractStyles', './src/index.js' ],
    devtool: "source-map",
    output: {
        path: path.resolve('dist'),
        filename: "app.bundle.js"
    },
    module: {
        rules: [
            {
    			test: /\.css$/,
    			loader: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: combineLoaders([
    				    {
        					loader: 'css-loader',
        					query: {
        						modules: false,
        						//localIdentName: '[name]__[local]___[hash:base64:5]',
        						minimize: true
        					},
        				}, {
        					loader: 'postcss-loader',
        				}
        			]),
    			}),
    		},
    		{ 
    		    test: /bootstrap-sass\/assets\/javascripts\//, 
    		    use: 'imports-loader?jQuery=jquery' 
    		},
            {
                test: /\.js/, 
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }
        ]
    },
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Soy Cliente',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            googleAnalytics: 'UA-99249408-1',
            template: 'src/index.ejs' // Template para el index.html
        }),
        new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					cssnext(),
				],
			},
		}),
        new ExtractTextPlugin({
            filename: "app.css"
        }),
        
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "app.static",
            filename: "app.static.js",
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            }
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' })*/
    ]
}