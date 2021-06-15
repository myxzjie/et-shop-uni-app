<template>
  <view>
    <cu-custom
      :is-back="true"
      bg-color="bg-gradual-olive"
    >
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <scroll-view scroll-y class="scrollPage">
      <view class="margin-top-sm padding-sm flex flex-wrap align-center" :class="refundOrder ? 'on' : ''">
        <view class="data" :class="refundOrder ? 'on' : ''">
          <view class="state">{{ orderInfo._status._msg }}</view>
        </view>
      </view>

      <view class="padding-top-sm ">
        <view class="cu-steps bg-white fixed">
          <!-- <view
          class="cu-item"
          :class="index > num ? '' : 'text-blue'"
          v-for="(item, index) in numList"
          :key="index"
        >
          <text class="num" :class="index == 2 ? 'err' : ''" :data-index="index + 1"></text>
          {{ item.name }}
        </view> -->
          <view class="cu-item" :class="{ 'text-green': status.type === 0 || status.type === 9 }">
            <text class="num" />
            待付款
          </view>
          <view class="cu-item" :class="{ 'text-green': status.type === 1 }">
            <text class="num" />
            待发货
          </view>
          <view class="cu-item" :class="{ 'text-green': status.type === 2 }">
            <text class="num" />
            待收货
          </view>
          <view class="cu-item" :class="{ 'text-green': status.type === 3 }">
            <text class="num" />
            待评价
          </view>
          <view class="cu-item" :class="{ 'text-green': status.type === 4 }">
            <text class="num" />
            已完成
          </view>
        </view>
      </view>

      <view class="order-details-2">

        <view class="address-manage">
          <view v-if="orderInfo.shippingType === 1" class="address bg-white margin-top padding">
            <view class="name">
              {{ orderInfo.realName
              }}
              <text class="phone margin-lr-sm">{{ orderInfo.userPhone }}</text>
              <text class="cuIcon-phone text-red" />
            </view>
            <view class="padding-top-sm">
              <text class="cuIcon-location text-red" />
              {{ orderInfo.userAddress }}
            </view>
          </view>
          <view class="line">
            <image :src="images.line" />
          </view>
        </view>

        <!--商品-->
        <order-product
          :evaluate="status.type || 0"
          :cart-info="orderInfo.cartInfo || []"
        />

        <view class="wrap-box margin-top bg-white padding">
          <view class="item flex flex-wrap row-between">
            <view>订单编号：</view>
            <view class="conter acea-row row-middle row-right">
              <text class="margin-right-xs">{{ orderInfo.orderId }}</text>
              <text
                class="copy cu-btn line-green sm"
                @tap="copyClipboard(orderInfo.orderId)"
              >复制</text>
            </view>
          </view>
          <view class="item flex flex-wrap row-between padding-top">
            <view>下单时间：</view>
            <view class="conter">
              <text>
                {{ orderInfo.addTime|dateFormat }}
              </text>
            </view>
          </view>
          <view class="item flex flex-wrap row-between padding-top">
            <view>订单类型：</view>
            <view class="conter">{{ orderTypeName }}</view>
          </view>
          <view class="item flex flex-wrap row-between padding-top">
            <view>支付状态：</view>
            <view class="conter">{{ orderInfo.paid ? "已支付" : "未支付" }}</view>
          </view>
          <view class="item flex flex-wrap row-between padding-top">
            <view>支付方式：</view>
            <view class="conter">{{ orderInfo._status._payType }}</view>
          </view>
          <view v-if="orderInfo.mark" class="item flex flex-wrap row-between padding-top">
            <view>买家留言：</view>
            <view class="conter">{{ orderInfo.mark }}</view>
          </view>
        </view>

        <block v-if="orderInfo.status != 0">
          <view v-if="orderInfo.deliveryType === 'express'" class="wrap-box margin-top bg-white padding">
            <view class="item flex flex-wrap row-between">
              <view>配送方式：</view>
              <view class="conter">发货</view>
            </view>
            <view class="item flex flex-wrap row-between padding-top">
              <view>快递公司：</view>
              <view class="conter">{{ orderInfo.deliveryName || "" }}</view>
            </view>
            <view class="item flex flex-wrap row-between padding-top">
              <view>快递号：</view>
              <view class="conter">{{ orderInfo.deliveryId || "" }}</view>
            </view>
          </view>

          <view v-else class="wrap-box margin-top bg-white padding">
            <view class="item flex flex-wrap row-between">
              <view>配送方式：</view>
              <view class="conter">送货</view>
            </view>
            <view class="item flex flex-wrap row-between padding-top">
              <view>配送人：</view>
              <view class="conter">{{ orderInfo.deliveryName || "" }}</view>
            </view>
            <view class="item flex flex-wrap row-between padding-top">
              <view>配送电话：</view>
              <view class="conter acea-row row-middle row-right">
                {{ orderInfo.deliveryId || "" }}
                <span class="copy">拨打</span>
              </view>
            </view>
          </view>
        </block>
        <!--     退款订单详情 -->
        <view v-if="refundOrder" class="wrapper">
          <view class="item acea-row row-between">
            <view>收货人：</view>
            <view class="conter">{{ orderInfo.realName }}</view>
          </view>
          <view class="item acea-row row-between">
            <view>联系电话：</view>
            <view class="conter">{{ orderInfo.userPhone }}</view>
          </view>
          <view class="item acea-row row-between">
            <view>收货地址：</view>
            <view class="conter">{{ orderInfo.userAddress }}</view>
          </view>
        </view>

        <view class="wrap-box margin-tb bg-white padding">
          <view class="item flex flex-wrap row-between">
            <view>支付金额：</view>
            <view class="conter">￥{{ orderInfo.totalPrice }}</view>
          </view>
          <view v-if="orderInfo.couponPrice > 0" class="item flex flex-wrap row-between">
            <view>优惠券抵扣：</view>
            <view class="conter">-￥{{ orderInfo.couponPrice }}</view>
          </view>
          <view v-if="orderInfo.useIntegral > 0" class="item flex flex-wrap row-between">
            <view>积分抵扣：</view>
            <view class="conter">-￥{{ orderInfo.deductionPrice }}</view>
          </view>
          <view v-if="orderInfo.payPostage > 0" class="item flex flex-wrap row-between">
            <view>运费：</view>
            <view class="conter">￥{{ orderInfo.payPostage }}</view>
          </view>
          <view class="actual-pay flex flex-wrap row-right margin-top-sm padding-top-sm">
            实付款：
            <text class="money text-xl text-red">￥{{ orderInfo.payPrice }}</text>
          </view>
        </view>
      </view>
      <view class="cu-tabbar-height" />
    </scroll-view>

    <view v-if="(!refundOrder && offlineStatus)" class="cu-bar bg-white tabbar border shop foot">
      <block v-if="status.type == 0">
        <view class="btn-group" />
        <view class="btn-group">
          <button class="cu-btn bg-orange round shadow-blur" @tap="cancelOrder">取消订单</button>
          <button class="cu-btn bg-red round shadow-blur" @tap="onPay">立即付款</button>
        </view>
      </block>

      <block v-if="status.type == 1">
        <view class="btn-group" />
        <view class="btn-group">
          <view />
          <view
            class="cu-btn bg-red round shadow-blur"
            @tap="onRefundOrder"
          >申请退款</view>
        </view>
      </block>

      <block v-if="status.type == 2">
        <view class="btn-group" />
        <view class="btn-group">
          <view
            class="cu-btn bg-orange round shadow-blur"
            @tap="
              $router.push({ path: '/pages/order/Logistics/main' ,query:{id:orderInfo.orderId }})
            "
          >查看物流</view>
          <view class="cu-btn bg-cyan round shadow-blur" @tap="takeOrder">确认收货</view>
          <!-- <view class="cu-btn bg-cyan round shadow-blur" @tap="onWriteOff">核销码</view> -->
        </view>
      </block>

      <block v-if="status.type == 3 && orderInfo.deliveryType == 'express'">
        <view class="btn-group" />
        <view class="btn-group">
          <view
            class="cu-btn bg-orange round shadow-blur"
            @tap="
              $router.push({ path: '/pages/order/Logistics/main' ,query:{id:orderInfo.orderId }})
            "
          >查看物流</view>
        </view>
      </block>

      <block v-if="status.type == 4">
        <view class="btn-group" />
        <view class="btn-group">
          <view class="cu-btn bg-red round shadow-blur" @tap="delOrder">删除订单</view>
          <view
            class="cu-btn bg-orange round shadow-blur"
            @tap="
              $router.push({ path: '/pages/order/Logistics/main' ,query:{id:orderInfo.orderId }})
            "
          >查看物流</view>
        </view>
      </block>
      <block v-if="status.type == 6">
        <view class="btn-group" />
        <view class="btn-group">
          <view
            class="cu-btn bg-cyan round shadow-blur"
            @tap="
              $router.push({ path: '/pages/activity/GroupRule/main',query:{id:orderInfo.pinkId} })
            "
          >查看拼团</view>
        </view>
      </block>
    </view>

    <payment v-model="pay" :types="payType" :balance="userInfo.nowMoney" @change="toPay" />
    <qr-code :dialog="isQrcode" :qrcode="qrcode" @close="qrcodeClose" />

  </view>
