module.exports = {
  // 配置less文件  ~@/assets/css/base.less 文件配置全局变量
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: `true; @import '~@/assets/less/variables.less';` //公共样式base.less
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use({
        loader: 'worker-loader',
        options: {
          inline: true
        }
      })
      .loader('worker-loader')
      .end()
  },
  parallel: false, // 打包报错的配置
};