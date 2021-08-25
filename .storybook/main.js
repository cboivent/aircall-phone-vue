const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "vue-style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            prependData: `
              @import "@/styles/_variables.scss";
              @import "@/styles/_global.scss";
            `,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    // FOR TS SUPPORT
    // config.module.rules.push({
    //   test: /\.ts$/,
    //   loader: "ts-loader",
    //   options: { appendTsSuffixTo: [/\.vue$/] },
    // });
    // config.resolve.plugins = config.resolve.plugins || [];
    // config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    config.resolve.alias['@'] = rootPath

    return config;
  },
};
