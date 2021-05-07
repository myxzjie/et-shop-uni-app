import { tokenKey } from '@/utils/config'
import { parseRoute, redirect } from '@/utils'

export function openLoginDialog() {
  const userToken = uni.getStorageSync(tokenKey)
  if (!userToken) {
    uni.navigateTo({
      url: '/pages/auth/login'
    })
  }
}

// const togo = function(url,data){
// 	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

// 	uni.navigateTo({
// 		url
// 	})

// export function param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''

// }

export function redirectTo(params = {}) {
  const pages = getCurrentPages() // 获取加载的页面
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const options = currentPage.options // 如果要获取url中所带的参数可以查看options
  params = Object.assign(params, options)
  const url = '/' + redirect(params)
  uni.reLaunch({
    url: url
  })
}

export function authLoginTo() {
  const pages = getCurrentPages() // 获取加载的页面
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const route = currentPage.route // 当前页面url
  const options = currentPage.options // 如果要获取url中所带的参数可以查看options
  const active = currentPage.data.active
  const params = { ...options }
  params.redirect = route
  if (active) {
    params.active = active
  }
  const url = parseRoute({
    path: '/pages/auth/login',
    params: params
  })
  uni.navigateTo({
    url: url
  })
}

// module.exports = {
//   // checkHasLogined: checkHasLogined,
//   // wxaCode: wxaCode,
//   // getUserInfo: getUserInfo,
//   // login: login,
//   // register: register,
//   // loginOut: loginOut,
//   // checkAndAuthorize: checkAndAuthorize,
//   openLoginDialog: openLoginDialog
// }
