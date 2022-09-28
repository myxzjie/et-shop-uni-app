
import { baseURL } from '@/utils/config'

module.exports = (request) => {
  const uri = request.uri
  const method = request.method || 'GET'
  const headers = request.headers || {}
  const data = request.data
  // let params = request.params
  const power = request.power

  if (power.login) {
    headers['Authorization'] = 'Bearer '
  }

  // 如果调用接口不明确指明不显示loading
  if (!request.hideLoading) {
    uni.showLoading({
      // title: '加载中'
    })
  }

  uni.request({
    url: baseURL + uri,
    method: method,
    data: data,
    dataType: 'json',
    sslVerify: false,
    complete: (e) => {
      uni.hideLoading()
      typeof request.complete === 'function' && request.complete(e.data)
    },
    success: res => {
      if (res.statusCode && res.statusCode !== 200) {
        uni.showModal({ content: res.msg })
        return
      }
      typeof request.success === 'function' && request.success(res.data)
    },
    fail: err => {
      uni.showModal({ content: err.msg })
      typeof request.fail === 'function' && request.fail(err.data)
    }
  })
}
