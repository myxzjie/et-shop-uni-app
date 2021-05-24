<template>
  <view>
    <cu-custom bg-image="/static/sylb2244.jpeg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view ref="container" class="return-list">
        <view v-for="(order,orderListIndex) in orderList" :key="orderListIndex" class="goodWrapper">
          <view v-if="order._status._type === -1" class="iconfont icon-tuikuanzhong powder" />
          <view v-if="order._status._type === -2" class="iconfont icon-yituikuan" />
          <view class="orderNum">订单号：{{ order.orderId }}</view>
          <view
            v-for="(cart,cartInfoIndex) in order.cartInfo"
            :key="cartInfoIndex"
            class="item acea-row row-between-wrapper"
            @click="$router.push({ path: '/pages/order/OrderDetails/main',query:{id:order.orderId} })"
          >
            <view class="pictrue">
              <img
                :src="cart.productInfo.image"
                class="image"
                @click.stop="
                  $router.push({ path: '/pages/shop/GoodsCon/main',query: { id: cart.productInfo.id } })
                "
              >
            </view>
            <view class="text">
              <view class="acea-row row-between-wrapper">
                <view class="name line1">{{ cart.productInfo.storeName }}</view>
                <view class="num">x {{ cart.cartNum }}</view>
              </view>
              <view
                v-if="cart.productInfo.attrInfo"
                class="attr line1"
              >{{ cart.productInfo.attrInfo.suk }}</view>
              <view v-else class="attr line1">{{ cart.productInfo.storeName }}</view>
              <view class="money">￥{{ cart.productInfo.price }}</view>
            </view>
          </view>
          <view class="totalSum">
            共{{ order.cartInfo.length || 0 }}件商品，总金额
            <span
              class="font-color-red price"
            >￥{{ order.payPrice }}</span>
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
    }
  },
  onReachBottom() {
    !this.loading && this.getOrderList()
  }
}
</script>
