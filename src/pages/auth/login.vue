<template>
  <view class="container">

    <view class="ucenter-bg">
      <image src="@/static/logo.png" class="png" mode="widthFix" />
      <view class="text-xl">
        {{ BaseName }}
        <text class="text-df">2.0</text>
      </view>
      <view class="margin-top-sm" />
    </view>
    <view class="padding-xl">
      <button
        class="cu-btn bg-green shadow lg block"
        @tap="getUserProfile"
      >授权登录</button>
    </view>

    <u-modal v-model="phonePopup" :mask-close-able="true" :title="BaseName+'商城'" :show-confirm-button="false">
      <view class="popup-warp">
      <view class="tips">
        为了更好地用户体验，需要您授权手机号
      </view>
      <button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        去授权
      </button>
    </view>
    </u-modal>
  </view>
</template>

<script>
import storage from '@/utils/storage'
import { sceneKey, } from '@/utils/config'
import { mapState, mapMutations } from 'vuex'
import { wxappSessionCode, wxappReg, wxappLogin } from '@/api/public'
import { redirectTo, userProfile } from '@/utils/auth'
export default {
  data() {
    return {
      BaseName: this.BaseName,
      code: '',
      phonePopup: false,
      userInfo: {
        encryptedData: '',
        iv: '',
        userInfo: '',
        phoneCode: '',
        openid:'',
        sessionKey:''
      }
      
    }
  },
  computed: {
    ...mapState(['hasLogin', 'sessionKey', 'openid'])
  },
  onLoad(options) {
    let that = this
    //获取code
    uni.login({
      success: (res) => {
        that.code = res.code
      },
    });
  },
  methods: {
    ...mapMutations(['login', 'setSessionKey', 'setOpenid']),
    async getUserProfile(e) {
      const that = this
      // const app = getApp()
      // 获取存储值
      const params = uni.getStorageSync(sceneKey)
      console.log('>>login:', params)
      let spread = null
      if (params) {
        spread = params.spread
      }
      
      let sessionCode = storage.getSessionCode()
      if (!sessionCode || sessionCode === '') {
        sessionCode = await that.authSession()
      }
      that.userInfo.openid = sessionCode.openid
      that.userInfo.sessionKey = sessionCode.session_key
      if (sessionCode.hasReg) {
         wxappLogin({ openid: sessionCode.openid }).then(res =>{
          if (res.status === 200) {
          that.login('weixin')
          storage.setAccessToken(res.data.accessToken);
          storage.setRefreshToken(res.data.refreshToken);
          // uni.setStorageSync(tokenKey, res.data.token)
          that.$store.dispatch('getUserInfo', true)
          redirectTo()
          } else{
            uni.showToast({
              title: '登录错误',
              icon: 'none',
              duration: 2000
            })
          }
         },err => {
        console.error(err)
        uni.showToast({
          title: '登录错误',
          icon: 'none',
          duration: 2000
        })
      })
      } else {
        const {encryptedData,iv} = await userProfile()
        that.userInfo.encryptedData = encryptedData
        that.userInfo.iv = iv
        that.phonePopup = true
      }
      
    },
    async authSession() {
      const that = this
      debugger
      return wxappSessionCode({ code: that.code }).then(({ data }) => {
        storage.setSessionCode(data)
        return data
      })
    },
    getPhoneNumber(e) {
      const that = this
      that.userInfo.phoneCode = e.mp.detail.code
      wxappReg(that.userInfo).then((res) => {
        storage.removeSessionCode()
        if (res.status === 200) {
          that.login('weixin')
          storage.setAccessToken(res.data.accessToken)
          storage.setRefreshToken(res.data.refreshToken)
          that.$store.dispatch('getUserInfo', true)
          redirectTo()
        } else {
          uni.showToast({
          title: '登录错误',
          icon: 'none',
          duration: 2000
        })
        }
      })
      
    }
  },
  onReady() {
  }
}
</script>

<style lang="scss" scoped>
.ucenter-bg {
    position: relative;
    display: flex;
    height: 700rpx;
    overflow: hidden;
    font-weight: 300;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    background-image: url(https://shop.cdn.dev56.com/assets/images/bg.jpg);
    background-size: cover;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .ubenter-bg::after {
    position: absolute;
    right: 0;
    bottom: -60vw;
    left: 0;
    width: 100vw;
    height: 50vw;
    margin: auto;
    background-color: #f1f1f1;
    content: '';
    transform: rotate(-10deg) scale(2, 2);
  }

  .ucenter-bg text {
    opacity: 0.8;
  }

  .ucenter-bg image {
    width: 250rpx;
    height: 250rpx;
  }

.sp-cell {
  height: 20rpx;
}
.getUserInfo {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  p {
    margin-bottom: 20px;
  }
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.tab-bar {
  font-size: 0;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  border-top: 1px solid rgba(248, 248, 248, 1);

  .tab-bar-item {
    flex: 1;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.active {
      text {
        color: #ee7559;
      }

      .tab-bar-pic {
        display: none;
        background: #f9f9f9;

        &.active {
          display: block;
        }
      }
    }

    .tab-bar-pic {
      display: block;
      background: #f9f9f9;

      &.active {
        display: none;
      }
    }
  }

  .tab-bar-pic {
    width: 25px;
    height: 25px;
    background: #f9f9f9;

    image {
      width: 25px;
      height: 25px;
    }
  }

  text {
    font-size: 10px;
    color: rgb(160, 160, 160);
    line-height: 10px;
    margin-top: 5px;
  }
}

.tab-bar-bg {
  padding-top: 46px;
  width: 100%;
}

.view-item {
  display: none;
  width: 100%;
}

.view-item-active {
  display: block;
}

.getUserInfo {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  p {
    margin-bottom: 20px;
  }
}

::v-deep .u-form-item__message{
  text-align: right;
}
.binder {
  margin-top:10upx;
  float: right;
}
.verification-code,
.text-tips {
  width: 200upx;
}

.popup-warp{
  padding: 20rpx;
  .tips {
    margin: 20rpx 48rpx;
  }
}
// .tips {
//   width: 80%;
//   text-align: left;
//   margin: 6% 10%;
//   margin-top: 48rpx;
//   line-height: 1.75;
// }

.register {
  // color: $weChat-color !important;
  // border: none !important;
  // background: #fff !important;
}
</style>
