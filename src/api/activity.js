import request from '@/utils/request'

/**
 * 拼团列表
 */
export function getCombinationList(data) {
  return request({ url: '/combination/list', data })
}

/**
 * 拼团产品详情
 * @param {*} id
 */
export function getCombinationDetail(id) {
  return request({ url: `/combination/detail/${id}`, power: true })
}

/**
 * 拼团 开团
 * @param {*} id
 */
export function getCombinationPink(id) {
  return request.get('/combination/pink/' + id)
}

/**
 * 拼团 取消开团
 */
export function getCombinationRemove(data) {
  return request.post('/combination/remove', data)
}

/**
 * 拼团海报
 * @param {*} id
 */
export function getCombinationPoster(data) {
  return request.post('/combination/poster', data)
}

/**
 * 秒杀列表配置
 */
export function getSeckillConfig() {
  return request({ url: '/seckill/index' })
}

/**
 * 秒杀列表
 */
export function getSeckillList(time, data) {
  return request({ url: '/seckill/list/' + time, data })
}

/**
 * 秒杀产品详情
 */
export function getSeckillDetail(id) {
  return request({ url: '/seckill/detail/' + id })
}

/**
 * 砍价列表
 * @param {*} data
 */
export function getBargainList(data) {
  return request({ url: '/bargain/list', data })
}

/**
 * 砍价产品详情
 */
export function getBargainDetail(id) {
  return request({ url: '/bargain/detail/' + id })
}

/**
 * 砍价 观看/分享/参与次数
 */
export function getBargainShare(data) {
  return request({ url: '/bargain/share', method: 'POST', data })
}

/**
 * 砍价开启
 * @param {*} data
 */
export function getBargainStart(data) {
  return request({ url: '/bargain/start', method: 'POST', data })
}

/**
 * 砍价 帮助好友砍价
 * @param {*} data
 */
export function getBargainHelp(data) {
  return request({ url: '/bargain/help', method: 'POST', data })
}

/**
 * 砍价 砍掉金额
 * @param {*} data
 */
export function getBargainHelpPrice(data) {
  return request({ url: '/bargain/help/price', method: 'POST', data })
}

/**
 * 砍价 砍价帮总人数、剩余金额、进度条、已经砍掉的价格
 * @param {*} data
 */
export function getBargainHelpCount(data) {
  return request.post('/bargain/help/count', data)
}

/**
 * 砍价 开启砍价用户信息
 * @param {*} data
 */
export function getBargainStartUser(data) {
  return request.post('/bargain/start/user', data)
}

/**
 * 砍价 砍价帮
 * @param {*} data
 */
export function getBargainHelpList(data) {
  return request.post('/bargain/help/list', data)
}

/**
 * 砍价海报
 * @param {*} data
 */
export function getBargainPoster(data) {
  return request.post('/bargain/poster', data)
}

/**
 * 砍价列表(已参与)
 * @param {*} data
 */
export function getBargainUserList(data) {
  return request.get('/bargain/user/list', data)
}

/**
 * 砍价取消
 */
export function getBargainUserCancel(data) {
  return request.post('/bargain/user/cancel', data)
}
