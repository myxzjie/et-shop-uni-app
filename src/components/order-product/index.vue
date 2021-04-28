<template>
  <view class="order-product margin-top padding-sm bg-white">
    <view class="total padding-sm">共{{ cartInfo.length }}件商品</view>
    <view class="product padding-top-sm">
      <view v-for="cart in cartInfo" :key="cart.id" class="item flex flex-wrap row-left">
        <view class="pictrue">
          <image :src="cart.productInfo.image" class="image" />
        </view>
        <view class="content padding-left-xs">
          <view class="title flex flex-wrap align-between">
            <view class="name">
              {{ cart.productInfo.storeName }}
            </view>
            <view class="quantity">x {{ cart.cartNum }}</view>
          </view>
          <view
            v-if="cart.productInfo.attrInfo"
            class="attribute padding-tb-sm"
          >{{ cart.productInfo.attrInfo.suk }}</view>
          <view class="price text-xl text-red">￥{{ cart.truePrice }}</view>
          <view
            v-if="evaluate == 3"
            class="evaluate"
            @click="$router.push({ path: '/pages/shop/GoodsEvaluate/main',query:{id:cart.unique} })"
          >评价</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    evaluate: {
      type: Number,
      default: 0
    },
    cartInfo: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.order-product {
  .total {
    border-bottom: 1upx solid #ddd;
  }
  .product {
    .pictrue {
      > .image {
        width: 160upx;
        height: 160upx;
      }
    }
    .content {
      width: calc(100% - 160upx);
      .title {
        .name {
          width: calc(100% - 60upx);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .quantity {
          width: 60upx
        }
      }
    }
  }
}
</style>
