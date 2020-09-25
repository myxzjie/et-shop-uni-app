
import {baseURL, tokenKey} from '@/utils/config'

const filter = []

const request = ({ url = '', data = {}, method = 'GET', header = {}, power = true, hideLoading }) => {
  debugger
  if (filter.indexOf(url) < 0) {
    // 获取用户token
    const userToken = uni.getStorageSync('userToken')
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
    }).then((response) => {
      setTimeout(()=> {
        uni.hideLoading()
      }, 200)
      const [error, res] = response
      if(error){
        console.error(error)
      }
      resolve(res.data)
    }).catch(error => {
      const [err, res] = error
      console.error(res)
      reject(err)
    })
  })
}
export default request
