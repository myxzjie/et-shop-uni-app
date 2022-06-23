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

    <view class="cu-modal bottom-modal" :class="show ? 'show' : ''" @tap="hideModal">
    <view class="cu-dialog" @tap.stop="">
      <!-- <view class="cu-bar bg-white">
            <view class="action text-green"></view>
            <view class="action " @tap="hideModal">x</view>
            </view> -->
           
            <view class="padding">
              <u-form :model="form" :rules="rules" ref="uForm" :error-type="tips" label-position="left">
                <u-form-item :border-bottom="true" label="用户名" prop="username">
                  <u-input v-model="form.username" />
                </u-form-item>
                <u-form-item label="密码" prop="password">
                  <u-input v-model="form.password" type="password" :password-icon="false"/>
                </u-form-item>
                <u-form-item label-position="left" label-width="120rpx" label="确认密码" prop="password2">
                  <u-input v-model="form.password2" type="password" :password-icon="false"/>
                </u-form-item>
              </u-form>
              <u-button type="success" @click="onSubmit">提交</u-button>
            </view>
      <view class="cu-tabbar-height" />
    </view>
  </view>
  </view>
</template>

<script>
import { tokenKey, sceneKey, sessionCodeKey } from '@/utils/config'
import { mapState, mapMutations } from 'vuex'
import { wxappAuth, wxappPhone, registerVerify, wxappReg } from '@/api/public'
import { redirectTo, appLogin, userProfile } from '@/utils/auth'
export default {
  data() {
    return {
      BaseName: this.BaseName,
      show: false,
      register: false,
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
        userInfo: ''
      },
      code: '',
      form: {
        username: '',
        password: '',
        password2: ''
      },
      tips:['message','border-bottom'],
      rules: {
				username: [
					{ 
						required: true, 
						message: '请输入用户名', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					},
          {
            trigger: ['blur'],
            asyncValidator: (rule, value, callback) => {
              // this.$u.post('/xxx/xxx', {name: value}).then(res => {
              //   // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
              //   if(res.error) {
              //     callback(new Error('姓名重复'));
              //   } else {
                  // 如果校验通过，也要执行callback()回调
                  callback();
                // }
              // })
            }
          }
				],
        password: [
					{ 
						required: true, 
						message: '请输入确认密码', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					},
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
				],
        password2: [
					{ 
						required: true, 
						message: '请输入确认密码', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					},
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: ['blur'],
          },
				]
      }
    }
  },
  computed: {
    ...mapState(['hasLogin', 'sessionKey', 'openid'])
  },
  // onLoad(options) {},
  methods: {
    ...mapMutations(['login', 'setSessionKey', 'setOpenid']),
    getUserProfile(e) {
      const that = this
      // const app = getApp()
      // 获取存储值
      const params = uni.getStorageSync(sceneKey)
      console.log('>>login:', params)
      let spread = null
      if (params) {
        spread = params.spread
      }
      appLogin(spread).then(res => {
        debugger
        if (res.status === 200) {
          that.login('weixin')
          uni.setStorageSync(tokenKey, res.data.token)
          that.$store.dispatch('getUserInfo', true)
          redirectTo()
        } else if (res.status === 6000) {
          that.show = true
          return
        } else if (res.status === 6002) {
          that.register = true
          that.userInfo = { encryptedData, iv, userInfo }
          return
        }
      },
      err => {
        console.error(err)
        uni.showToast({
          title: '登录错误',
          icon: 'none',
          duration: 2000
        })
      })
    },
    getUserInfo(e) {
      const that = this
      // 数据
      const { encryptedData, iv, userInfo } = e.mp.detail
      debugger
      that.authLogin(encryptedData, iv, userInfo)
    },
    getPhoneNumber(e) {
      const that = this
      const { encryptedData, iv } = e.mp.detail
      wxappPhone({
        encryptedData: encryptedData,
        iv: iv,
        openid: that.openid,
        sessionKey: that.sessionKey,
        code: '1212'
      }).then(res => {
        that.phoneInfo = res.data
      }, err => { console.error(err) })
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
                } else if (res.status === 6002) {
                  that.register = true
                  that.userInfo = { encryptedData, iv, userInfo }
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
    onDialogClose(e) {
      this.show = false
      this.register = false
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
          return false;
				}
        const params = uni.getStorageSync(sceneKey)
        console.log('>>login:', params)
        let spread = null
        if (params) {
          spread = params.spread
        }
        let sessionCode = uni.getStorageSync(sessionCodeKey)
        userProfile().then(({ encryptedData, iv })=>{
          const data = that.form
          data.openid = sessionCode.openid
          data.sessionKey= sessionCode.session_key,
          data.unionId= sessionCode.unionId,
          data.spread= spread,
          data.encryptedData= encryptedData,
          data.iv= iv
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
			});
      
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
		this.$refs.uForm.setRules(this.rules);
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
</style>
