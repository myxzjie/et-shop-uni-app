// const conf = {
//   baseURL: 'https://www.99jiuye.cn/api'
// }
let baseURL = 'https://www.99jiuye.cn/api'
const resURL = 'https://shop.cdn.dev56.com'

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  // 开发环境
  // conf.baseURL = 'http://localhost:8019/api'
  baseURL = 'http://localhost:8019/api'
} else if (process.env.NODE_ENV === 'production') {
  console.log('production')
  // 生产环境
  // conf.baseURL = 'https://www.99jiuye.cn/api'
  baseURL = 'https://www.99jiuye.cn/api'
}

const tokenKey = 'userToken'

// export default { conf, baseURL }

module.exports = {
  resURL: resURL,
  baseURL: baseURL,
  tokenKey: tokenKey
}
