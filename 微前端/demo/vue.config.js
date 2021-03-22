const path = require('path')
const webpack = require('webpack')
const APP_NAME = require('./package.json').name
const resolve = (dir) => {
  return path.join(__dirname, dir)
}


module.exports = {
  // first 
  publicPath: `/${APP_NAME}/`,
  devServer: {
    port: 18081, //项目端口
    disableHostCheck: true, //关闭host检测(配置了这个才可以通过域名访问)
    compress: true, // 代码压缩
  },
  // five handler
  configureWebpack: {
    //这里必须引入vue
    // 引入外部公用库，比如，jquery， vue, element-ui 等
    externals: {
      vue: 'Vue',
    },

    entry: './src/main.js',
    output: {
      libraryExport: 'default', // https://cli.vuejs.org/zh/guide/build-targets.html#应用
      jsonpFunction: `webpackJsonp-${APP_NAME}`, // 解决默认情况下子项目 chunkname 冲突的问题
      libraryTarget: 'umd'
    },
    // plugins 插件注入
    plugins: [
      // 去除 moment 中 i18n

      // 声明 ‘production’ 生产环境最小体积
      new webpack.DefinePlugin({
        'XM.MN': JSON.stringify(APP_NAME),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
    ]
  },
  chainWebpack: config => {
    // 路径别名
    // second handler @
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@globalStyle', resolve('src/assets/globalStyle'))
      .set('@img', resolve('src/assets/image'))
      .set('@api', resolve('src/api'))
      .set('@bApi', resolve('src/baseApi'))
      .set('@cps', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@pages', resolve('src/pages'))

    // third handler image compress
    // //压缩图片
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 200000,
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         outputPath: 'static/images'
    //       }
    //     }
    //   })
    //   .end()
  },
  // first handler css options
  // css 选项
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@globalStyle/variable.scss";
          @import "@globalStyle/themeVariable.scss";
          @import "@globalStyle/themeMixin.scss";
        `
      }
    }
  }
}