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

    

    <!-- <view class="cu-modal bottom-modal" :class="show ? 'show' : ''" @tap="hideModal">
      <view class="cu-dialog" @tap.stop="">
        <view v-show="binder" class="padding">
          <u-form ref="uForm" :model="form" :rules="rules" :error-type="tooltip" label-position="left">
            <u-form-item :border-bottom="true" label="用户名" prop="username">
              <u-input v-model="form.username" />
            </u-form-item>
            <u-form-item label="密码" prop="password">
              <u-input v-model="form.password" type="password" :password-icon="false" />
            </u-form-item>
            <u-form-item label-position="left" label-width="120rpx" label="确认密码" prop="password2">
              <u-input v-model="form.password2" type="password" :password-icon="false" />
            </u-form-item>
          </u-form>
          <u-button type="success" @click="onSubmit">提交</u-button>
          <view>
            <text class="binder text-blue text-right" @click="onBinder(false)">已有账号绑定</text>
          </view>
        </view>

        <view v-show="binder === false" class="padding">
          <u-form ref="codeForm" :model="codeForm" :rules="codeRules" :error-type="tooltip" label-position="left">
            <u-form-item :border-bottom="true" label="用户名" prop="phone">
              <u-input v-model="codeForm.phone" />
            </u-form-item>
            <u-form-item class="cell code" label-width="120" prop="code" label="验证码">
              <div style="display:flex; width:100%;">
                <u-input v-model="codeForm.code" maxlength="6" placeholder="请输入验证码" />
                <u-verification-code
                  ref="uCode"
                  class="verification-code"
                  keep-running
                  unique-key="page-login"
                  :seconds="seconds"
                  @end="end"
                  @start="start"
                  @change="codeChange"
                />
                <view class="text-tips" @tap="getCode">{{ tips }}</view>

              </div>
            </u-form-item>
          </u-form>
          <u-button type="success" @click="onBinderUser">提交</u-button>
          <view>
            <text class="binder text-blue text-right" @click="onBinder(true)">注册账号</text></text></text>
          </view>
        </view>
        <view class="cu-tabbar-height" />
      </view>
    </view> -->
  </view>
</template>

