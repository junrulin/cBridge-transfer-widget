// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require("craco-less");
const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader');
const rewireTsLoader = require("craco-ts-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Handle relative paths to sibling packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      const htmlWebpackPluginInstance = webpackConfig.plugins.find(
        webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
      );
      if (htmlWebpackPluginInstance) {
        htmlWebpackPluginInstance.options.filename = path.resolve(__dirname,'out/cbridge.html');
      }
      return webpackConfig;
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          resolvePackage('../common')
        ],
      },
    },
    {
      plugin: rewireTsLoader,
      options: {
        includes: [
          resolvePackage('../common')
        ],
      },
    },
  ],
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
};
