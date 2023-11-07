<template>
<!-- 登录流程: 获取图形验证码{base64, key} -> {code, key, 手机号}获取短信验证码 -->
<div class="login">
  <!-- 头部可用vant里边的navbar -->
  <!-- $router.go(-1)返回上一页 -->
  <van-nav-bar
  title="登录"
  left-arrow
  @click-left="$router.go(-1)"
/>
<div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="4" placeholder="请输入图形验证码" type="text">
          <!-- 处理刚加载图片碎裂问题: 条件渲染 -->
          <img :src="picUrl" v-if="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button ref="btn" @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>
    </div>
</div>

</template>

<script scoped>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
export default {
  name: 'MyLogin',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      smsCode: ''
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 后续需要实现点击图片重新请求, 固封装成一个函数
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      // toast导入后会挂载在vue原型上, 在组件内使用this.$toast可以直接使用
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确图形验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        this.$toast('短信发送成功, 请查收')
        this.timer = setInterval(() => {
        // this.$refs.btn.disable = true
          this.second--
          console.log('正在倒计时')
          if (this.second === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      // commit('模块/函数')
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast(res.message)
      // 跳转到首页
      // 判断有无回跳地址否则回首页
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url) // 使用replace替换历史, 否则go(-1)会出bug返回登录页
    }
  },
  // 避免定时器在离开页面不会清除造成性能浪费
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
