const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
      rules: [{ 
          test: /\.js$/, // регулярное выражение, которое ищет все js файлы
          use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
          exclude: /node_modules/ // исключает папку node_modules
              },
              {
                test: /\.css$/, // применять это правило только к CSS-файлам
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
            }   
          ]
      },
    plugins: [
    new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html'	
  }),
  new MiniCssExtractPlugin({filename: 'style.css'}),
  new WebpackMd5Hash()
  ]
}
