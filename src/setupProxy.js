const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
/*     createProxyMiddleware("/api/upload", {
      target: "http://jsonplaceholder.typicode.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/upload": ""
      }
    }) */
    createProxyMiddleware("/blogApi", {
      target: "http://localhost:8888",
      changeOrigin: true,
      pathRewrite: {
        "^/blogApi": ""
      }
    })
  );
};
