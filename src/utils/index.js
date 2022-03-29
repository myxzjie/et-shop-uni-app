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

export const modelNavigateTo = (item) => {
  console.log('>>', item)
  debugger
  const val = item.url
  switch (val.___type) {
    case 'goods':
      uni.navigateTo({
        url: '/pages/product/goods?id=' + val.id + '&goodsId=' + val.goodsId
      })
      break
    case 'category':
      if (val.id) {
        uni.navigateTo({
          url: `/pages/navigation/search/searchPage?category=${val.id}`
        })
      } else {
        uni.navigateTo({
          url: `/pages/navigation/search/searchPage`
        })
      }
      break
    case 'stores':
      uni.navigateTo({
        url: `/pages/product/shopPage?id=${val.id}`
      })
      break
    // 活动
    case 'marketing':
      uni.navigateTo({
        url: '/pages/product/goods?id=' + val.skuId + 'goodsId=' + val.goodsId
      })
      break
    case 'pages':
      uni.navigateTo({
        url: val.___path + '?id=' + val.id + '&title=' + val.title
      })
      break
    case 'other':
      debugger
      switch (val.title) {
        case '首页':
          uni.switchTab({
            url: `/pages/tabbar/home/index`
          })
          break
        case '购物车':
          uni.switchTab({
            url: `/pages/tabbar/cart/cartList`
          })
          return
        case '个人中心':
          uni.switchTab({
            url: `/pages/tabbar/user/my`
          })
          break
        case '收藏商品':
          uni.navigateTo({
            url: `/pages/collection/index`
          })
          break
        case '我的订单':
          uni.navigateTo({
            url: `/pages/order/myOrder?status=0`
          })
          break
        case '领券中心':
          uni.navigateTo({
            url: `/pages/coupon/index`
          })
          break
        case '签到':
          uni.navigateTo({
            url: `/pages/clockin/index`
          })
          break
        case '秒杀频道':
          uni.navigateTo({
            url: `/pages/activity/seckill/index`
          })
          break
        case '拼团频道':
          uni.navigateTo({
            url: `/pages/activity/buy-group/index`
          })
          break
        case '小程序直播':
          uni.navigateTo({
            url: `/pages/promotion/lives`
          })
          break
        case '砍价':
          uni.navigateTo({
            url: `/pages/activity/bargain/index`
          })
          break
        case '积分商城':
          uni.navigateTo({
            url: `/pages/promotion/point/pointList`
          })
          break
        case '产品分类':
          uni.navigateTo({
            url: `/pages/tabbar/cate/index`
          })
          break
        case '资讯公告':
          uni.navigateTo({
            url: `/pages/tabbar/article/index`
          })
          break
        // case '优惠券':
        //   uni.navigateTo({
        //     url: `/pages/cate/index`
        //   })
        //   break
      }

      break
  }
}
