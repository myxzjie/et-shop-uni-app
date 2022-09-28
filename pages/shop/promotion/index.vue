<template>
  <view>
    <cu-custom :is-back="true">
      <block slot="backText">返回</block>
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <divider-line title="促销单品" />
    <view class="quality-recommend">
      <!-- <view class="title acea-row row-center-wrapper">
        <view class="line" />
        <view class="name">
          <text class="iconfont icon-cuxiaoguanli" />促销单品
        </view>
        <view class="line" />
      </view> -->
      <promotion-list :list="list" />
    </view>
  </view>
</template>
<script>
import DividerLine from '@/components/divider-line'
import promotionList from '@/components/shop/promotion-list'
import { getProductPromotion } from '@/api/store'

export default {
  components: {
    DividerLine,
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
