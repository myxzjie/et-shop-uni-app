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
