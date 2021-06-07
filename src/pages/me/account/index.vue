<template>
  <view>
    <cu-custom :is-back="true">
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="my-account">
        <view class="wrapper bg-white">
          <view class="bg-cyan padding-sm">
            <view class="">
              <view class="flex flex-wrap row-top row-between">
                <view class="assets">
                  <view>总资产(元)</view>
                  <view class="padding-top-xs">{{ now_money }}</view>
                </view>
              </view>
              <view class="flex flex-wrap row-top padding-top-sm">
                <view class="assets">
                  <view>累计消费(元)</view>
                  <view class="padding-top-xs">{{ orderStatusSum }}</view>
                </view>
              </view>
            </view>
          </view>
          <view class="nav acea-row row-middle">
            <view class="item" @click="$router.push({path:'/pages/user/UserBill/main',query:{id:0}})">
              <view class="pictrue">
                <img :src="'https://shop.cdn.dev56.com/assets/images/record1.png'">
              </view>
              <view>账单记录</view>
            </view>
            <view class="item" @click="$router.push({path:'/pages/user/UserBill/main',query:{id:1}})">
              <view class="pictrue">
                <img :src="'https://shop.cdn.dev56.com/assets/images/record2.png'">
              </view>
              <view>消费记录</view>
            </view>
          </view>
          <view class="advert acea-row row-between-wrapper" />
        </view>
        <Recommend />
      </view>
    </scroll-view>
  </view>
</template>
<script>
// import Recommend from '@/components/Recommend'
import { getActivityStatus, getBalance } from '@/api/user'
export default {
  components: {
    // Recommend
  },
  props: {},
  data: function() {
    return {
      now_money: 0,
      orderStatusSum: 0,
      recharge: 0,
      activity: {
        is_bargin: false,
        is_pink: false,
        is_seckill: false
      }
    }
  },
  onShow() {
    this.loadBalance()
    this.getActivity()
  },
  methods: {
    loadBalance() {
      const that = this
      getBalance().then(
        res => {
          that.now_money = res.data.now_money
          that.orderStatusSum = res.data.orderStatusSum
          that.recharge = res.data.recharge
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    },
    getActivity() {
      const that = this
      getActivityStatus().then(
        res => {
          that.activity.is_bargin = res.data.is_bargin
          that.activity.is_pink = res.data.is_pink
          that.activity.is_seckill = res.data.is_seckill
        },
        error => {
          that.$dialog.message(error.msg)
        }
      )
    }
  }
}
</script>
