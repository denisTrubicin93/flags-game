/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals, version } from '../../src/package.json';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, '../../src'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '../../src'), 'node_modules'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      APP_VERSION: version,
      ENABLE_HOVER_CLICK: 'true',
      APP_PLATFORM: 'electron',
      WEBSOCKET_SERVER: 'ws://localhost:1234/',
      WEBSOCKET_POSE_ENDPOINT: 'ws://localhost:1234/',
    }),
    new CaseSensitivePathsPlugin(),
  ],
};
