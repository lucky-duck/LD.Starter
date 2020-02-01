'use strict';
import webpack from 'webpack';
import path from 'path';

import { PRODUCTION, hmrEnabled } from './config';
import paths from './paths';

const entryPoints = {
  bundle: path.resolve(__dirname, paths.src.scripts),
};

const hotMiddlewareString =
  'webpack-hot-middleware/client?quiet=true&noInfo=true';

export const config = {
  entry: Object.keys(entryPoints).reduce((acc, currentKey) => {
    acc[currentKey] = [entryPoints[currentKey]];
    !PRODUCTION && hmrEnabled && acc[currentKey].push(hotMiddlewareString);
    return acc;
  }, {}),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, paths.build.scripts),
    publicPath: '/assets/js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: [
          path.resolve(__dirname, 'src/assets/js'),
          path.resolve(__dirname, 'src/assets/components'),
          path.resolve(__dirname, 'node_modules/gsap'),
          path.resolve(__dirname, 'node_modules/swiper'),
        ],
        use: [
          'babel-loader',
          {
            options: {
              eslintPath: require.resolve('eslint'),
              cache: true,
              configFile: path.resolve('.eslintrc'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
      'react-dom-factories': 'preact-compat/lib/react-dom-factories',
      ScrollMagic: path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
      ),
      'animation.gsap': path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
      ),
      'debug.addIndicators': path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
      ),
      TweenLite: path.resolve(
        'node_modules',
        'gsap/src/uncompressed/TweenLite.js'
      ),
      TweenMax: path.resolve(
        'node_modules',
        'gsap/src/uncompressed/TweenMax.js'
      ),
      TimelineLite: path.resolve(
        'node_modules',
        'gsap/src/uncompressed/TimelineLite.js'
      ),
      TimelineMax: path.resolve(
        'node_modules',
        'gsap/src/uncompressed/TimelineMax.js'
      ),
    },
  },
  plugins: PRODUCTION ? [] : [new webpack.HotModuleReplacementPlugin()],
  devtool: PRODUCTION ? false : '#eval',
  mode: PRODUCTION ? 'production' : 'development',
  optimization: {
    minimize: PRODUCTION,
  },
  watch: !PRODUCTION && !hmrEnabled,
};

export default config;
