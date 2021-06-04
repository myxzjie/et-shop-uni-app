import request from '@/utils/request'

/*
 * 商品分类
 * */
export function getCategory() {
  return request({
    url: '/category',
    method: 'get',
    power: false
  })
}

/*
 * 商品详情
 * */
export function getProductDetail(id) {
  return request({ url: '/product/detail/' + id, power: false })
}

/*
 * 精品、热门、首发列表
 * */
export function getProductPromotion(type) {
  return request({ url: '/groom/list/' + type, power: false })
}

/*
 * 商品列表
 * */
export function getProducts(data) {
  return request({ url: '/products', data: data, power: false })
}

/*
 * 为你推荐
 * */
export function getProductRecommend(page, limit) {
  return request({
    url: '/product/hot',
    data: { page: page, limit: limit },
    power: false
  })
}

/*
 * 购物车 添加
 * */
export function addCart(data) {
  return request({ url: '/cart/add', method: 'post', data })
}

/*
 * 购物车 获取数量
 * */
export function getCartCount(data) {
  return request({ url: '/cart/count', data })
}

/*
 * 购物车列表
 * */
export function getCartList() {
  return request({ url: '/cart/list' })
}

/*
 * 购物车 修改商品数量
 * */
export function changeCartNum(id, number) {
  return request({ url: '/cart/num', method: 'post', data: { id, number }})
}

/*
 * 购物车 删除
 * */
export function cartDelete(ids) {
  return request({ url: '/cart/del', method: 'post', data: { ids }})
}

/**
 * 搜索推荐关键字
 */
export function getSearchKeyword() {
  return request({ url: '/search/keyword' })
}

/**
 * 评价页面获取单个产品详情
 */
export function postOrderProduct(unique) {
  return request({ url: '/order/product', method: 'post', data: { unique }, power: true })
}

/**
 * 提交评价页面；
 */
export function postOrderComment(data) {
  return request({ url: '/order/comment', method: 'post', data, power: true })
}
