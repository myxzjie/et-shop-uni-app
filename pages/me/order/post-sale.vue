<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="return-list">
        <view v-for="(order,orderListIndex) in orderList" :key="orderListIndex" class="padding bg-white margin-bottom-sm">
          <view v-if="order._status._type === -1" class="iconfont icon-tuikuanzhong powder" />
          <view v-if="order._status._type === -2" class="iconfont icon-yituikuan" />
          <view class="orderNum solid-bottom padding-bottom">订单号: {{ order.orderId }}</view>
          <view
            v-for="(cart,cartInfoIndex) in order.cartInfo"
            :key="cartInfoIndex"
            class="item flex flex-wrap align-between solid-bottom padding-tb-xs"
            @tap="onOrderDetails(order.orderId)"
          >
            <view class="pictrue">
              <image
                :src="cart.productInfo.image"
                class="image"
                mode="widthFix"
                @tap.stop="onShopDetails(cart.productInfo.id)"
              />
            </view>
            <view class="content padding-sm">
              <view class="flex flex-wrap align-between">
                <view class="name ellipsis-line">{{ cart.productInfo.storeName }}</view>
                <view class="num margin-top-xs text-gary"> 数量: x{{ cart.cartNum }}</view>
              </view>
              <view
                v-if="cart.productInfo.attrInfo"
                class="attr ellipsis-line margin-top-xs"
              >{{ cart.productInfo.attrInfo.suk }}</view>
              <!-- <view v-else class="attr line1">{{ cart.productInfo.storeName }}</view> -->
              <view class="money margin-top-xs text-red text-lg">￥{{ cart.productInfo.price }}</view>
            </view>
          </view>
          <view class="totalSum margin-top-sm text-right">
            共{{ order.cartInfo.length || 0 }}件商品，总金额
            <text
              class="text-red price"
            >￥{{ order.payPrice }}</text>
          </view>
        </view>
        <view v-if="orderList.length === 0 && page > 1" class="noCart">
          <view class="pictrue">
            <img src="https://shop.cdn.dev56.com/assets/images/noOrder.png">
          </view>
        </view>
        <Loading :loaded="loaded" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getOrderList } from '@/api/order'
import Loading from '@/components/loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      orderList: [],
      page: 1,
      limit: 20,
      loading: false,
      loaded: false
    }
  },
  onShow() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      const { page, limit } = this
      if (this.loading || this.loaded) return
      this.loading = true
      getOrderList({
        page,
        limit,
        type: -3
      }).then(res => {
        this.orderList = this.orderList.concat(res.data)
        this.loading = false
        this.loaded = res.data.length < limit
        this.page++
      })
    },
    onOrderDetails(orderId) {
      uni.navigateTo({
        url: `/pages/order/details/index?id=${orderId}`
      })
    },
    onShopDetails(id) {
      uni.navigateTo({
        url: `/pages/shop/details/index?id=${id}`
      })
    }
  },
  onReachBottom() {
    !this.loading && this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
.item {
  .pictrue {
    .image {
      width: 160upx;
      height: 160upx;
      border-radius: 5upx;
      border: 1upx solid #eee;
    }
  }
  .content {
    width: calc(100% - 160upx);
  }
}
</style>
