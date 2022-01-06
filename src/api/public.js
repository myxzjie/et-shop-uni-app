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
export const wxappAuthLogin = (data) => {
  return request({
    url: '/auth/wxapp/login',
    method: 'post',
    data,
    power: false
  })
}

/*
 * 小程序登陆
 * */
export const wxappReg = (data) => {
  return request({
    url: '/auth/wxapp/reg',
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
    url: '/wxapp/auth',
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
  return request({ url: '/article/list', method: 'get', data, power: false })
}

/**
 * 文章详情
 * @returns {*}
 */
export function getArticleDetails(id) {
  return request({ url: '/article/details/' + id, method: 'get', power: false })
}

/**
 * 文章 轮播列表
 * @returns {*}
 */
export function getArticleBanner() {
  return request({ url: '/article/banner/list', power: false })
}

/**
 * 文章分类列表
 * @returns {*}
 */
export function getArticleCategory() {
  return request({ url: '/article/category/list', power: false })
}

/**
 * 文章 热门列表
 * @returns {*}
 */
export function getArticleHotList() {
  return request({ url: '/article/hot/list', power: false })
}

export const saveArticleComment = (data) => {
  return request({ url: '/article/comment', method: 'post', data })
}

export const getArticleComment = (id) => {
  return request({ url: `/article/comment/${id}`, method: 'get', power: false })
}
/**
 * 分享
 * @returns {*}
 */
export function getShare() {
  return request({ url: '/share', power: false })
}

/**
 * 获取快递公司
 * @returns {*}
 */
export function getLogistics() {
  return request({ url: '/logistics', power: false })
}

/**
 * 获取图片base64
 * @retins {*}
 * */
export function imageBase64(image, code) {
  return request({ url: '/image_base64', data: { image: image, code: code }})
}
