const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),

  devServer: {
    proxy: {
      "/api": {
        // target: 'http://localhost:3000'
        target: "https://b50b0518c9ed.ngrok.io/",
      },
    },
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'MasonCordova',
  },
};
