const { IgnorePlugin, DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

const ie11BabeLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ]
  }
};

const outputPath = path.resolve(__dirname, 'dist');

const defaultEnv = {
  iconPath: '/assets/svg/svg-symbol.svg',
  iconPathTutoring: '/assets/svg/svg-symbol.svg'
};

const getStyleResourceLoader = (theme = '') => (theme ? {
  loader: 'style-resources-loader',
  options: {
    patterns: path.resolve(__dirname, `./src/themes/${theme}/*.vars.less`),
    injector: 'append'
  }
} : null);

const webComponentsES6 = (mode, { iconPath, iconPathTutoring, theme = '' }) => ({
  entry: [
    '@webcomponents/webcomponentsjs/webcomponents-bundle',
    './src/web-components.ts'
  ],
  output: {
    filename: () => (theme ? `lsg-wc-es6.${theme}.js` : 'lsg-wc-es6.js'),
    path: outputPath
  },
  devtool: mode === 'development' ? 'inline-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.less$/,
        issuer: /\.ts$/,
        use: [
          {
            loader: 'lit-scss-loader',
            options: {
              minify: mode !== 'development'
            }
          },
          'extract-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
          getStyleResourceLoader(theme)
        ].filter((idx) => idx),
        exclude: /\.vars\.less$/
      },
      {
        test: /\.vars\.less$/,
        issuer: /\.ts$/,
        use: {
          loader: '@kemu/less-vars-loader',
          options: {
            camelCase: false
          }
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: true
            },
            allowTsInNodeModules: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    compress: true,
    contentBase: outputPath,
    port: 1337
  },
  plugins: [
    new WriteFilePlugin(),
    new CopyWebpackPlugin(
      [
        {
          context: 'src',
          from: 'assets/**/*',
          to: outputPath,
          flatten: false
        }
      ]
    ),
    new DefinePlugin({
      ICON_PATH: JSON.stringify(iconPath),
      ICON_PATH_TUTORING: JSON.stringify(iconPathTutoring)
    }),
    new IgnorePlugin({
      resourceRegExp: /assets/
    })
  ],
  optimization: {
    minimize: mode === 'production',
    minimizer: [new TerserPlugin()]
  }
});

const webComponentsES5 = (mode, { iconPath, iconPathTutoring, theme = '' }) => ({
  entry: [
    'regenerator-runtime/runtime',
    '@babel/polyfill',
    'whatwg-fetch',
    '@webcomponents/webcomponentsjs/webcomponents-bundle',
    './src/web-components.ts'
  ],
  output: {
    filename: () => (theme ? `lsg-wc-es5.${theme}.js` : 'lsg-wc-es5.js'),
    path: outputPath
  },
  devtool: mode === 'development' ? 'inline-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.less$/,
        issuer: /\.ts$/,
        use: [
          ie11BabeLoader,
          {
            loader: 'lit-scss-loader',
            options: {
              minify: mode !== 'development'
            }
          },
          'extract-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
          getStyleResourceLoader(theme)
        ].filter((idx) => idx),
        exclude: /\.vars\.less$/
      },
      {
        test: /\.vars\.less$/,
        issuer: /\.ts$/,
        use: [
          ie11BabeLoader,
          {
            loader: '@kemu/less-vars-loader',
            options: {
              camelCase: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: ie11BabeLoader
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                target: 'ES5'
              },
              allowTsInNodeModules: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new WriteFilePlugin(),
    new DefinePlugin({
      ICON_PATH: JSON.stringify(iconPath),
      ICON_PATH_TUTORING: JSON.stringify(iconPathTutoring)
    }),
    new IgnorePlugin({
      resourceRegExp: /assets/
    })
  ],
  optimization: {
    minimize: mode === 'production',
    minimizer: [new TerserPlugin()]
  }
});

const libraryES6 = (mode) => ({
  entry: [
    './src/library.ts'
  ],
  output: {
    filename: 'lsg-lib-es6.js',
    path: outputPath,
    libraryTarget: 'commonjs2'
  },
  devtool: mode === 'development' ? 'inline-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.vars\.less$/,
        issuer: /\.ts$/,
        use: {
          loader: '@kemu/less-vars-loader',
          options: {
            camelCase: false
          }
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: mode === 'development'
            },
            allowTsInNodeModules: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new WriteFilePlugin(),
    new IgnorePlugin({
      resourceRegExp: /assets/
    })
  ],
  optimization: {
    minimize: mode === 'production',
    minimizer: [new TerserPlugin()]
  }
});

module.exports = (processEnv = {}, { mode }) => {
  const env = {
    ...defaultEnv,
    ...processEnv
  };

  const { buildConstraint } = env;

  switch (buildConstraint) {
    case 'wc':
      return [webComponentsES6(mode, env), webComponentsES5(mode, env)];
    case 'wc:es6':
      return webComponentsES6(mode, env);
    case 'wc:es5':
      return webComponentsES5(mode, env);
    case 'lib':
      return [libraryES6(mode)];
    default:
      return [
        webComponentsES6(mode, env),
        webComponentsES5(mode, env),
        libraryES6(mode)
      ];
  }
};