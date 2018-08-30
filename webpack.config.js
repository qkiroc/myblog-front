var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//css单独编译成一个文件
var extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: {
		index: path.resolve(__dirname, 'client/index.jsx')
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: '[name]-[hash:12].js',
		publicPath: '/',
		chunkFilename: "[name]-[hash:12].js"
	},
	devServer: {
		hot: true,
		publicPath: '/',
		port: 9090,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.HotModuleReplacementPlugin(), // 热替换插件
    	new webpack.NamedModulesPlugin(), // 执行热替换时打印模块名字
    	extractSass,

	],
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'es2015', 'stage-3'],
					}
				}
			},
			/*{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader'
				},{
					loader: 'css-loader'
				},{
					loader: 'sass-loader'
				}]
			},*/
			{
				test: /\.scss$/,
				use: extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }],
	                // 在开发环境使用 style-loader
	                fallback: "style-loader"
	            })
			},
			{
			   // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
			    // 如下配置，将小于8192byte的图片转成base64码
			    test: /\.(png|jpg|gif)$/,
			    loader: 'url-loader?limit=10&name=./static/images/[name].[ext]?[hash]',
			}
		]
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'client/components'),
			'@pages': path.resolve(__dirname, 'client/pages'),
			'@scss': path.resolve(__dirname, 'client/scss'),
			'@util': path.resolve(__dirname, 'client/util'),
			'@img': path.resolve(__dirname, 'client/static/images')
		}
	}
}