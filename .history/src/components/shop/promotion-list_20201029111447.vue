<template>
  <div v-if="benefit.length > 0" class="promotionGood">
    <div
      v-for="(item, promotionGoodIndex) in benefit"
      :key="promotionGoodIndex"
      class="item acea-row row-between-wrapper"
      @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.id} })"
    >
      <div class="pictrue">
        <img :src="item.image" class="image">
      </div>
      <div class="text">
        <div class="name line1">{{ item.storeName }}</div>
        <div class="sp-money acea-row">
          <div class="moneyCon">
            促销价: 
            <span class="num">￥{{ item.price }}</span>
          </div>
        </div>
        <div class="acea-row row-between-wrapper">
          <div class="money">日常价：￥{{ item.otPrice }}</div>
          <div>仅剩：{{ item.stock }}{{ item.unitName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PromotionGood',
  props: {
    benefit: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {}
  }
}
</script>
