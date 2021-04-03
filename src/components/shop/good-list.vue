<template>
  <view class="goodList">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="item acea-row row-between-wrapper"
      @click="onShopDetails(item)"
    >
      <view class="pictrue">
        <image :src="item.image" class="image" />
        <image v-if="isSort === true && index === 0" :src="images.one" class="numPic" />
        <image v-if="isSort === true && index === 1" :src="images.two" class="numPic" />
        <image v-if="isSort === true && index === 2" :src="images.three" class="numPic" />
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
    return {
      images: {
        one: this.resURL + '/assets/images/one.png',
        two: this.resURL + '/assets/images/two.png',
        three: this.resURL + '/assets/images/three.png'
      }
    }
  },
  methods: {
    onShopDetails(item) {
      const url = '/pages/shop/details/index?id=' + item.id
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>
