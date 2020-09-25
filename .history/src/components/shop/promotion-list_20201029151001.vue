<template>
  <view class="promotionGood">
    <view
      v-for="(item, promotionGoodIndex) in list"
      :key="promotionGoodIndex"
      class="item acea-row row-between-wrapper"
      @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.id} })"
    >
      <view class="pictrue">
        <img :src="item.image" class="image">
      </view>
      <view class="text">
        <view class="name line1">{{ item.storeName }}</view>
        <view class="sp-money acea-row">
          <view class="moneyCon">
            促销价: 
            <span class="num">￥{{ item.price }}</span>
          </view>
        </view>
        <view class="price acea-row row-between-wrapper">
          <view class="money">日常价：￥{{ item.otPrice }}</view>
          <view>仅剩：{{ item.stock }}{{ item.unitName }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'PromotionGood',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {}
  }
}
</script>
