<<<<<<< HEAD
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: "./src/canvas.js",
  output: {
    path: __dirname + "/dist/js",
    filename: "canvas.bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!postcss-loader!sass-loader",
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("../css/style.css"),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
      files: ["./dist/*"],
    }),
  ],
  watch: true,
  devtool: "source-map",
};
=======
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/canvas.js',
  output: {
    path: __dirname + '/dist/',
    filename: './js/canvas.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['./dist/*'],
      notify: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: 'favicon.ico',
      template: 'src/index.html'
    })
  ],
  watch: true,
  devtool: 'source-map'
}
>>>>>>> 235d1e32a15188f8ca67fbd437508f89c9ae8d95
