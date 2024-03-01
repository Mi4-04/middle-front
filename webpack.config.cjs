require("dotenv/config");
const { resolve: resolvePath } = require("path");
const crypto = require("crypto");
const { DefinePlugin } = require("webpack");
const { getIfUtils, removeEmpty, propIf } = require("webpack-config-utils");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const resolveSrc = (path) =>
  resolvePath(...[__dirname, "src", path].filter(Boolean));
const resolvePublic = (path) =>
  resolvePath(...[__dirname, "public", path].filter(Boolean));
const resolveDist = (path) =>
  resolvePath(...[__dirname, "dist", path].filter(Boolean));

const stripSlashes = (value) => value.replace(/\/\/+/g, "/");

const API_URL = getEnv("API_URL", "/api");
const STAGE = getEnv("STAGE", "development");

const PUBLIC_PATH = "/";

const ENV = Object.freeze({
  API_URL,
  STAGE,
});

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
  },
};

module.exports = (env = {}, argv = {}) => {
  const { ifProduction } = getIfUtils(getEnvironment(env));
  const isDevServer = Boolean(env.WEBPACK_SERVE);
  const ifDevServer = (...args) => propIf(isDevServer, ...args);
  const nonce = crypto.randomBytes(16).toString("base64");

  return removeEmpty({
    mode: ifProduction("production", "development"),
    devtool: ifProduction("hidden-source-map", "eval-cheap-source-map"),
    entry: [
      resolveSrc("index.csp.ts"),
      resolveSrc("index.polyfills.ts"),
      resolveSrc("index.tsx"),
    ],
    output: {
      assetModuleFilename: "assets/[name]-[contenthash][ext]",
      filename: ifProduction(
        "assets/[name]-[contenthash].js",
        "assets/[name].js",
      ),
      path: resolveDist(),
      publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: babelLoader,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|png|woff2)$/,
          type: "asset",
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /react/,
              use: [
                babelLoader,
                {
                  loader: "@svgr/webpack",
                  options: { babel: false, svgo: false, ref: true },
                },
              ],
            },
            {
              type: "asset",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".ts", ".tsx", ".json"],
      alias: {
        "@": resolveSrc(""),
      },
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: { chunks: "all" },
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
          terserOptions: {
            ecma: 2017,
            compress: {
              collapse_vars: false,
              join_vars: false,
              reduce_vars: false,
              unused: false,
              passes: 2,
            },
          },
        }),
      ],
    },
    plugins: removeEmpty([
      new DefinePlugin(
        Object.entries(ENV).reduce(
          (memo, [name, value]) => ({
            ...memo,
            [`import.meta.env.${name}`]: JSON.stringify(value),
          }),
          {},
        ),
      ),
      new DefinePlugin({
        __WEBPACK__NONCE__: JSON.stringify(nonce),
      }),
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: resolveSrc("index.html"),
        templateParameters: {
          nonce,
          getPublicPath: (src) => stripSlashes(`${PUBLIC_PATH}/${src}`),
        },
      }),
      new CspHtmlWebpackPlugin(
        {
          "base-uri": `'self'`,
          "object-src": `'none'`,
          "font-src": [`'self'`],
          "frame-src": [`'none'`],
          "form-action": [`'self'`],
          "style-src": [`'self'`, `'unsafe-inline'`],
          "script-src": removeEmpty([
            `'strict-dynamic'`,
            `'nonce-${nonce}'`,
            `'unsafe-inline'`,
            ifDevServer(`'unsafe-eval'`),
            "http:",
            "https:",
          ]),
        },
        {
          enabled: true,
          hashEnabled: {
            "script-src": false,
            "style-src": false,
          },
          nonceEnabled: {
            "script-src": false,
            "style-src": false,
          },
        },
      ),
      ifProduction(makeImageminPlugin()),
      ifDevServer(new ReactRefreshWebpackPlugin()),
      new CopyWebpackPlugin({ patterns: [{ from: resolvePublic() }] }),
      ifProduction(
        new CleanWebpackPlugin({
          protectWebpackAssets: false,
          cleanAfterEveryBuildPatterns: ["*/*.map"],
        }),
      ),
    ]),
    devServer: {
      historyApiFallback: true,
      static: resolvePublic(),
    },
    cache: {
      type: ifProduction("memory", "filesystem"),
    },
  });
};

function getEnvironment(env) {
  if (env.developement) return "development";
  if (env.production) return "production";
  return process.env.NODE_ENV || "development";
}

function getEnv(name, defaultValue) {
  return process.env[name] || defaultValue;
}

function makeImageminPlugin() {
  return new ImageMinimizerPlugin({
    severityError: "warning",
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminMinify,
      options: {
        plugins: [
          [
            "svgo",
            {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          ],
        ],
      },
    },
  });
}
