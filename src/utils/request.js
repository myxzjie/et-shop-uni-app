// request
import { baseURL } from '@/utils/config'
import { authLoginTo } from '@/utils/auth'
import storage from '@/utils/storage'

const filter = []

const request = ({ url = '', data = {}, method = 'GET', header = {}, power = true, hideLoading }) => {
  if (filter.indexOf(url) < 0) {
    // 获取用户token
    const accessToken = storage.getAccessToken()
    if (!accessToken && power) {
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
      return new Promise((resolve, reject) => {
        reject(false)
      })
    } else {
      if(accessToken !== ''){
        const atob = (str) => Buffer.from(str,'base64').toString('binary')
        // 判断如果过期时间小于我的当前时间，在请求上重新刷新token
        if (accessToken.split(".").length <= 1) {
          // refresh();
          debugger
        } else {
          const jwtData = accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
          const json = JSON.parse(atob(jwtData))
          
          if (json.exp < Math.round(new Date() / 1000)) {
            // refresh();
            debugger
          }
        }
      }
      // 将设置请求头信息
      header.Authorization = 'Bearer ' + accessToken
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
      if (data.status >= 6000) {
        return resolve(data)
      }
      if (data.status === 401) {
        authLoginTo()
      }
      // const [error, res] = response
      // if (error) {
      //   console.error(error)
      // }
      reject(data)
    }).catch(error => {
      const [err, res] = error
      console.error(res)
      reject(err)
    })
  })
}
export default request
