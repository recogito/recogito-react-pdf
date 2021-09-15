const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: { 
          loader: 'babel-loader'
        }
      },
      { test: /\.css$/,  use: [ 'style-loader', 'css-loader'] },
    ]
  },
  devtool: 'source-map',
  devServer: {
    static: './public',
    hot: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/compressed.tracemonkey-pldi-09.pdf', to: 'compressed.tracemonkey-pldi-09.pdf' }
      ],
    })
  ]
};