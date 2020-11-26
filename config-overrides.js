const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackAlias,
} = require("customize-cra");

const path = require("path");

const modifyVars = require("./modifyVars");


module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports("antd", {
    libraryDirectory: "es",
    style: true,
  }),

  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),

  // 不使用 eslint
  disableEsLint(),

  addLessLoader({
    lessOptions: {
      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
      javascriptEnabled: true,
      modifyVars,
    },
  }),


);
