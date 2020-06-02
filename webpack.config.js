const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [{ 
          test: /\.js$/, // регулярное выражение, которое ищет все js файлы
          use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
          exclude: /node_modules/ // исключает папку node_modules
              },
              {
                test: /\.css$/i,
                    use: [
                                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                                    'css-loader', 
                                    'postcss-loader'
                            ]
            },
            {
              test: /\.(png|jpg|gif|ico|svg)$/,
              use: [
                      'file-loader?name=../images/[name].[ext]', // указали папку, куда складывать изображения
                      {
                              loader: 'image-webpack-loader',
                              options: {}
                      },
              ]
       },
       {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
    }   
          ]
      },
    plugins: [
    new HtmlWebpackPlugin({
      inject: false,
	    template: './src/index.html',
	    filename: 'index.html'	
  }),
  new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
            preset: ['default'],
    },
    canPrint: true
}),
  new WebpackMd5Hash(),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}),
new CopyPlugin({
  patterns: [
      {
          from: './images',
          to: 'images'
      }
  ]
})
  ]
}
