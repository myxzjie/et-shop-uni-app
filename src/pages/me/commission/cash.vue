<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <scroll-view scroll-x class="bg-white nav margin-bottom">
      <view class="flex text-center">
        <block
          v-for="(item,index) in navList"
          :key="index"
        >
          <view
            class="cu-item flex-sub"
            :class="currentTab === index ? 'text-cyan ' : ''"
            @tap="swichNav(index, item)"
          >
            <text :class="item.icon" />
            {{ item.name }}
          </view>
        </block>
      </view>
    </scroll-view>
    <view class="margin-top">
      <view :hidden="currentTab !== 0">
        <form>
          <view class="cu-form-group">
            <view class="title">微信号</view>
            <input v-model="post.weixin" name="weixin" placeholder="请输入微信号">
          </view>

          <view class="cu-form-group">
            <view class="title">提现</view>
            <input v-model="post.money" name="money" :placeholder="'最低提现金额' + minPrice">
          </view>

        </form>
      </view>

      <view :hidden="currentTab !== 1">
        <form>
          <view class="cu-form-group margin-top">
            <view class="title">用户名</view>
            <input v-model="post.name" name="name" placeholder="请填写您的支付宝用户名">
          </view>
          <view class="cu-form-group">
            <view class="title">账号</view>
            <input v-model="post.alipayCode" name="alipayCode" placeholder="请填写您的支付宝账号">
          </view>
          <view class="cu-form-group">
            <view class="title">提现</view>
            <input
              v-model="post.money"
              name="money"
              :placeholder="'最低提现金额' + minPrice"
            >
          </view>

        </form>
      </view>
      <view class="tip padding-lr padding-top-xs">当前可提现金额: {{ commissionCount }}</view>

      <view class="cu-bar btn-group margin-top-sm">
        <button
          class="cu-btn block bg-gradual-green shadow-blur round lg"
          @tap="submitted"
        >
          提现
        </button>
      </view>
    </view>

  </view>
</template>
<script>
import { getBank, postCashInfo } from '@/api/user'
import { required } from '@/utils/validate'

export default {
  name: 'UserCash',
  components: {},
  props: {},
  data() {
    return {
      navList: [
        { name: '微信', type: 'weixin', icon: 'cuIcon-weixin' },
        { name: '支付宝', type: 'alipay', icon: 'icon-icon34' }
      ],
      post: {
        extract_type: 'weixin',
        alipayCode: '',
        money: '',
        name: '',
        bankname: '',
        cardnum: '',
        weixin: ''
      },
      currentTab: 0,
      minPrice: 0,
      banks: [],
      commissionCount: 0
    }
  },
  onLoad(option) {},
  onShow() {
    this.getBank()
  },
  methods: {
    swichNav(index, item) {
      this.currentTab = index
      this.post.extract_type = item.type
    },
    getBank() {
      const that = this
      getBank().then(
        (res) => {
          that.banks = res.data.extractBank
          that.minPrice = res.data.minPrice
          that.commissionCount = res.data.commissionCount
        },
        (err) => {
          uni.showToast({
            title: err.msg,
            icon: 'none',
            duration: 2000
          })
        }
      )
    },
    async submitted() {
      const bankname = this.post.bankname
      const alipayCode = this.post.alipayCode
      const money = this.post.money
      const name = this.post.name
      const cardnum = this.post.cardnum
      const weixin = this.post.weixin
      const that = this
      if (
        parseFloat(money) > parseFloat(that.commissionCount) ||
        parseFloat(that.commissionCount) == 0
      ) {
        uni.showToast({
          title: '余额不足',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (parseFloat(money) < parseFloat(that.minPrice)) {
        uni.showToast({
          title: '最低提现金额' + that.minPrice,
          icon: 'none',
          duration: 2000
        })
        return
      }
      switch (that.post.extract_type) {
        case 'alipay':
          try {
            await this.$validator({
              name: [required(required.message('支付宝用户名'))],
              alipayCode: [required(required.message('支付宝账号'))],
              money: [required(required.message('提现金额'))]
            }).validate({ name, alipayCode, money })
            const save = {
              extractType: that.post.extract_type,
              alipayCode: alipayCode,
              name: name,
              money: money
            }
            that.save(save)
          } catch ({ errors, fields }) {
            debugger
            uni.showToast({
              title: errors[0].message,
              icon: 'none',
              duration: 2000
            })
            return
          }
          break
        case 'weixin':
          try {
            await this.$validator({
              weixin: [required(required.message('提现微信号'))],
              money: [required(required.message('提现金额'))]
            }).validate({ weixin, money })
            const save = {
              extractType: that.post.extract_type,
              weixin: weixin,
              money: money
            }
            that.save(save)
          } catch (e) {
            uni.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000
            })
            return
          }
          break
      }
    },
    save(info) {
      postCashInfo(info).then(
        res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          uni.navigateTo({
            url: '/pages/me/commission/index'
          })
        },
        error => {
          this.$dialog.message(error.msg)
        }
      )
    }
  }
}
</script>
