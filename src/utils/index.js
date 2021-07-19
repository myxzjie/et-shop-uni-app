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

export function parseQuery() {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  // var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options
  return options
}

export function handleQrCode() {
  var urlSpread = parseQuery()['q']
  if (urlSpread) {
    // 通过海报二维码进来
    urlSpread = urlSpread
      .split('%3F')[1]
      .replace(/%3D/g, ':')
      .replace(/%26/g, ',')
      .split(',')
      .map((item, index) => {
        item = item.split(':')
        return `"${item[0]}":"${item[1]}"`
      })
      .join(',')
    urlSpread = JSON.parse('{' + urlSpread + '}')
    return urlSpread
  }
  return null
}
