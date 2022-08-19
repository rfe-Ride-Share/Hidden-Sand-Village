const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [new Dotenv()],
  mode: 'development',
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
<<<<<<< HEAD
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true,
              type: 'asset/resource', // webpack@2.x and newer
=======
            // type: 'asset/resource',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
>>>>>>> f613d36c1de8c378d0d2c36966aaf4fe89baba42
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
