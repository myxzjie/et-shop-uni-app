<script>
import { checkSession } from '@/utils/auth'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  globalData: {
    isConnected: true,
    options: {}
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  onLaunch(options) {
    console.log('App Launch', options.query)
    const that = this
    uni.getSystemInfo({
      success: (e) => {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform === 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45
        }
        // #endif
        // #ifdef MP-WEIXIN || MP-QQ
        Vue.prototype.StatusBar = e.statusBarHeight
        const custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
        // #endif
        Vue.prototype.BaseName = '好酒仓库'
      }
    })

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

    checkSession()
  },
  onShow() {
    console.log('App Show')
    // const that = this
    // 判断手机号
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/base.css";
  @import '@/assets/css/icon.scss';
</style>
<style lang='scss'>
  @import "@/assets/css/reset.css";
</style>
<style lang='scss'>
  @import "@/assets/css/style.css";
</style>
<style>
  @import '@/assets/iconfont/iconfont.wxss';
</style>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<style>
  @import 'colorui/main.css';
  @import 'colorui/icon.css';

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

  /* #ifdef MP-WEIXIN */
  page {
    height: 100%;
  }
  /* #endif */
  /* 2021-03-10 */
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 40upx 0;
    justify-content: space-between;
  }

  .nav-li {
    position: relative;
    z-index: 1;
    width: 45%;
    padding: 30upx;
    margin: 0 2.5% 40upx;
    background: #fff;
    background-position: center;
    background-size: cover;
    border-radius: 12upx;
  }

  .nav-li::after {
    position: absolute;
    bottom: -10%;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: 10upx;
    content: '';
    opacity: 0.2;
    transform: scale(0.9, 0.9);
  }

  .nav-li.cur {
    color: #fff;
    background: rgb(94, 185, 94);
    box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
  }

  .nav-title {
    font-size: 32upx;
    font-weight: 300;
  }

  .nav-title::first-letter {
    margin-right: 4upx;
    font-size: 40upx;
  }

  .nav-name {
    position: relative;
    margin-top: 20upx;
    font-size: 28upx;
    text-transform: capitalize;
  }

  .nav-name::before {
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    width: 40upx;
    height: 6upx;
    background: #fff;
    content: '';
    opacity: 0.5;
  }

  .nav-name::after {
    position: absolute;
    right: 40upx;
    bottom: 0;
    display: block;
    width: 100upx;
    height: 1px;
    background: #fff;
    content: '';
    opacity: 0.3;
  }

  .nav-name::first-letter {
    margin-right: 1px;
    font-size: 36upx;
    font-weight: bold;
  }

  .nav-li text {
    position: absolute;
    top: 30upx;
    right: 30upx;
    width: 60upx;
    height: 60upx;
    font-size: 52upx;
    line-height: 60upx;
    text-align: center;
  }

  .text-light {
    font-weight: 300;
  }

  @keyframes show {
    0% {
      transform: translateY(-50px);
    }

    60% {
      transform: translateY(40upx);
    }

    100% {
      transform: translateY(0);
    }
  }

  @-webkit-keyframes show {
    0% {
      transform: translateY(-50px);
    }

    60% {
      transform: translateY(40upx);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