</template>

<script>
import orderProduct from '@/components/order-product/index'
import QrCode from '@/components/order-product/qrcode'
// import OrderGoods from '@components/OrderGoods'
import { orderDetail, orderQrcode } from '@/api/order'
import Payment from '@/components/payment/index'
// import { isWeixin } from '@utils'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/index'
import order from '@/mixins/order'
import {
  cancelOrderHandle,
  payOrderHandle
} from '@/libs/order'
// import { wechatEvevt } from "@libs/wechat";
export default {
  components: {
    orderProduct,
    QrCode,
    Payment
  },
  mixins: [mixins, order],
  data() {
    return {
      isQrcode: false,
      offlinePayStatus: 2,
      orderTypeName: '普通订单',
      orderTypeNameStatus: true,
      offlineStatus: true,
      id: '',
      orderInfo: {
        _status: {}
      },
      status: {},
      pay: false,
      payType: ['yue', 'weixin'],
      from: 'routine',
      system_store: {},
      mapKay: '',
      mapShow: false,
      numList: [
        {
          name: '待付款'
        },
        {
          name: '待发货'
        },
        {
          name: '待收货'
        },
        {
          name: '待评价'
        },
        {
          name: '已完成'
        }
      ],
      num: 0,
      images: {
        line: 'https://shop.cdn.dev56.com/assets/images/line.jpg'
      }
    }
  },
  computed: {
    refundOrder() {
      return this.orderInfo.refund_status > 0
    }
    // ...mapGetters(['userInfo'])
  },
  // inject: ['app'],
  onLoad(option) {
    this.id = option.id
  },
  onShow() {
    this.getDetail()
  },
  methods: {
    copyClipboard(orderId) {
      uni.setClipboardData({
        data: orderId,
        success: function(res) {
          uni.showToast({
            title: '复制成功'
          })
        }
      })
    },
    onRefundOrder() {
      const that = this
      uni.navigateTo({
        url: '/pages/order/refund/index?id=' + that.orderInfo.orderId
      })
      // $router.push({ path: '/pages/order/GoodsReturn/main',query:{id:orderInfo.orderId } })
    },
    showChang() {
      if (isWeixin()) {
        const config = {
          latitude: this.system_store.latitude,
          longitude: this.system_store.longitude,
          name: this.system_store.name,
          address: this.system_store._detailed_address
        }
        // wechatEvevt("openLocation", config)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(res => {
        //     if (res.is_ready) {
        //       res.wx.openLocation(config);
        //     }
        //   });
      } else {
        if (!this.mapKey) {
          uni.showToast({
              title: '暂无法使用查看地图，请配置您的腾讯地图key',
              icon: 'none',
              duration: 2000
            })
          return
        }
        this.mapShow = true
      }
    },
    goBack() {
      uni.navigateTo({
        url: '/pages/me/order/index'
      })
      // const history = this.app.history
      // const last = history[history.length - 1] || {}
      // if (last.name === 'MyOrder') return this.$router.back()
      // else return this.$router.replace({ path: '/order/list/' })
    },
    cancelOrder() {
      cancelOrderHandle(this.orderInfo.orderId)
        .then(() => {
          setTimeout(() => this.goBack(), 300)
        })
        .catch(() => {
          this.getDetail()
        })
    },
    takeOrder() {
      const that = this
      that.takeOrderHandle(that.orderInfo.orderId).finally(() => {
        that.getDetail()
      })
    },
    onWriteOff() {
      const that = this
      that.qrcode = ''
      orderQrcode({ id: that.orderInfo.id, orderId: that.orderInfo.orderId }).then(res => {
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
    delOrder() {
      this.delOrderHandle(this.orderInfo.orderId).then(() => {
        setTimeout(() => this.goBack(), 300)
      })
    },
    setOfflinePayStatus: function(status) {
      const that = this
      that.offlinePayStatus = status
      if (status === 1 && that.orderTypeNameStatus === true) {
        that.payType.push('offline')
      }
    },
    getOrderStatus() {
      const orderInfo = this.orderInfo || {}
      const _status = orderInfo._status || { _type: 0 }
      let status = {}
      const type = parseInt(_status._type)
      const delivery_type = orderInfo.deliveryType
      const seckill_id = orderInfo.seckillId ? parseInt(orderInfo.seckillId) : 0
      const bargain_id = orderInfo.bargainId ? parseInt(orderInfo.bargainId) : 0
      const combination_id = orderInfo.combinationId
        ? parseInt(orderInfo.combinationId)
        : 0
      status = {
        type: type,
        class_status: 0
      }
      if (type === 1 && combination_id > 0) {
        status.type = 6
        status.class_status = 1
      } // 查看拼团
      if (type === 2 && delivery_type === 'express') status.class_status = 2 // 查看物流
      if (type === 2) status.class_status = 3 // 确认收货
      if (type === 4 || type === 0) status.class_status = 4 // 删除订单
      if (
        !seckill_id &&
        !bargain_id &&
        !combination_id &&
        (type === 3 || type === 4)
      ) { status.class_status = 5 } // 再次购买
      if (type === 9) {
        // 线下付款
        status.class_status = 0
        this.offlineStatus = false
      }
      this.status = status
    },
    getDetail() {
      const that = this
      if (!that.id) {
        uni.showToast({
          title: '订单不存在',
          icon: 'none',
          duration: 2000
        })
        return
      }
      orderDetail(that.id).then(res => {
        this.orderInfo = res.data
        this.getOrderStatus()
        if (this.orderInfo.combinationId > 0) {
          this.orderTypeName = '拼团订单'
          this.orderTypeNameStatus = false
        } else if (this.orderInfo.bargainId > 0) {
          this.orderTypeName = '砍价订单'
          this.orderTypeNameStatus = false
        } else if (this.orderInfo.seckillId > 0) {
          this.orderTypeName = '秒杀订单'
          this.orderTypeNameStatus = false
        }
        this.system_store = res.data.system_store || {}
        this.mapKey = res.data.mapKay
        this.setOfflinePayStatus(this.orderInfo.offlinePayStatus)
      })
        .catch(err => {
          wx.showToast({
            title: err.response.data.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    onPay() {
      this.pay = true
    },
    async toPay(type) {
      const that = this
      await payOrderHandle(that.orderInfo.orderId, type, that.from)
      that.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.address-manage {
  .address {
    padding-bottom: 10upx;
  }
  .line{
    height: 9upx;
    overflow: hidden;
  }
}

.actual-pay {
  border-top: 1upx solid #ddd;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
