import { cancelOrder, takeOrder, delOrder, payOrder } from '@/api/order'
import dialog from '@/utils/dialog'
import { weappPay } from '@/libs/wechat'

export function cancelOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '确认取消该订单?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          cancelOrder(orderId)
            .then(res => {
              wx.showToast({
                title: '取消成功', icon: 'success', duration: 2000
              })
              resolve(res)
            })
            .catch(err => {
              wx.showToast({
                title: '取消失败', icon: 'none', duration: 2000
              })
              reject(err)
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  })
}

export function takeOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    takeOrder(orderId)
      .then(res => {
        wx.showToast({
          title: '收货成功', icon: 'success', duration: 2000
        })
        resolve(res)
      })
      .catch(err => {
        wx.showToast({
          title: '收货失败', icon: 'none', duration: 2000
        })
        reject(err)
      })
  })
}

export function delOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    dialog.confirm({
      mes: '确认删除该订单?',
      opts() {
        delOrder(orderId)
          .then(res => {
            wx.showToast({
              title: '删除成功', icon: 'success', duration: 2000
            })
            resolve(res)
          })
          .catch(err => {
            wx.showToast({
              title: '删除失败', icon: 'none', duration: 2000
            })
            reject(err)
          })
      }
    })
  })
}

export function payOrderHandle(orderId, type, from) {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中' })
    payOrder(orderId, type, from)
      .then(res => {
        const data = res.data
        wx.hideLoading()
        switch (data.status) {
          case 'WECHAT_H5_PAY':
            location.replace(data.result.jsConfig.mweb_url)
            reject(data)
            break
          case 'ORDER_EXIST':
          case 'EXTEND_ORDER':
          case 'PAY_ERROR':
          case 'PAY_DEFICIENCY':
            dialog.toast({ mes: res.msg })
            reject(data)
            break
          case 'SUCCESS':
            wx.showToast({ title: res.msg, icon: 'none', duration: 2000 })
            resolve(data)
            break
          case 'WECHAT_PAY':
            console.log(data.result.jsConfig)
            weappPay(data.result.jsConfig).then(res => {
              resolve(data)
            })
        }
      })
      .catch(err => {
        console.log(err)
        wx.hideLoading()
        dialog.toast({ mes: '订单支付失败' })
      })
  })
}
