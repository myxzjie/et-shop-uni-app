<template>
  <view class="container">
    <view v-if="!hasLogin">
      <view class="getUserInfo">
        <text />
        <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权登录</button>
        <view class="sp-cell" />
        <button type="default" @click="back">取消授权登录</button>
      </view>
    </view>

    <van-dialog
      use-slot
      title="获取微信手机号"
      :show="show"
      async-close
      show-cancel-button
      z-index="50"
      confirm-button-open-type="getPhoneNumber"
      @close="onDialogClose"
      @getphonenumber="getPhoneNumber"
    />

    <van-dialog
      use-slot
      title="请点击注册"
      :show="register"
      async-close
      show-cancel-button
      z-index="50"
      @confirm="onSubmitRegister"
      @close="onDialogClose"
    >
      <view class="uni-input-group">
        <view class="uni-input-row">
          <view class="uni-label">
            <view class="lt-color">手机号</view>
          </view>
          <input v-model="phoneInfo.phoneNumber" type="text" placeholder="手机号">
          <view class="uni-label">
            <button class="btn-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取微信手机</button>
            <!-- <view v-else id='msg-type' >{{CountdownBt}}秒</view> -->
          </view>
        </view>

        <view class="uni-input-row">
          <view class="uni-label">
            <view class="lt-color">验证码</view>
          </view>
          <input v-model="code" type="text" placeholder="手机验证码">
          <view class="uni-label">
            <view v-if="isCountdown" @tap="sendMessge">获取验证码</view>
            <view v-else>{{ countdown }}秒</view>
          </view>
        </view>
      </view>
    </van-dialog>
  </view>
</template>

<script>
import { tokenKey } from '@/utils/config'
import { mapState, mapMutations } from 'vuex'
import { wxappSessionCode, wxappAuth, wxappPhone, registerVerify, register } from '@/api/public'
export default {
  data() {
    return {
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
      code: ''
    }
  },
  computed: {
    ...mapState(['hasLogin', 'sessionKey', 'openid'])
  },
  onLoad(options) {
    const that = this

    // 调用 微信 login 获取 code
    uni.login({
      success: (res) => {
        console.log(res)
        wxappSessionCode({ code: res.code }).then(({ data }) => {
          this.setSessionKey(data.session_key)
          this.setOpenid(data.openid)
        }, err => {
          console.error(err)
        })
        // uni.request({
        //   url: '', // _self.apiServer+'member&m=codeToSession&code='+res.code,
        //   success: (sessions) => {
        //     console.log(sessions)
        //     // session_key = sessions.data.session_key;
        //   }
        // })
        // 获取用户信息
        // uni.getUserInfo({
        //   provider: 'weixin',
        //   success: function(infoRes) {
        //     console.log('用户昵称为：' + infoRes.userInfo.nickName)
        //     uni.setStorageSync('userToken', '')
        //     that.login(loginRes.body.data) // 将用户信息保存起来
        //   }
        // })
      }
    })
  },
  methods: {
    ...mapMutations(['login', 'setSessionKey', 'setOpenid']),
    getUserInfo(e) {
      const that = this
      // 数据
      const { encryptedData, iv, userInfo } = e.mp.detail
      that.authLogin(encryptedData, iv, userInfo)
    },
    getPhoneNumber(e) {
      const that = this
      const { encryptedData, iv, userInfo } = e.mp.detail
      wxappPhone({
        encryptedData: encryptedData,
        iv: iv,
        openid: that.openid,
        sessionKey: that.sessionKey,
        code: '1212'
      }).then(res => {
        that.phoneInfo = res.data
      }, err => {})
    },
    authLogin(encryptedData, iv, userInfo) {
      const that = this
      wxappAuth({
        encryptedData: encryptedData,
        iv: iv,
        code: '1232',
        spread: null,
        userData: null,
        phoneData: null,
        sessionKey: that.sessionKey,
        openid: that.openid
      }).then(res => {
        if (res.status === 200) {
          that.login('weixin')
          uni.setStorageSync(tokenKey, res.data.token)
          uni.navigateBack({})
        } else if (res.status === 6000) {
          that.show = true
          return
        } else if (res.status == 6002) {
          that.register = true
          that.userInfo = { encryptedData, iv, userInfo }
          return
        }
      }, err => {
        debugger
      })
    },
    onDialogClose(e) {
      this.show = false
      this.register = false
    },
    onSubmitRegister(e) {
      const that = this
      const { encryptedData, iv, userInfo } = that.userInfo
      register({
        encryptedData: encryptedData,
        iv: iv,
        openid: that.openid,
        sessionKey: that.sessionKey,
        code: that.code,
        phoneNumber: that.phoneInfo.phoneNumber,
        purePhoneNumber: that.phoneInfo.purePhoneNumber,
        countryCode: that.phoneInfo.countryCode
      }).then(res => {
        if (res.status === 200) {
          that.authLogin(encryptedData, iv, userInfo)
        } else {
          uni.showModal({
            showCancel: false,
            title: '失败提示',
            content: res.msg
          })
        }
      },
      err => {})
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
      }, err => {})
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
  }
}
</script>

<style lang="scss" scoped>
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

  .tab-bar-pic-active {
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

._van-dialog {
  z-index: 99999999999;
}

/* input group */
.uni-input-group {
	position: relative;
	padding: 0;
	border: 0;
	background-color: #fff;
}

.uni-input-group:before {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-group:after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-row {
	position: relative;
	display: flex;
	flex-direction: row;
	font-size:28upx;
	padding: 22upx 30upx;
	justify-content: space-between;
}

.uni-input-group .uni-input-row:after {
	position: absolute;
	right: 0upx;
	bottom: 0;
	left: 20upx;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-row label {
	line-height: 70upx;
}

.uni-label {
	width: 210upx;
	word-wrap: break-word;
	word-break: break-all;
	text-indent:20upx;
}
.uni-input {
	height: 50upx;
	padding: 15upx 25upx;
	line-height:50upx;
	font-size:28upx;
	background:#FFF;
	flex: 1;
}
.btn-phone{
  font-size:28upx;
  background-color: transparent;
  padding-left: 0upx;
  padding-right: 0upx;
  text-align: left;
}

.btn-phone:after{
 border: 0upx solid transparent;
}

</style>
