// request
import { baseURL, tokenKey } from '@/utils/config'
import { authLoginTo } from '@/utils/auth'

const filter = []

const request = ({ url = '', data = {}, method = 'GET', header = {}, power = true, hideLoading }) => {
  if (filter.indexOf(url) < 0) {
    // 获取用户token
    const userToken = uni.getStorageSync(tokenKey)
    if (!userToken && power) {
      authLoginTo()
      // const pages = getCurrentPages() //获取加载的页面
      // debugger
      // const currentPage = pages[pages.length-1] //获取当前页面的对象
      // debugger
      // const route = currentPage.route //当前页面url
      // const options = currentPage.options //如果要获取url中所带的参数可以查看options
      // const active = currentPage.data.active

      // uni.navigateTo({
      //   url: '/pages/auth/login'
      // })
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
      if (data.status === 6000) {
        return resolve(data)
      }
      if (data.status === 401) {
        authLoginTo()
      }
      // const [error, res] = response
      if (error) {
        console.error(error)
      }
      reject(data)
    }).catch(error => {
      const [err, res] = error
      console.error(res)
      reject(err)
    })
  })
}
export default request
