class InsertScriptWebpackPlugin {
  constructor(options = {}) {
    const { files = [], commonCss = [] } = options;
    this.files = files;
    this.commonCss = commonCss
  }

  apply(compiler) {
    const self = this;
    compiler.hooks.compilation.tap(
      'InsertScriptWebpackPlugin',
      (compilation) => {
        if (compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
            'InsertScriptWebpackPlugin',
            (htmlPluginData) => {
              console.log("htmlPluginData===>", htmlPluginData)
              const {
                assets: { js },
              } = htmlPluginData;
              js.unshift(...self.files); // 优先加载 files 文件
            },
          );
        } else {
          console.log('\n');
          console.log(
            '\x1b[41m%s\x1b[0m',
            'Error:',
            '`insert-script-webpack-plugin` dependent on `html-webpack-plugin`',
          );
        }
      },
    );
  }
}

module.exports = InsertScriptWebpackPlugin;