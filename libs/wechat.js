// 支付模块
export const weappPay = (option) => {
  return new Promise((resolve, reject) => {
    // 吊起微信支付
    wx.requestPayment({
      ...option,
      timeStamp: option.timeStamp + '',
      success: (success) => {
        wx.showToast({
          title: '支付成功', icon: 'success', duration: 2000
        })
        resolve(success)
      },
      fail: (error) => {
        wx.showToast({ title: '支付失败', icon: 'none', duration: 2000 })
        reject(error)
      }
    })
  })
}
