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
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    },
    {
      test: /\.svg$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    host: '0.0.0.0',
    historyApiFallback: true
  }
}
