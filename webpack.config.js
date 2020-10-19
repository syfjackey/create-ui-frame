const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './examples/index.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: [
                    'last 2 versions',
                    'Firefox ESR',
                    '> 1%',
                    'ie >= 9',
                    'iOS >= 8',
                    'Android >= 4',
                  ],
                },
              },
            ],
          ],
          plugins: [
            [
              'babel-plugin-import',
              {
                libraryName: 'fly-ui',
                libraryDirectory: 'components',
                style: true,
              },
            ],
            ['@vue/babel-plugin-jsx'],
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-transform-object-assign',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'fly-ui': path.join(__dirname, './components'),
    //  vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.jsx', '.vue'],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    disableHostCheck: true,
    hot: true,
    open: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'examples/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
  ],
};
