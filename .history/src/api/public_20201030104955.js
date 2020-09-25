import request from '@/utils/request'

/*
 * 小程序登陆
 * */
export function wxappSessionCode(data) {
  return request({
    url: '/wxapp/session-code',
    method: 'post',
    data,
    power: false
  })
}

/*
 * 小程序登陆
 * */
export function wxappAuth(data) {
  return request({
    url: '/wxapp/auth2',
    method: 'post',
    data,
    power: false
  })
}

export function wxappPhone(data) {
  return request({
    url: '/wxapp/phone',
    method: 'post',
    data,
    power: false
  })
}

export function registerVerify(data) {
  return request({
    url: '/register/verify',
    method: 'post',
    data,
    power: false
  })
}

export function register(data) {
  return request({
    url: '/wxapp/register',
    method: 'post',
    data,
    power: false
  })
}

/**
 * 首页
 * @returns {*}
 */
export function getHomeData() {
  return request({
    url: '/index',
    method: 'get',
    power: false
  })
}

/**
 * 文章列表
 * @returns {*}
 */
export function getArticleList(data) {
  return request({ url: '/article/list/', method: 'get', data, power: false })
}

/**
 * 文章详情
 * @returns {*}
 */
export function getArticleDetails(id) {
  return request({url: '/article/details/' + id, method:'get',  power: false })
}


/**
 * 文章 轮播列表
 * @returns {*}
 */
export function getArticleBanner() {
  return request.get('/article/banner/list', {}, { login: false })
}

/**
 * 文章分类列表
 * @returns {*}
 */
export function getArticleCategory() {
  return request.get('/article/category/list', {}, { login: false })
}

/**
 * 文章 热门列表
 * @returns {*}
 */
export function getArticleHotList() {
  return request.get('/article/hot/list', {}, { login: false })
}

/**
 * 分享
 * @returns {*}
 */
export function getShare() {
  return request.get('/share', {}, { login: false })
}


/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function getWechatConfig() {
  // return request.get(
  //   "/wechat/config",
  //   { url: document.location.href },
  //   { login: false }
  // );
}

/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function wechatAuth(code, spread, login_type) {
  return request.get(
    '/wechat/auth',
    { code, spread, login_type },
    { login: false }
  )
}
/**
 * 获取快递公司
 * @returns {*}
 */
export function getLogistics() {
  return request.get('/logistics', {}, { login: false })
}

/**
 * 获取图片base64
 * @retins {*}
 * */
export function imageBase64(image, code) {
  return request.post(
    '/image_base64',
    { image: image, code: code },
    { login: false }
  )
}
