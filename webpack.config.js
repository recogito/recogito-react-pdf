const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './test/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: { 
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              [
                "@babel/plugin-proposal-class-properties"
              ]
            ]
          }
        }
      },
      { test: /\.css$/,  use: [ 'style-loader', 'css-loader'] },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[name][hash].[ext]',
            },
          },
        ]
      }
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
    })
  ]
};
