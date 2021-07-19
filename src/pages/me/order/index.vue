<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="my-order">
        <view class="header padding">
          <view class="picTxt flex flex-wrap align-between">
            <view class="text">
              <view class="name">订单信息</view>
              <view class="margin-top-sm">
                <text>累计订单：{{ orderData.orderCount || 0 }} </text>
                <text class="margin-left-sm"> 总消费：￥{{ orderData.sumPrice || 0 }}</text>
              </view>
            </view>
          </view>
        </view>

        <scroll-view scroll-x class="bg-white nav">
          <view class="flex text-center">
            <view
              class="cu-item flex-sub"
              :class="type === 0 ? 'text-cyan cur' : ''"
              @tap="changeType(0)"
            >
              <view>待付款</view>
              <view>{{ orderData.unpaidCount || 0 }}</view>
            </view>
            <view
              class="cu-item flex-sub"
              :class="type === 1 ? 'text-cyan cur' : ''"
              @tap="changeType(1)"
            >
              <view>待发货</view>
              <view>{{ orderData.unshippedCount || 0 }}</view>
            </view>

            <view
              class="cu-item flex-sub"
              :class="type === 2 ? 'text-cyan cur' : ''"
              @tap="changeType(2)"
            >
              <view>待收货</view>
              <view>{{ orderData.receivedCount || 0 }}</view>
            </view>

            <view
              class="cu-item flex-sub"
              :class="type === 3 ? 'text-cyan cur' : ''"
              @tap="changeType(3)"
            >
              <view>待评价</view>
              <view>{{ orderData.evaluatedCount || 0 }}</view>
            </view>

            <view
              class="cu-item flex-sub"
              :class="type === 4 ? 'text-cyan cur' : ''"
              @tap="changeType(4)"
            >
              <view>已完成</view>
              <view>{{ orderData.completeCount || 0 }}</view>
            </view>
          </view>
        </scroll-view>

        <view class="margin-top-sm padding-sm bg-white">
          <view v-for="(order,orderListIndex) in orderList" :key="orderListIndex" class="order-wrap bg-white margin-bottom-sm">
            <view class="title flex flex-wrap align-between">
              <view class="flex flex-wrap row-middle padding-sm">
                <text v-if="order.combinationId > 0" class="cu-tag line-cyan">拼团</text>
                <text v-if="order.seckillId > 0" class="cu-tag line-cyan">秒杀</text>
                <text v-if="order.bargainId > 0" class="cu-tag line-cyan">砍价</text>
                <text class="margin-left-sm">{{ order.addTime|dateFormat }}</text>
              </view>
              <view class="font-color-red">{{ getStatus(order) }}</view>
            </view>
            <view
              class="padding-sm"
              @tap="onOrderDetails(order.orderId)"
            >
              <view
                v-for="(cart,cartInfoIndex) in order.cartInfo"
                :key="cartInfoIndex"
                class="item flex flex-wrap row-between row-top"
              >
                <view class="pictrue">
                  <image
                    v-if="cart.combinationId === 0 && cart.bargainId === 0 &&cart.seckillId === 0"
                    :src="cart.productInfo.image"
                    @tap.stop="onShopDetails(cart.productInfo.id)"
                  />
                  <image
                    v-else-if="cart.combinationId > 0"
                    :src="cart.productInfo.image"
                    @tap.stop="onGroupDetails(cart.combinationId)"
                  />
                  <image
                    v-else-if="cart.bargainId > 0"
                    :src="cart.productInfo.image"
                    @tap.stop="onDargainDetails(cart.bargainId)"
                  />
                  <image
                    v-else-if="cart.seckillId > 0"
                    :src="cart.productInfo.image"
                    @tap.stop="onSeckillDetails(cart.seckillId)"
                  />
                </view>
                <view class="content padding-left-sm ">
                  <view>{{ cart.productInfo.storeName }} </view>
                  <view class="text-red text-lg margin-top-xs">
                    ￥{{
                      cart.productInfo.attrInfo
                        ? cart.productInfo.attrInfo.price
                        : cart.productInfo.price
                    }}
                  </view>
                  <view class="totalPrice margin-top-xs">
                    共{{ order.cartInfo.length || 0 }}件商品，总金额
                    <text
                      class="money text-cyan"
                    >￥{{ order.payPrice }}</text>
                  </view>
                </view>
              </view>
            </view>

            <view class="bottom acea-row row-right row-middle padding-sm">
              <template v-if="order._status._type == 0">
                <view class="cu-btn line-grey round sm" @click="cancelOrder(order)">取消订单</view>
                <view class="margin-left-sm" />
                <view
                  class="cu-btn bg-cyan round sm"
                  @tap="onOrderDetails(order.orderId)"
                >立即付款</view>
              </template>
              <template v-if="order._status._type == 1 || order._status._type == 9">
                <view
                  class="cu-btn bg-cyan round sm"
                  @tap="onOrderDetails(order.orderId)"
                >查看详情</view>
              </template>
              <template v-if="order._status._type == 2">
                <view
                  class="cu-btn line-grey round sm"
                  @tap="onDelivery(order.orderId)"
                >查看物流</view>
                <view class="margin-left-sm" />
                <view class="cu-btn bg-cyan round sm" @tap="takeOrder(order)">确认收货</view>
                <!-- <view class="cu-btn bg-cyan round sm" @tap="onWriteOff(order)">核销码</view> -->
              </template>
              <template v-if="order._status._type == 3">
                <!--<view-->
                <!--class="bnt default"-->
                <!--@click="-->
                <!--$router.push({ path: '/pages/order/Logistics/main',query:{id:order.orderId}})-->
                <!--"-->
                <!--v-if="order.deliveryType == 'express'"-->
                <!--&gt;-->
                <!--查看物流-->
                <!--</view>-->
                <view
                  class="cu-btn bg-cyan round sm"
                  @tap="onOrderDetails(order.orderId)"
                >去评价</view>
              </template>
              <template v-if="order._status._type === 4">
                <view
                  class="cu-btn bg-cyan round sm"
                  @tap="onOrderDetails(order.orderId)"
                >查看订单</view>
              </template>
            </view>
          </view>
        </view>
        <view v-if="orderList.length === 0 && page > 1" class="noCart">
          <view class="pictrue">
            <img :src="images.noOrder">
          </view>
        </view>
        <Loading :loaded="loaded" :loading="loading" />
        <!-- <Payment v-model="pay" :types="payType" :balance="userInfo.nowMoney" @checked="toPay" /> -->
        <qr-code :dialog="isQrcode" :qrcode="qrcode" @close="qrcodeClose" />

      </view>
    </scroll-view>
  </view>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import order from '@/mixins/order'
