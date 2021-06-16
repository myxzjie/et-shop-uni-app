/*
 * 订单确认
 * */
import request from '@/utils/request'

/**
 * 通过购物车 id 获取订单信息
 * @param cartId
 * @returns {*}
 */
export function postOrderConfirm(cartId) {
  return request({ url: '/order/confirm', method: 'post', data: { cartId }})
}

/**
 * 计算订单金额
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
  return request({ url: '/order/computed/' + key, method: 'post', data })
}

/**
 * 获取指定金额可用优惠券
 * @param price
 * @returns {*}
 */
export function getOrderCoupon(price) {
  return request.get('/coupons/order/' + (parseFloat(price) || 0))
}

/**
 * 生成订单
 * @param key
 * @param data
 * @returns {*}
 */
export function createOrder(key, data = {}) {
  return request({ url: '/order/create/' + key, method: 'post', data })
}

/**
 * 订单统计数据
 * @returns {*}
 */
export function getOrderData() {
  return request({ url: '/order/data' })
}

/**
 * 订单列表
 * @returns {*}
 */
export function getOrderList(data) {
  return request({ url: '/order/list', data })
}

/**
 * 取消订单
 * @returns {*}
 */
export function cancelOrder(id) {
  return request.post('/order/cancel', { id })
}

/**
 * 订单详情
 * @returns {*}
 */
export function orderDetail(id) {
  return request({ url: '/order/detail/' + id })
}

/**
 * 退款理由
 * @returns {*}
 */
export function getRefundReason() {
  return request({ url: '/order/refund/reason' })
}

/**
 * 提交退款
 * @returns {*}
 */
export function postOrderRefund(data) {
  return request({ url: '/order/refund/verify', method: 'post', data })
}

/**
 * 确认收货
 * @returns {*}
 */
export function takeOrder(uni) {
  return request({ url: '/order/take', method: 'post', data: { uni }})
}

/**
 * 删除订单
 * @returns {*}
 */
export function delOrder(uni) {
  return request({ url: '/order/del', method: 'post', data: { uni }, power: true })
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function express(params) {
  return request({url:'/order/express', method:'post', data:params})
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function payOrder(uni, paytype, from) {
  return request({ url: '/order/pay', method: 'post', data: { uni, paytype, from }})
}
/**
 * 订单核销
 * @returns {*}
 */
export function orderVerific(verify_code, is_confirm) {
  return request.post('order/order_verific', { verify_code, is_confirm })
}

export function orderQrcode(params) {
  return request({ url: '/order/qrcode', method: 'post', params })
}

export function orderWriteOff(params) {
  return request.post({ url: '/order/write-off', method: 'post', params })
}
