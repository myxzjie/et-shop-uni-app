<template>
  <view class="goodList">
    <view v-for="(item, goodListIndex) in list" :key="goodListIndex"
      class="item acea-row row-between-wrapper"
      @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.id} })"
    >
      <view class="pictrue">
        <img :src="item.image" class="image">
        <img v-if="isSort === true && goodListIndex === 0" :src="$VUE_APP_RES_URL+'/assets/images/one.png'" class="numPic">
        <img v-if="isSort === true && goodListIndex === 1" :src="$VUE_APP_RES_URL+'/assets/images/two.png'" class="numPic">
        <img v-if="isSort === true && goodListIndex === 2" :src="$VUE_APP_RES_URL+'/assets/images/three.png'" class="numPic">
      </view>
      <view class="underline">
        <view class="text">
          <view class="line1">{{ item.storeName }}</view>
          <view class="money font-color-red">
            ￥<text class="num">{{ item.price }}</text>
          </view>
          <view class="vip-money acea-row row-middle">
            <view class="vip">
              ￥{{ item.otPrice || 0 }}
            </view>
            <text class="num">已售{{ item.sales }}{{ item.unitName }}</text>
          </view>
        </view>
      </view>
      <view class="iconfont icon-gouwuche cart-color acea-row row-center-wrapper" />
    </view>
  </view>
</template>
<script>
export default {
  name: 'GoodList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isSort: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  }
}
</script>
