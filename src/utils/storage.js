
const ACCESS_TOKEN = "access_token_key"
const REFRESH_TOKEN = "refresh_token_key"
const SESSION_CCODE ="session_code_key"

export default {
  // 写入accessToken
  setAccessToken(val) {
    uni.setStorageSync(ACCESS_TOKEN, val)
  },
  // 获取accessToken
  getAccessToken() {
    return uni.getStorageSync(ACCESS_TOKEN)
  },
  // 删除token
  removeAccessToken() {
    uni.removeStorageSync(ACCESS_TOKEN)
  },
  // 写入刷新token
  setRefreshToken(val) {
    uni.setStorageSync(REFRESH_TOKEN, val)
  },
  // 获取刷新token
  getRefreshToken() {
    return uni.getStorageSync(REFRESH_TOKEN)
  },
  // 删除token
  removeRefreshToken() {
    uni.removeStorageSync(REFRESH_TOKEN)
  },
  setSessionCode(val){
    uni.setStorageSync(SESSION_CCODE, val)
  },
  getSessionCode(){
   return uni.getStorageSync(SESSION_CCODE)
  },
  removeSessionCode() {
    uni.removeStorageSync(SESSION_CCODE)
  },
}