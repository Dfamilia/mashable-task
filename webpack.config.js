const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
