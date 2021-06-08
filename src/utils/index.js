import stringify from '@/utils/querystring'

export function trim(value) {
  return String.prototype.trim.call(value)
}

export function parseRoute(location) {
  if (typeof location === 'string') return location

  const { path, params } = location
  const query = stringify(params)

  if (!query) return path

  return `${path}?${query}`
}

export function redirect(params) {
  const redirect = params.redirect
  delete params.redirect
  const query = stringify(params)
  return `${redirect}?${query}`
}

export function currentPage(params = {}) {
  const pages = getCurrentPages() // 获取加载的页面
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const options = currentPage.options // 如果要获取url中所带的参数可以查看options
  params = Object.assign(params, options)
  const url = `/${currentPage.route}?${stringify(params)}`
  return url
}
