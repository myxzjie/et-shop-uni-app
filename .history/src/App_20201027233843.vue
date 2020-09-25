<script>
import auth from '@/utils/auth'
export default {
  globalData: {
    isConnected: true
  },
  onLaunch() {
    console.log('App Launch')
    const that = this

    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO	|| MP-QQ
    // 检测新版本
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate);
    })
    updateManager.onUpdateReady(res => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(res => {
      // 新的版本下载失败
      uni.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
        showCancel: false
      })
    })
    // #endif

    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    uni.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          uni.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })

    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    uni.onNetworkStatusChange(res => {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        uni.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        that.globalData.isConnected = true
        uni.hideToast()
      }
    })
  },
  onShow() {
    console.log('App Show')
        auth.openLoginDialog()
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style lang='scss'>
    @import "./static/css/base.css";
</style>
<style lang='scss'>
    @import "./static/css/reset.css";
</style>
<style lang='scss'>
    @import "./static/css/style.css";
</style>

<style lang="scss" scoped>

    /*每个页面公共css */

    /*
    [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
        flex-direction: unset;
    }
    [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
        flex-direction: unset;
    }
    .uni-tabbar {
        position: fixed;
        bottom: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 98upx;
        padding: 16upx 0;
        box-sizing: border-box;
        border-top: solid 1upx #ccc;
        background-color: #fff;
        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
        .uni-tabbar__item {
            display: block;
            line-height: 24upx;
            font-size: 20upx;
            text-align: center;
        }
        .uni-tabbar__icon {
            height: 42upx;
            line-height: 42upx;
            text-align: center;
        }
        .icon {
            display: inline-block;
        }
        .uni-tabbar__label {
            line-height: 24upx;
            font-size: 24upx;
            color: #999;
            &.active {
                color: #1ca6ec;
            }
        }
    }
    */
</style>
