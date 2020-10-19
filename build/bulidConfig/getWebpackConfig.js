const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const postcssConfig = require('./postcssConfig');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require(path.join(process.cwd(), 'build', 'config'));
const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};

const imageOptions = {
  limit: 10000,
};
module.exports = function () {
  const babelConfig = require('./getBabelCommonConfig')(false);
  const pluginImportOptions = {
    style: true,
    libraryName: config.name,
    libraryDirectory: config.libraryDirectory,
  };
  babelConfig.plugins.push([require.resolve('babel-plugin-import'), pluginImportOptions]);
  const baseConfig = {
    devtool: 'source-map',
    output: {
      path: path.join(process.cwd(), './dist/'),
      filename: '[name].js',
      library: config.name,
      libraryTarget: 'umd',
    },

    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: ['.js', '.jsx', '.vue', '.md', '.json'],
      alias: {
        '@': process.cwd(),
      },
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {
                  js: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets: [require.resolve('@babel/preset-env')],
                        plugins: [
                          require.resolve('@vue/babel-plugin-jsx'),
                          require.resolve('@babel/plugin-proposal-object-rest-spread'),
                        ],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: babelConfig,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: Object.assign({}, postcssConfig, { sourceMap: true }),
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: Object.assign({}, postcssConfig, { sourceMap: true }),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // Images
        {
          test: svgRegex,
          loader: 'url-loader',
          options: svgOptions,
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: imageOptions,
        },
      ],
    },

    plugins: [
   //   new BundleAnalyzerPlugin(),
      new CaseSensitivePathsPlugin(),
      new webpack.BannerPlugin(`
${config.name} v${config.version}

Copyright 2020-present, ${config.name}.
All rights reserved.
      `),
    ],
    externals: {
      vue: {
        root: 'Vue',
        commonjs2: 'vue',
        commonjs: 'vue',
        amd: 'vue',
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            sourceMap: true,
          },
        }),
      ],
    },
  };
  const entry = ['./index'];
  const uncompressedConfig = merge({}, baseConfig, {
    entry: {
      [config.name]: entry,
    },
    mode: 'development',
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  });

  const compressedConfig = merge({}, baseConfig, {
    entry: {
      [`${config.name}.min`]: entry,
    },
    mode: 'production',
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  });

  return [compressedConfig, uncompressedConfig];
};
