const path = require("path")
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
module.exports = {
  publicPath: '/',
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
      .include.add(path.resolve("src/workers"))
      .end()
      .use({
        loader: 'worker-loader',
        options: {
          inline: true
        }
      })
      .loader('worker-loader')

    config.module
      .rule('thread-loader')
      .test(/\.vue/)
      .include.add(path.resolve("src"))
      .end()
      .use({
        loader: "thread-loader",
        options: {
          workers: 6,
        },
      })
      .loader('thread-loader')

    config
      .when(process.env.NODE_ENV === 'development',
        config => {
          config
            .plugin('HardSourceWebpackPlugin')
            .use(HardSourceWebpackPlugin);
        }
      )
  },
  parallel: false, // 打包报错的配置
};