const path = require('path');

module.exports = {
	// mode: 'production',
	entry: "./app/main.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dev/'
	},
	devServer: {
		contentBase: './static',
		// hot: true
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader'],
			}
		]
	},
	resolve: {
		alias: {
			// 修改Vue倍导入时包的路径
			"vue$" : "vue/dist/vue.esm.js"
		}
	}
}