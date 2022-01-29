import { tokenKey, sessionCodeKey } from '@/utils/config'
import { parseRoute, redirect } from '@/utils'
import { wxappAuthLogin, wxappReg, wxappAuth, wxappSessionCode } from '@/api/public'

export const checkSession = async() => {
  return new Promise((resolve) => uni.checkSession({
    success() {
      const sessionCode = uni.getStorageSync(sessionCodeKey)
      if (!sessionCode) {
        authSession()
      }
      resolve(true)
    },
    fail() {
      uni.removeStorageSync(sessionCodeKey)
      authSession()
      resolve(true)
    }
  }))
}

export const login = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res) => {
        resolve(res.code)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const authSession = async() => {
  const code = await login()
  return wxappSessionCode({ code: code }).then(({ data }) => {
    uni.setStorageSync(sessionCodeKey, data)
    return data
  })
}

export const appLogin = async(spread) => {
  let sessionCode = uni.getStorageSync(sessionCodeKey)
  if (!sessionCode || sessionCode === '') {
    sessionCode = await authSession()
  }
  if (sessionCode.hasReg) {
    return wxappAuthLogin({ openid: sessionCode.openid })
  } else {
    const { encryptedData, iv } = await userProfile()
    return wxappReg({
      sessionKey: sessionCode.session_key,
      openid: sessionCode.openid,
      spread: spread,
      encryptedData: encryptedData,
      iv: iv
    }).then((res) => {
      sessionCode.hasReg = true
      uni.setStorageSync(sessionCodeKey, sessionCode)
      return res
    })
  }
}

export const userProfile = () => {
  return new Promise((resolve, reject) => uni.getUserProfile({
    desc: '用于完善会员资料',
    success: (res) => {
      resolve(res)
    },
    fail: (err) => {
      reject(err)
    }
  }))
}

export const silentLogin = (openid, spread) => {
  return Promise.all([login(), userProfile()]).then((res) => {
    const code = res[0]
    const { encryptedData, iv } = res[1]

    return wxappAuth({
      code: code,
      userData: { encryptedData, iv },
      spread: spread
    })
  })
}

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
  // uni.reLaunch({ url: url })
  uni.navigateTo({ url: url })
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
