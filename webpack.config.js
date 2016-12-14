var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    main: [path.resolve(__dirname, 'entry')]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [{
      test: /\.es6|js|jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',

      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url?limit=10000&publicPath=../&name=imgs/[name].[hash].[ext]',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }]
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.es6']
  }
};


var plugins = [];


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\"production\"',
        BROWSER: '"web"',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      minimize: true
    })
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\"development\"',
        BROWSER: '\"true\"',
      }
    })
  ]);
}
