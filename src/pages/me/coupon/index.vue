<template>
  <view>
    <cu-custom bg-image="/static/sylb2244.jpeg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view v-if="couponsList.length > 0" class="coupon margin-top">
        <view
          v-for="(item, index) in couponsList"
          :key="index"
          class="item flex flex-wrap row-between margin-lr bg-white"
        >
          <view class="coupon-price flex flex-wrap align-center text-xxl" :class="[item._type === 0 ? 'coupon-gray' : '']">
            ￥ <text class="price">{{ item.couponPrice }}</text>
          </view>
          <view class="content padding-sm">
            <view class="condition ellipsis-line text-lg padding-xs">{{ item.couponTitle }}</view>
            <view class="data flex flex-wrap align-between padding-top-sm">
              <view v-if="item.endTime !== 0" class="padding-right">
                {{ item.addTime | dateFormat }} - {{ item.endTime | dateFormat }}
              </view>
              <view v-else>不限时</view>
              <view class="cu-btn round sm" :class="[item._type === 0 ? 'bg-gray': 'bg-green']">{{ item._msg }}</view>
            </view>
          </view>
        </view>
      </view>

      <view ref="container">
        <!--暂无优惠券-->
        <view
          v-if="couponsList.length === 0 && loading === true"
          class="noCommodity"
        >
          <view class="noPictrue">
            <img :src="images.noCoupon" class="image">
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import moment from 'moment'
import { getCouponsUser } from '@/api/user'

export default {
  components: {},
  filters: {
    dateFormat(value) {
      value = value * 1000
      return moment(value).format('YYYY/MM/DD')
    }
  },
  data() {
    return {
      couponsList: [],
      loading: false,
      images: {
        noCoupon: 'https://shop.cdn.dev56.com/assets/images/no-coupon.png'
      }
    }
  },
  onShow() {
    this.getUseCoupon()
  },
  methods: {
    getUseCoupon() {
      const that = this
      const type = 0
      getCouponsUser(type).then(res => {
        that.couponsList = res.data
        that.loading = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  .item {
    .coupon-price{
      background-image: url('/static/coupon-red.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 200upx;
      color: #fff;
      font-weight: bold;
      text-align: center;
      flex: 1;
      &.coupon-gray{
        background-image: url('/static/coupon-gray.png');
      }
    }
    .content {
      .condition {
        border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
