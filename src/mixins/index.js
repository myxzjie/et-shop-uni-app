import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {}
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
    }
  }
}
