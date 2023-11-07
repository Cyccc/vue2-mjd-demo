module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // vant按需导入需要在此配置以下内容
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
