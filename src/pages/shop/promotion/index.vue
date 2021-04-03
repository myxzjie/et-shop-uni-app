<template>
  <view class="quality-recommend">
    <view class="title acea-row row-center-wrapper">
      <view class="line" />
      <view class="name">
        <text class="iconfont icon-cuxiaoguanli" />促销单品
      </view>
      <view class="line" />
    </view>
    <promotion-list :list="list" />
  </view>
</template>
<script>
import promotionList from '@/components/shop/promotion-list'
import { getProductPromotion } from '@/api/store'
export default {
  components: {
    promotionList
  },
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    const that = this
    that.loadProductPromotion()
  },
  methods: {
    loadProductPromotion() {
      const that = this
      getProductPromotion(4).then(res => {
        that.list = res.data.list
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
