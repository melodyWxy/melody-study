const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry:  {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject:true
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
        {
            test:/|.(js|jsx)$/,
            use:['babel-loader'],
            exclude:/node_modules/
        },
        {
            test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[name]-[hash:base64:5]'],
            exclude:/node_modules/
        },
        {
            test:/\.less$/,
            use:['style-loader','css-loader?modules&localIdentName=[name]-[hash:base64:5]','less-loader'],
            exclude:/node_modules/
        },
        {
            test:/\.(png|jpg|gif|woff|svg|eot|woff2|ttf)$/,
            use:'url-loader?limit=8192',
            exclude:/node_modules/
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
              'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
              'xml-loader'
            ]
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },

    ]
  }
};