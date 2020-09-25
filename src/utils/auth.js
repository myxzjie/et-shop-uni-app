import { tokenKey } from '@/utils/config'

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

module.exports = {
  // checkHasLogined: checkHasLogined,
  // wxaCode: wxaCode,
  // getUserInfo: getUserInfo,
  // login: login,
  // register: register,
  // loginOut: loginOut,
  // checkAndAuthorize: checkAndAuthorize,
  openLoginDialog: openLoginDialog
}
