// vue2中复用方法, 用mixins混入
// 公共的一些data(){Return{}}, methods: {}
// 组件内部同名优先级更高, 生命周期除外
export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此操作需要登录才能继续',
            confirmButtonText: '去登录',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            // 跳转到登录的路由, 登录成功后会跳转回首页
            // 若希望登录完成实现回跳, 则需要带参数的跳转(常用)
            this.$router.replace({
              // 使用replace替换历史, 否则go(-1)会出bug返回登录页
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
