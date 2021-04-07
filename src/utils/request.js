// request
import { baseURL, tokenKey } from '@/utils/config'

const filter = []

const request = ({ url = '', data = {}, method = 'GET', header = {}, power = true, hideLoading }) => {
  if (filter.indexOf(url) < 0) {
    // 获取用户token
    const userToken = uni.getStorageSync(tokenKey)
    if (!userToken && power) {
      uni.navigateTo({
        url: '/pages/auth/login'
      })
      return false
    } else {
      // 将设置请求头信息
      header.Authorization = 'Bearer ' + userToken
    }
  }

  if (!hideLoading) {
    uni.showLoading({
      // title: '加载中'
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      method: method,
      url: baseURL + url,
      data: data,
      header: header,
      dataType: 'json'
    }).then(([error, res]) => {
      setTimeout(() => {
        uni.hideLoading()
      }, 200)
      const { data } = res
      if (data.status === 200) {
        return resolve(data)
      }
      if (data.status === 401) {
        uni.navigateTo({
          url: '/pages/auth/login'
        })
      }
      // const [error, res] = response
      // debugger
      if (error) {
        console.error(error)
      }
    }).catch(error => {
      const [err, res] = error
      debugger
      console.error(res)
      reject(err)
    })
  })
}
export default request
