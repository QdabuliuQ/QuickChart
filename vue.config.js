module.exports = {
  // 配置less文件  ~@/assets/css/base.less 文件配置全局变量
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: `true; @import '~@/assets/less/variables.less';`   //公共样式base.less
        }
      }
    }
  },
};