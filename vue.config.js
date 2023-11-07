const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包后默认为绝对路径
  // 配置成相对路径
  publicPath: './',
  transpileDependencies: true
})
