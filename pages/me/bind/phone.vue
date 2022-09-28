<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input v-model="phone" type="number" placeholder="填写手机号码"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">验证码</view>
        <input v-model="captcha" type="text" placeholder="填写验证码"></input>
        <button
          class="cu-btn shadow"
          :disabled="disabled"
          :class="disabled === true ? 'bg-gray' : 'bg-green'"
          @tap="onCode"
        >{{ text }}</button>
      </view>

      <view class="cu-bar btn-group margin-top">
        <button class="cu-btn bg-green shadow-blur round lg" @tap="confirm">
          确认绑定
        </button>
      </view>
    </view>
    <!-- <view class="ChangePassword">
      <view class="list">
        <view class="item">
          <input v-model="phone" type="number" placeholder="填写手机号码">
        </view>
        <view class="item acea-row row-between-wrapper">
          <input v-model="captcha" type="text" placeholder="填写验证码" class="codeIput">
          <button
            class="code font-color-red"
            :disabled="disabled"
            :class="disabled === true ? 'on' : ''"
            @click="code"
          >{{ text }}</button>
        </view>
      </view>
      <view class="confirmBnt bg-color-red" @click="confirm">确认绑定</view>
    </view> -->
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/index'
import { required, alpha_num, chs_phone } from '@/utils/validate'
import { registerVerify, bindingPhone } from '@/api/user'

export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      captcha: '',
      phone: '' // 手机号
    }
  },
  // computed: mapGetters(['userInfo']),
  mounted() {},
  methods: {
    async confirm() {
      const that = this
      const { phone, captcha } = that
      try {
        await that
          .$validator({
            phone: [
              chs_phone(chs_phone.message('手机号码')),
              alpha_num(alpha_num.message())
            ],
            captcha: [
              required(required.message('验证码')),
              alpha_num(alpha_num.message('验证码'))
            ]
          })
          .validate({ phone, captcha })
      } catch (e) {
        uni.showToast({
          title: e.errors[0].message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      bindingPhone({
        phone: this.phone,
        captcha: this.captcha
      })
        .then(res => {
          if (res.data !== undefined && res.data.is_bind) {
            that.$dialog.confirm({
              mes: res.msg,
              opts: [
                {
                  txt: '确认绑定',
                  color: false,
                  callback: () => {
                    bindingPhone({
                      phone: this.phone,
                      captcha: this.captcha,
                      step: 1
                    })
                      .then(res => {
                        uni.showToast({
                          title: res.msg,
                          icon: 'none',
                          duration: 2000
                        })
                        that.$router.replace({
                          path: '/pages/user/PersonalData/main'
                        })
                      })
                      .catch(res => {
                        uni.showToast({
                          title: res.msg,
                          icon: 'none',
                          duration: 2000
                        })
                        that.$router.replace({
                          path: '/pages/user/PersonalData/main'
                        })
                      })
                  }
                },
                {
                  txt: '取消',
                  color: false,
                  callback: () => {
                    uni.showToast({
                      title: '已取消绑定',
                      icon: 'none',
                      duration: 2000
                    })
                    that.$router.replace({ path: '/pages/user/PersonalData/main' })
                  }
                }
              ]
            })
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
            that.$router.replace({ path: '/pages/user/PersonalData/main' })
          }
        })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    async onCode() {
      const that = this
      const { phone } = that
      try {
        await that
          .$validator({
            phone: [
              required(required.message('手机号码')),
              chs_phone(chs_phone.message())
            ]
          })
          .validate({ phone })
      } catch (e) {
        uni.showToast({
          title: e.errors[0].message,
          icon: 'none',
          duration: 2000
        })
        return
      }

      registerVerify({ phone: phone }).then(res => {
        debugger
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        that.sendCode()
      }).catch(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
}
</script>
