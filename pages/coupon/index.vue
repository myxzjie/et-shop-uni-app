<template>
  <view>
    <cu-custom
      :is-back="true"
      bg-color="bg-gradual-olive"
    >
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <view v-if="couponsList.length > 0" class="coupon margin-top">
      <view
        v-for="(item, index) in couponsList"
        :key="index"
        class="item flex flex-wrap row-between margin-lr bg-white"
      >
        <view class="coupon-price flex flex-wrap align-center text-xxl" :class="item.isUse ? 'coupon-gray' : ''">
          ￥ <text class="price">{{ item.couponPrice }}</text>
        </view>
        <view class="content padding-xs">
          <view class="condition ellipsis-line text-lg padding-xs">购物满{{ item.useMinPrice }}元可用</view>
          <view class="data flex flex-wrap align-between padding-top-sm">
            <view v-if="item.endTime !== 0" class="padding-right text-gray">
              <!-- <data-format-t :data="item.startTime" />-
              <data-format-t :data="item.endTime" /> -->
              {{ item.startTime| dateFormat }} - {{ item.endTime | dateFormat }}
            </view>
            <view v-else>不限时</view>
            <view v-if="item.isUse === true" class="cu-btn round bg-gray sm">已领取</view>
            <view v-else-if="item.isUse === 2" class="cu-btn round bg-gray sm">已领完</view>
            <view v-else class="cu-btn round bg-green sm" @click="getCoupon(item.id, index)">立即领取</view>
          </view>
        </view>
      </view>
    </view>

    <loading :loaded="loadend" :loading="loading" />
    <!--暂无优惠券-->
    <view v-if="couponsList.length === 0 && page > 1" class="margin bg-white">
      <view class="noPictrue margin padding">
        <image mode="widthFix" :src="images.noCoupon" class="image" />
      </view>
      <product-recommend />
    </view>
  </view>
</template>
<script>
import { getCoupon, getCouponReceive } from '@/api/user'
import Loading from '@/components/loading'
import ProductRecommend from '@/components/product/product-recommend'
import moment from 'moment'
export default {
  name: 'GetCoupon',
  components: {
    Loading,
    ProductRecommend
  },
  filters: {
    dateFormat(value) {
      value = +value * 1000
      return moment(value).format('YYYY/MM/DD')
      // const d = new Date(value)
      // return (
      //   d.getFullYear() +
      //   '/' +
      //   (d.getMonth() + parseInt(1)) +
      //   '/' +
      //   d.getDate()
      // )
    }
  },
  data() {
    return {
      page: 1,
      limit: 10,
      couponsList: [],
      loading: false,
      loadend: false,
      images: {
        noCoupon: 'https://shop.cdn.dev56.com/assets/images/no-coupon.png'
      }
    }
  },
  onShow() {
    this.getUseCoupons()
  },
  onReachBottom() {
    !this.loading && this.getUseCoupons()
  },
  methods: {
    getCoupon(id, index) {
      const that = this
      const list = that.couponsList
      getCouponReceive(id).then((res) => {
        list[index].isUse = true
        uni.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        })
      }).catch((res) => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
    },
    getUseCoupons() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true
      const q = { page: that.page, limit: that.limit }
      getCoupon(q).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.couponsList.push.apply(that.couponsList, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  .item {
    margin-bottom: 20upx;
    .coupon-price{
      background-image: url('/static/coupon-red.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 200upx;
      max-width: 200upx;
      color: #fff;
      font-weight: bold;
      text-align: center;
      flex: 1;
      &.coupon-gray{
        background-image: url('/static/coupon-gray.png');
      }
    }
    .content {
      width: calc(100% - 200upx);
      .condition {
        border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
