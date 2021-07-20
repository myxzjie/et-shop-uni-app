// const conf = {
//   baseURL: 'https://www.99jiuye.cn/api'
// }
let baseURL = 'https://www.99jiuye.cn/api'
const resURL = 'https://shop.cdn.dev56.com'

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  // conf.baseURL = 'http://localhost:8019/api'
  baseURL = 'http://localhost:8019/api'
} else if (process.env.NODE_ENV === 'staging') {
  baseURL = 'https://api.test.dev56.com/api'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  conf.baseURL = 'https://www.99jiuye.cn/api'
}

const tokenKey = 'userToken'
const cartCheckedKey = 'cartChecked'

// export default { conf, baseURL }

module.exports = {
  resURL: resURL,
  baseURL: baseURL,
  tokenKey: tokenKey,
  cartCheckedKey: cartCheckedKey
}
