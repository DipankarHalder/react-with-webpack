/************************************
  * import important node packages 
*************************************/
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/************************************
  * important system and file configuration
*************************************/
const _isDev = process.env.NODE_ENV === 'development';
const _isProd = !_isDev;
const _filename = ext => _isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

/************************************
  * file structure configuration
*************************************/
const _entryPath = {
  main: ['@babel/polyfill', './index.jsx']
}
const _config = {
  _mode: _isDev,
  _context: path.resolve(__dirname, 'src'),
  _outputPath: {
    filename: _filename('js'),
    path: path.resolve(__dirname, 'dist')
  }
}

/************************************
  * dev server configuration
*************************************/
const _devConfig = {
  port: 4000,
  hot: _isDev,
  open: true
}

/************************************
  * dev tools configuration
*************************************/
const _devTools = {
  devtool: _isDev ? 'source-map' : false
}

/************************************
  * optimization func & configuration
*************************************/
const _optimized = () => {
  const _optConfig = {
    splitChunks: { 
      chunks: 'all' 
    }
  }
  if(_isProd) {
    _optConfig.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return _optConfig;
}
const _optimization = _optimized();

/************************************
  * style loader and addons setup
*************************************/
const _styleLoaderSetup = addons => {
  const _loads = [{
    loader: MiniCssExtractPlugin.loader,
    options: { 
      publicPath: '' 
    }, 
  }, 'css-loader'];
  if(addons) _loads.push(addons);
  return _loads;
}

/************************************
  * babel loader and addons setup
*************************************/
const _babelLoaderSetup = preset => {
  const _loads = {
    presets: [ '@babel/preset-env' ],
    plugins: [ '@babel/plugin-proposal-class-properties' ]
  }
  if(preset) _loads.presets.push(preset);
  return _loads;
}
const _jsLoaders = () => {
  const _loaders = [{
    loader: 'babel-loader',
    options: _babelLoaderSetup()
  }]
  if(_isDev) _loaders.push('eslint-loader');
  return _loaders;
}

/************************************
  * extensions configuration
*************************************/
const _resolve = {
  extensions: ['.js', '.json', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.csv', '.xml'],
  alias: {
    '@models': path.resolve(__dirname, 'src/models'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@': path.resolve(__dirname, 'src')
  }
}

/************************************
  * plugins configuration
*************************************/
const _plugins = () => {
  const _plug = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: _isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ 
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }],
    }),
    new MiniCssExtractPlugin({
      filename: _filename('css'),
    })
  ]
  if(_isProd) _plug.push(new BundleAnalyzerPlugin())
  return _plug;
}

/************************************
  * modules configuration
*************************************/
const _modules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: _jsLoaders()
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: _babelLoaderSetup('@babel/preset-typescript')
      }
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: _babelLoaderSetup('@babel/preset-react')
      }
    },
    {
      test: /\.css$/,
      use: _styleLoaderSetup()
    },
    {
      test: /\.less$/,
      use: _styleLoaderSetup('less-loader')
    },
    {
      test: /\.s[ac]ss$/,
      use: _styleLoaderSetup('sass-loader')
    },
    {
      test: /\.(jpg|jpeg|png|svg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: ['file-loader']
    },
    {
      test: /\.xml$/,
      use: ['xml-loader']
    },
    {
      test: /\.csv$/,
      use: ['csv-loader']
    }
  ]
}

/************************************
  * export module, loader & plugins
*************************************/
module.exports = {
  context: _config._context,
  mode: _config._mode,
  entry: _entryPath,
  output: _config._outputPath,
  resolve: _resolve,
  optimization: _optimization,
  devtool: _devTools.devtool,
  devServer: _devConfig,
  module: _modules,
  plugins: _plugins(),
}