const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require("customize-cra");

const modifyVars = require("./modifyVars");

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports("antd", {
    libraryDirectory: "es",
    style: true,
  }),
/*   addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    "@components": path.resolve(__dirname, "./src/components"),
  }), */
  addLessLoader({
    lessOptions: {
      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
      javascriptEnabled: true,
      modifyVars,
    },
  })
);
