// import router from "../router";
import store from '../store'
// import cookie from '@/utils/store/cookie'
import { isWeixin, login, getCurrentPageUrl, getCurrentPageUrlWithArgs, parseQuery, replace, handleQrCode } from '@/utils'

export default function toLogin(push, backUrl) {
  store.commit('LOGOUT')
  if (store.getters.isAuthorization) {
    login()
    return
  }
  if (store.getters.isAuthorizationPage || getCurrentPageUrl() == '/pages/authorization/main') {
    return
  }

  // 判断是不是扫描的砍价海报进来的
  if (getCurrentPageUrl() == 'pages/activity/DargainDetails/main' && handleQrCode()) {
    const url = handleQrCode()
    if (url) {
      replace({ path: '/pages/authorization/main', query: { redirect: `/${getCurrentPageUrl()}`, id: url.bargainId, partake: url.uid }})
    }
    replace({ path: '/pages/authorization/main', query: { redirect: `/${getCurrentPageUrl()}`, ...parseQuery() }})
  } else {
    replace({ path: '/pages/authorization/main', query: { redirect: `/${getCurrentPageUrl()}`, ...parseQuery() }})
  }
  store.commit('UPDATE_AUTHORIZATION', false)
  store.commit('UPDATE_AUTHORIZATIONPAGE', true)
}

