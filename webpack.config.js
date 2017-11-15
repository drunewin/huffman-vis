// webpack.config.js
var path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    makeTree: './js/make_tree.js',
    huff_nodes: './js/huff_nodes.js',
    huff_tree: './js/huff_tree.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
