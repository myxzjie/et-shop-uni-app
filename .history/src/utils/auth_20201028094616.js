import { tokenKey} from '@/utils/config'

export function openLoginDialog() {
  
  uni.navigateTo({
    url: '/pages/auth/login'
  })
}

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
