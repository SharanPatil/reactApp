const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
var CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../', 'src');

var extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css'
});
module.exports = {
   entry: './src/main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'bundle.js',
   },
   devServer: {
      inline: true,
      port: 8001,
	  historyApiFallback: true
   },
   resolveLoader: {
    moduleExtensions: ['-loader']
  },
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
   module: {
      rules: [
         {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['env', 'react']
            }
         },
		 {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: extractPlugin.extract({
			 use: ['css-loader', 'sass-loader']
			})
		 },
		 {
			test: /\.(jpe?g|png|gif|svg)$/i,
			exclude: /node_modules/,
			loader: 'url-loader?name=../assets/images/[name].[ext]'
		 }
      ]
   },
   plugins:[
    new HtmlWebpackPlugin({
         template: './src/index.html'
       }),
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[id].css'
	}),
	new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
	new CopyWebpackPlugin([
		  { from: 'src/assets', to: 'assets' }
		]),
	extractPlugin
   ]
}