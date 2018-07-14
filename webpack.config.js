const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, './src/index.js')
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    historyApiFallback: true
  }
}