import mixins from '@/mixins/index'
import Loading from '@/components/loading'
import QrCode from '@/components/order-product/qrcode'
import { getOrderData, getOrderList, orderQrcode } from '@/api/order'
// import {
//   cancelOrderHandle,
//   payOrderHandle,
//   takeOrderHandle
// } from '@/libs/order'
// import Payment from '@components/Payment'
// import { isWeixin } from '@utils'

const STATUS = [
  '待付款',
  '待发货',
  '待收货',
  '待评价',
  '已完成',
  '',
  '',
  '',
  '',
  '待付款'
]

export default {
  components: {
    Loading,
    // Payment,
    QrCode
  },
  filters: {
    dateFormat(value) {
      value = +value * 1000
      return moment(value).format('YYYY/MM/DD HH:mm:ss')
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
  mixins: [mixins, order],
  data() {
    return {
      active: 1,
      offlinePayStatus: 2,
      orderData: {},
      type: '',
      page: 1,
      limit: 20,
      loaded: false,
      loading: false,
      orderList: [],
      pay: false,
      payType: ['yue', 'weixin'],
      // from: isWeixin() ? 'weixin' : 'weixinh5',
      isQrcode: false,
      qrcode: '',
      images: {
        noOrder: 'https://shop.cdn.dev56.com/assets/images/noOrder.png'
      }
    }
  },
  onLoad(option) {
    this.type = parseInt(option.type) || 0
  },
  onShow() {
    this.getOrderData()
    this.getOrderList()
  },
  methods: {
    // dataFormat,
    setOfflinePayStatus(status) {
      var that = this
      that.offlinePayStatus = status
      if (status === 1) {
        if (that.payType.indexOf('offline') < 0) {
          that.payType.push('offline')
        }
      }
    },
    getOrderData() {
      const that = this
      getOrderData().then(res => {
        this.orderData = res.data
      })
    },
    takeOrder(order) {
      const that = this
      that.takeOrderHandle(order.orderId).finally(() => {
        that.reload()
        that.getOrderData()
      })
    },
    reload() {
      this.changeType(this.type)
    },
    changeType(type) {
      this.type = type
      this.orderList = []
      this.page = 1
      this.loaded = false
      this.loading = false
      this.getOrderList()
    },
    getOrderList() {
      if (this.loading || this.loaded) return
      this.loading = true
      const that = this
      const { page, limit, type } = this
      getOrderList({
        page,
        limit,
        type
      }).then(res => {
        this.orderList = this.orderList.concat(res.data)
        this.page++
        this.loaded = res.data.length < this.limit
        this.loading = false
        // that.$forceUpdate()
      })
    },
    getStatus(order) {
      return STATUS[order._status._type]
    },
    cancelOrder(order) {
      cancelOrderHandle(order.orderId)
        .then(() => {
          this.orderList.splice(this.orderList.indexOf(order), 1)
        })
        .catch(() => {
          this.reload()
        })
    },
    paymentTap: function(order) {
      const that = this
      if (
        !(order.combinationId > 0 || order.bargainId > 0 || order.seckillId > 0)
      ) {
        that.setOfflinePayStatus(order.offlinePayStatus)
      }
      this.pay = true
      this.toPay = type => {
        payOrderHandle(order.orderId, type, that.from)
          .then(() => {
            const type = parseInt(this.$route.query.type) || 0
            that.changeType(type)
            that.getOrderData()
          })
          .catch(() => {
            const type = parseInt(that.$route.query.type) || 0
            that.changeType(type)
            that.getOrderData()
          })
      }
    },
    toPay() {},
    onOrderDetails(orderId) {
      uni.navigateTo({
        url: `/pages/order/details/index?id=${orderId}`
      })
    },
    onShopDetails(id) {
      uni.navigateTo({
        url: `/pages/shop/details/index?id=${id}`
      })
    },
    onDelivery(id) {
      uni.navigateTo({
        url: `/pages/order/delivery/index?id=${id}`
      })
    },
    onSeckillDetails(id) {
      uni.navigateTo({
        url: `/pages/activity/seckill/details?id=${id}`
      })
    },
    onDargainDetails(id) {
      uni.navigateTo({
        url: `/pages/activity/bargain/details?id=${id}`
      })
    },
    onGroupDetails(id) {
      uni.navigateTo({
        url: `/pages/activity/buy-group/details?id=${id}`
      })
    },
    onWriteOff(order) {
      const that = this
      that.qrcode = ''
      orderQrcode({ id: order.id, orderId: order.orderId }).then(res => {
        that.qrcode = res.data
        that.isQrcode = true
      }).catch(error => {
        uni.showToast({
          title: error.response.data.msg,
          icon: 'none',
          duration: 2000
        })
      })
    },
    qrcodeClose() {
      this.isQrcode = false
    },
    onDialogClose() {
      this.show = false
    },
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.index + 1}`,
        icon: 'none'
      })
    }
  },
  onReachBottom() {
    !this.loading && this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
.order-wrap {
  border-bottom: 1px solid #eee;
  .pictrue {
    > image {
      width: 160upx;
      height: 160upx;
      border-radius: 5upx;
      border: 1px solid #eee;
    }
  }
  .content {
    width: calc(100% - 160upx);
  }
  .bottom {
     border-top: 1px solid #eee;
  }
}

.nav {
  .cu-item {
    height: inherit;
    display: inline-block;
    line-height: initial;
    margin: 0 10upx;
    padding: 20upx 20upx;
  }
}

.noCart {
  margin-top: 0.17rem;
  padding-top: 0.1rem;
}

.noCart .pictrue {
  width: 4rem;
  height: 3rem;
  margin: 0.7rem auto 0.5rem auto;
}

.noCart .pictrue img {
  width: 100%;
  height: 100%;
}

.my-order .header .picTxt .text {
  // color: rgba(255, 255, 255, 0.8);
  /* font-size: 0.26rem; */
  font-family: 'GuildfordProBook 5';
}

.my-order .header .picTxt .text .name {
  /* font-size: 0.34rem; */
  font-weight: bold;
  // color: #fff;
  margin-bottom: 0.2rem;
}

.my-order .header .picTxt .pictrue {
  width: 1.22rem;
  height: 1.09rem;
}

.my-order .header .picTxt .pictrue img {
  width: 100%;
  height: 100%;
}

.my-order .nav {
  background-color: #fff;
  /* width: 6.9rem; */
  /* height: 1.4rem; */
  border-radius: 0.06rem;
  margin: 0 auto 0 auto;
}

.my-order .nav .item {
  text-align: center;
  /* font-size: 0.26rem; */
  color: #282828;
  padding: 0.29rem 0 0.2rem 0;
}

.my-order .nav .item.on {
  font-weight: bold;
  border-bottom: 0.05rem solid #73CBB6;
}

.my-order .nav .item .num {
  margin-top: 0.1rem;
}

.my-order .list .item {
  background-color: #fff;
}

.my-order .list .item .title {
  /* height: 0.84rem; */
  padding: 0 0.3rem;
  border-bottom: 0.01rem solid #eee;
  /* font-size: 0.28rem; */
  color: #282828;
}

.my-order .list .item .title .sign {
  /* font-size: 0.24rem; */
  padding: 0 0.07rem;
  /* height: 0.36rem; */
  margin-right: 0.15rem;
}

.my-order .list .item .item-info .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
}

.my-order .list .item .item-info .text {
  width: 4.86rem;
  /* font-size: 0.28rem; */
  color: #999;
  margin-top: 0.06rem;
}

.my-order .list .item .item-info .text .name {
  width: 3.06rem;
  color: #282828;
}

.my-order .list .item .item-info .text .money {
  text-align: right;
}

.my-order .list .item .totalPrice {
  /* font-size: 0.26rem; */
  color: #282828;
  text-align: right;
  /* margin: 0.27rem 0 0 0.3rem; */
  /* padding: 0 0.3rem 0.3rem 0; */
  /* border-bottom: 0.01rem solid #eee; */
}

.my-order .list .item .totalPrice .money {
  /* font-size: 0.28rem; */
  font-weight: bold;
}

.my-order .list .item .bottom .bnt {
  width: 1.76rem;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  color: #fff;
  border-radius: 0.5rem;
  font-size: 0.27rem;
}

.my-order .list .item .bottom .bnt.cancelBnt {
  border: 1px solid #ddd;
  color: #aaa;
}

.my-order .list .item .bottom .bnt.default {
  color: #444;
  border: 1px solid #444;
}

.my-order .list .item .bottom .bnt~.bnt {
  margin-left: 0.17rem;
}
</style>
