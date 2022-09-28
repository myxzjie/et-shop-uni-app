import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {},
      disabled: false,
      text: '获取验证码'
    }
  },
  created() {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
  methods: {
    async getUserInfo() {
      const that = this
      await getUserInfo().then(({ data }) => {
        that.userInfo = Object.assign({}, data)
      }).catch(err => {
        console.error(err.message)
      })
    },
    sendCode() {
      const that = this
      if (that.disabled) return
      that.disabled = true
      let n = 60
      that.text = '剩余 ' + n + 's'
      const run = setInterval(() => {
        n = n - 1
        if (n < 0) {
          clearInterval(run)
        }
        that.text = '剩余 ' + n + 's'
        if (that.text < '剩余 ' + 0 + 's') {
          that.disabled = false
          that.text = '重新获取'
        }
      }, 1000)
    }
  }
}
