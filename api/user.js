import request from '@/utils/request'

/*
 * 个人中心
 * */
export function getUser() {
  return request({ url: '/user', power: true })
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
  return request({ url: '/menu/user' })
}

/*
 * 添加收藏产品
 * */
export function collectAdd(id, category) {
  return request({ url: '/collect/add', method: 'post', data: { id: id, category: category }})
}

/*
 * 删除收藏产品
 * */
export function collectDelete(id, category) {
  return request({ url: '/collect/del', method: 'post', data: { id: id, category: category }})
}

/*
 * 批量收藏产品
 * */
export function postCollectAll(data) {
  return request({ url: '/collect/all', method: 'post', data })
}

/*
 * 批量收藏产品
 * */
export function collectBatchAdd(data) {
  return request({ url: '/collect/all', method: 'post', data })
}

/*
 * 获取收藏产品
 * */
export function getCollectUser(page, limit) {
  return request({ url: '/collect/user', data: { page: page, limit: limit }})
}

/**
 * 省市区
 */
export function district(data) {
  return request({ url: '/citys', data })
}

/**
 * 用户发送验证码
 * @param data object 用户手机号
 */
export function registerVerify(data) {
  return request({ url: '/register/verify', method: 'POST', data, power: false })
}

/*
 * 领取优惠券列表
 * */
export function getCoupon(data) {
  return request({ url: '/coupons', data, power: true })
}

/*
 * 点击领取优惠券
 * */
export function getCouponReceive(id) {
  return request({ url: '/coupon/receive', method: 'POST', data: { couponId: id }, power: true })
}

/*
 * 批量领取优惠券
 * */
export function couponReceiveBatch(couponId) {
  return request({ url: '/coupon/receive/batch', method: 'POST', data: { couponId: couponId }})
}

/*
 * 我的优惠券
 * */
export function getCouponsUser(type) {
  return request({ url: '/coupons/user/' + type })
}

/*
 * 用户信息
 * */
export function getUserInfo() {
  return request({ url: '/userinfo', power: true })
}

/*
 * 地址列表
 * */
export function getAddressList(data) {
  return request({ url: '/address/list', data })
}

/*
 * 删除地址
 * */
export function getAddressRemove(id) {
  return request({ url: '/address/del', method: 'POST', data: { id: id }})
}

/*
 * 设置默认地址
 * */
export function getAddressDefaultSet(id) {
  return request({ url: '/address/default/set', method: 'POST', data: { id: id }})
}

/*
 * 获取默认地址
 * */
export function getAddressDefault() {
  return request({ url: '/address/default' })
}

/*
 * 获取单个地址
 * */
export function getAddress(id) {
  return request({ url: `/address/detail/${id}` })
}

/*
 * 修改 添加地址
 * */
export function postAddress(data) {
  return request({ url: '/address/edit', method: 'POST', data })
}

/*
 * 签到配置
 * */
export function getSignConfig() {
  return request({ url: '/sign/config' })
}

/*
 * 签到里的签到列表
 * */
export function getSignList(page, limit) {
  return request({ url: '/sign/list', data: { page: page, limit: limit }})
}

/*
 * 签到列表
 * */
export function getSignMonth(page, limit) {
  return request({ url: '/sign/month', data: { page: page, limit: limit }})
}

/*
 * 签到用户信息
 * */
export function postSignUser(data) {
  return request({ url: '/sign/user', method: 'POST', data })
}

/*
 * 签到
 * */
export function postSignIntegral(data) {
  return request({ url: '/sign/integral', method: 'POST', data })
}

/*
 * 推广数据
 * */
export function getSpreadInfo() {
  return request({ url: '/commission' })
}

/*
 * 推广人列表
 * */
export function getSpreadUser(screen) {
  return request({ url: '/spread/people', method: 'POST', data: screen })
}

/*
 * 推广人订单
 * */
export function getSpreadOrder(where) {
  return request({ url: '/spread/order', method: 'POST', data: where })
}

/*
 * 资金明细（types|0=全部,1=消费,2=充值,3=返佣,4=提现）
 * */
export function getCommissionInfo(q, types) {
  return request({ url: '/spread/commission/' + types, data: q })
}

/*
 * 积分记录
 * */
export function getIntegralList(q) {
  return request({ url: '/integral/list', q })
}

/*
 * 核销金记录
 * */
export function goldRecord(q) {
  return request({ url: '/gold/list', q })
}

/**
 * 兑换核销金
 * @param {*} data
 */
export function goldExchange(data) {
  return request({ url: '/gold/exchange', method: 'post', data: data })
}

/*
 * 提现银行
 * */
export function getBank() {
  return request({ url: '/extract/bank' })
}

/*
 * 提现申请
 * */
export function postCashInfo(cash) {
  return request({ url: '/extract/cash', method: 'post', data: cash })
}

/*
 * 会员中心
 * */
export function getVipInfo() {
  return request({ url: '/user/level/grade' })
}

/*
 * 会员等级任务
 * */
export function getVipTask(id) {
  return request({ url: `/user/level/task/${id}` })
}

/*
 * 资金统计
 * */
export function getBalance() {
  return request({ url: '/user/balance' })
}

/*
 * 活动状态
 * */
export function getActivityStatus() {
  return request({ url: '/user/activity' })
}

/*
 * 活动状态
 * */
export function getSpreadImg() {
  return request({ url: '/poster/rebate' })
}

/*
 * 用户修改信息
 * */
export function postUserEdit(data) {
  return request({ url: '/user/edit', method: 'post', data })
}

/*
 * 用户修改信息
 * */
export function getChatRecord(to_uid, data) {
  return request({ url: 'user/service/record/' + to_uid, data })
}

/*
 * 用户修改信息
 * */
export function serviceList() {
  return request({ url: 'user/service/list' })
}

/*
 * 公众号充值
 * */
export function rechargeWechat(data) {
  return request({ url: '/recharge/wechat', method: 'post', data })
}

/*
 * 绑定手机号
 * */
export function bindingPhone(data) {
  return request({ url: '/binding', method: 'post', data })
}

/*
 * 获取推广人排行
 * */
export function getRankList(q) {
  return request({ url: 'rank', q })
}
/*
 * 获取佣金排名
 * */
export function getBrokerageRank(q) {
  return request({ url: 'brokerage_rank', q })
}

/**
 * 检测会员等级
 */
export function setDetection() {
  return request({ url: '/user/level/detection' })
}
