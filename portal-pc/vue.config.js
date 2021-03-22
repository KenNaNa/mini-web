const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const APP_NAME = require('./package.json').name
const PROXY = require('./config/proxy')
const modules = require('./config/modules')
const webpack = require('webpack')
// const InsertScriptWebpackPlugin = require('insert-script-webpack-plugin')
const InsertScriptWebpackPlugin = require('./scripts/InsertScriptWebpackPlugin')
// https://github.com/tbhuabi/insert-script-webpack-plugin#readme
// second handler @
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = {
  // fourth handler
  publicPath: './', // 打包到当前目录
  outputDir: 'dist', // 打包输出目录
  parallel: require('os').cpus().length > 1, // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true, // 根据环境来决定是否开启代码调试，如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    port: 19090, //项目端口
    proxy: PROXY, //这会告诉服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到PROXY中配置的url
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
    // 分离 插件
    optimization: {
      minimize: true,
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
          assetNameRegExp: /\.(sa|sc|c)ss$/g,
          // 指定一个优化css的处理器，默认cssnano
          cssProcessor: require('cssnano'),

          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true
              }, //对注释的处理
              normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
            }]
          },
          canPrint: true // 是否打印编译过程中的日志
        })
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 3000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 10,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "all"
          },
          echarts: {
            name: "chunk-echarts",
            priority: 30,
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: "all"
          },
          ckeditor: {
            name: "chunk-ckeditor",
            priority: 40,
            test: /[\\/]node_modules[\\/]@ckeditor[\\/]ckeditor5-build-classic[\\/]build[\\/]/,
            chunks: "all"
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'initial',
            enforce: true,
          },
          moment: {
            name: "chunk-moment",
            priority: 50,
            test: /[\\/]node_modules[\\/]moment[\\/]/,
            chunks: "all"
          },
          zrender: {
            name: "chunk-zrender",
            priority: 60,
            test: /[\\/]node_modules[\\/]zrender[\\/]/,
            chunks: "all"
          },
          main: {
            name: "chunk-main",
            priority: 70,
            test: /[\\/]src[\\/]main[\.]js/,
            chunks: "all"
          }
        }
      }
    },
    // plugins 插件注入
    plugins: [

      // 导入子项目的依赖
      // new InsertScriptWebpackPlugin({
      //   files: modules
      // }),

      // 去除 moment 中 i18n
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

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
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 200000,
        fallback: {
          loader: 'file-loader',
          options: {
            outputPath: 'static/images'
          }
        }
      })
      .end()
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