<script>
import storage from '@/utils/storage'
import { tokenKey, sceneKey, sessionCodeKey } from '@/utils/config'
import { mapState, mapMutations } from 'vuex'
import { wxappSessionCode ,wxappAuth,  wxappReg, wxappLogin } from '@/api/public'
import { redirectTo, appLogin, userProfile } from '@/utils/auth'
export default {
  data() {
    return {
      BaseName: this.BaseName,
      show: false,
      code: '',
      
      phonePopup: false,
      binder: true,
      phoneInfo: {
        phoneNumber: '',
        purePhoneNumber: '',
        countryCode: ''
      },
      isCountdown: true,
      countdown: 60,
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
    let that = this;
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
      
    },
    authLogin(encryptedData, iv, userInfo) {
      const that = this
      wx.login({
        success: res => {
          wx.getUserInfo({
            success: user => {
              wxappAuth({
                code: res.code,
                userData: user,
                spread: null
              }).then(res => {
                if (res.status === 200) {
                  that.login('weixin')
                  uni.setStorageSync(tokenKey, res.data.token)
                  redirectTo()
                } else if (res.status === 6000) {
                  that.show = true
                  return
                } else if (res.status === 6001) {
                  that.show = true
                  that.binder = true
                  // that.userInfo = { encryptedData, iv, userInfo }
                  return
                }
              }, err => {
                console.error(err)
              })
            }
          })
        }
      })
    },
    onBinder(binder) {
      this.binder = binder
    },
    codeChange(text) {
      this.tips = text
    },
    getCode() {
      const that = this
      if (that.tips == '重新获取') {
        // this.codeFlag = true

        uni.showLoading({
          title: '加载中'
        })
        setTimeout(() => {
          // that.$refs.verification.hide()
          uni.hideLoading()
        }, 2000)
      }

      if (!this.$u.test.mobile(that.codeForm.phone)) {
        uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })

        return false
      }
      // if (!this.flage) {
      //   this.$refs.verification.error()
      //   return false
      // }
      if (this.$refs.uCode.canGetCode) {
        // 向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        registerVerify({ phone: that.codeForm.phone, type: 'binder' }).then(res => {
          uni.hideLoading()
          debugger
          if (res.status === 200) {
            that.$refs.uCode.start()
          } else {
            uni.showModal({
              showCancel: false,
              title: '提示',
              content: res.data
            })
          }
        }, err => { console.error(err) })

        // const res = sendMobile(this.codeForm.mobile)

        // 这里此提示会被this.start()方法中的提示覆盖
        // if (res.data.success) {
        //   this.$refs.uCode.start()
        // } else {
        //   uni.showToast({
        //     title: res.data.message,
        //     duration: 2000,
        //     icon: 'none'
        //   })
        //   this.flage = false
        // }
      } else {
        this.$u.toast('请倒计时结束后再发送')
      }
    },
    start() {},
    end() {},
    onBinderUser() {
      const that = this
      this.$refs.codeForm.validate(valid => {
        if (!valid) {
          uni.showToast({
            title: '输入有误，请核实您的信息',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        const sessionCode = storage.getSessionCode()
        const data = that.codeForm
        data.openid = sessionCode.openid
        binderUser(data).then(res => {
          that.show = false
          sessionCode.hasReg = true
          uni.setStorageSync(sessionCodeKey, sessionCode)
          that.login('weixin')
          uni.setStorageSync(tokenKey, res.data.token)
          that.$store.dispatch('getUserInfo', true)
          redirectTo()
        }, err => {
          uni.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000
          })
        })
      })
    },
    onSubmit(e) {
      const that = this
      this.$refs.uForm.validate(valid => {
        if (!valid) {
          uni.showToast({
            title: '输入有误，请核实您的信息',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        const params = uni.getStorageSync(sceneKey)
        console.log('>>login:', params)
        let spread = null
        if (params) {
          spread = params.spread
        }
        const sessionCode = uni.getStorageSync(sessionCodeKey)
        userProfile().then(({ encryptedData, iv }) => {
          const data = that.form
          data.openid = sessionCode.openid
          data.sessionKey = sessionCode.session_key,
          data.unionId = sessionCode.unionId,
          data.spread = spread,
          data.encryptedData = encryptedData,
          data.iv = iv
          wxappReg(data).then((res) => {
            that.show = false
            sessionCode.hasReg = true
            uni.setStorageSync(sessionCodeKey, sessionCode)
            that.login('weixin')
            uni.setStorageSync(tokenKey, res.data.token)
            that.$store.dispatch('getUserInfo', true)
            redirectTo()
          })
        })
      })
    },
    sendMessge() {
      const that = this
      if (that.phoneInfo.phoneNumber === '') {
        uni.showModal({
          showCancel: false,
          title: '失败提示',
          content: '请输入手机号'
        })
        return
      }
      registerVerify({ phone: that.phoneInfo.phoneNumber, type: 'register' }).then(res => {
        if (res.status === 200) {
          that.setCountdown(90)
        } else {
          uni.showModal({
            showCancel: false,
            title: '失败提示',
            content: res.msg
          })
        }
      }, err => { console.error(err) })
    },
    setCountdown(num = 60) {
      const that = this
      that.isCountdown = false
      that.countdown = num
      that.timer = setInterval(() => {
        that.countdown--
        if (that.countdown === 0) {
          that.isCountdown = true
          clearInterval(that.timer)
        }
      }, 1000)
    }
  },
  onReady() {
    // this.$refs.uForm.setRules(this.rules)
    // this.$refs.codeForm.setRules(this.codeRules)
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
