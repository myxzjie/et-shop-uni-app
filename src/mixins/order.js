import { takeOrder, delOrder } from '@/api/order'

export default {
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    takeOrderHandle(orderId) {
      return new Promise((resolve, reject) => {
        takeOrder(orderId).then(res => {
          uni.showToast({
            title: '收货成功', icon: 'success', duration: 2000
          })
          resolve(res)
        }).catch(err => {
          uni.showToast({
            title: '收货失败', icon: 'none', duration: 2000
          })
          reject(err)
        })
      })
    },

    delOrderHandle(orderId) {
      return new Promise((resolve, reject) => {
        uni.showModal({
          title: '提示',
          content: '确认删除该订单?',
          success: () => {
            delOrder(orderId)
              .then(res => {
                uni.showToast({
                  title: '删除成功', icon: 'success', duration: 2000
                })
                resolve(res)
              })
              .catch(err => {
                uni.showToast({
                  title: '删除失败', icon: 'none', duration: 2000
                })
                reject(err)
              })
          }
        })
      })
    },
  }
}
