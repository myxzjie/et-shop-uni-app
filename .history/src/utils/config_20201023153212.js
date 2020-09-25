const conf = {
  baseURL: 'https://www.99jiuye.cn/api'
}
let baseURL = 'https://www.99jiuye.cn/api'

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  // 开发环境
  conf.baseURL = 'http://localhost:8019/api'
  baseURL = 'http://localhost:8019/api'
} else if (process.env.NODE_ENV === 'production') {
  console.log('production')
  // 生产环境
  conf.baseURL = 'https://www.99jiuye.cn/api'
  baseURL = 'https://www.99jiuye.cn/api'
}
console.log('>>>>', conf.baseURL)
console.log('>>>', baseURL)
export default { conf, baseURL }
