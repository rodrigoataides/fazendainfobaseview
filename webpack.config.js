const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config("./.env");

module.exports = (_, argv) => ({
  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: process.env.PORT,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Tamanho limite em bytes para converter para data URL. Ajuste conforme necessário.
              name: 'images/[name].[hash:8].[ext]', // Caminho e nome do arquivo de saída.
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]', // Caminho e nome do arquivo de saída.
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "fazendainfobaseview",
      filename: "remoteEntry.js",
      remotes: {
        //sso: process.env.SSO,
        //pessoa fisica
        pessoafisicadesv: "pessoafisica@http://localhost:3031/remoteEntry.js",
        pessoafisicahomo: "pessoafisica@https://fazendainfopf.rdca.com.br/remoteEntry.js",
        pessoafisicaprod: "pessoafisica@https://fazendainfopf.com.br/remoteEntry.js",

        //pessoa juridica
        pessoajuridicadesv: "pessoajuridica@http://localhost:3032/remoteEntry.js",
        pessoajuridicahomo: "pessoajuridica@https://fazendainfopj.rdca.com.br/remoteEntry.js",
        pessoajuridicaprod: "pessoajuridica@https://fazendainfopj.com.br/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
