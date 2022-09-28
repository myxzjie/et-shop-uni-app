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
      <view class="address-manage padding-top-sm">
        <view
          v-if="shipping_type === 0"
          class="address bg-white flex flex-wrap align-between padding-sm"
          @click="addressTap"
        >
          <view v-if="addressInfo.realName" class="addressCon">
            <view class="name text-bold">
              {{ addressInfo.realName }}
              <text class="phone padding-left-sm">{{ addressInfo.phone }}</text>
            </view>
            <view class="padding-top-sm">
              <text
                v-if="addressInfo.isDefault"
                class="default text-red padding-right-sm"
              >[默认]</text>
              {{ addressInfo.province }}{{ addressInfo.city }}{{ addressInfo.district
              }}{{ addressInfo.detail }}
            </view>
          </view>
          <view v-else class="addressCon">
            <view class="setaddress">设置收货地址</view>
          </view>
          <view class="cuIcon-right" />
        </view>
        <view class="line">
          <image :src="images.line" />
        </view>
      </view>

      <!--商品-->
      <order-product :evaluate="0" :cart-info="orderGroupInfo.cartInfo" />

      <view class="wrap-box margin-top bg-white">
        <view v-if="deduction === false" class="item flex flex-wrap align-between padding" @tap="couponTap">
          <view>优惠券</view>
          <view class="discount">
            {{ usableCoupon.couponTitle || "请选择" }}
            <text class="cuIcon-right" />
          </view>
        </view>

        <!--积分抵扣-->
        <!-- <view v-if="deduction === false" class="item flex flex-wrap align-between padding">
        <view>积分抵扣</view>
        <view class="discount">
          <view class="select-btn">
            <view class="checkbox-wrapper">
              <view class="well-check">
                <input v-model="useIntegral" type="checkbox">
                <text class="icon" />
                <text class="integral">
                  当前积分
                  <text class="num font-color-red">{{ userInfo.integral || 0 }}</text>
                </text>
              </view>
            </view>
          </view>
        </view>
      </view> -->

        <view v-if="shipping_type === 0" class="item flex flex-wrap align-between padding">
          <view>快递费用</view>
          <view class="discount">
            {{
              orderGroupInfo.priceGroup.storePostage > 0
                ? orderGroupInfo.priceGroup.storePostage
                : "免运费"
            }}
          </view>
        </view>

        <view v-if="shipping_type === 0" class="item flex flex-wrap align-between padding">
          <view>优惠金额</view>
          <view class="discount text-red">
            {{
              orderGroupInfo.priceGroup.discountPrice > 0
                ? orderGroupInfo.priceGroup.discountPrice
                : 0
            }}
          </view>
        </view>
      <!-- <view v-else>
        <view class="item flex flex-wrap align-between padding">
          <view>联系人</view>
          <view class="discount">
            <input v-model="contacts" type="text" placeholder="请填写您的联系姓名">
          </view>
        </view>
        <view class="item flex flex-wrap align-between padding">
          <view>联系电话</view>
          <view class="discount">
            <input v-model="contactsTel" type="text" placeholder="请填写您的联系电话">
          </view>
        </view>
      </view> -->
      <!-- <view class="item padding">
        <view>备注信息</view>
        <textarea v-model="mark" placeholder="请添加备注（150字以内）" />
      </view> -->

      </view>

      <view class="wrap-box margin-top bg-white">
        <view class="item padding">
          <view>支付方式</view>
          <view class="list">
            <view
              v-show="isWeixin"
              class="pay-item flex flex-wrap row-middle padding-sm"
              :class="active === 'weixin' ? 'active' : ''"
              @click="payItem('weixin')"
            >
              <view class="name flex flex-wrap align-between">
                <text class="cuIcon-weixin margin-right-xs text-green" />
                微信支付
              </view>
              <view class="tip text-grey">微信快捷支付</view>
            </view>
            <view
              v-show="!isWeixin"
              class="pay-item flex flex-wrap row-between padding-sm"
              :class="active === 'weixin' ? 'active' : ''"
              @click="payItem('weixin')"
            >
              <view class="name flex flex-wrap align-between">
                <text class="cuIcon-weixin margin-right-xs text-green" />
                微信支付
              </view>
              <view class="tip text-grey">微信快捷支付</view>
            </view>

            <view
              class="pay-item acea-row row-between padding-sm"
              :class="active === 'yue' ? 'active' : ''"
              @click="payItem('yue')"
            >
              <view class="name flex flex-wrap align-between">
                <text class="cuIcon-coin margin-right-xs text-green" />
                余额支付
              </view>
              <view class="tip">可用余额：<text class="text-red">{{ userInfo.nowMoney || 0 }}</text></view>
            </view>
          </view>
        </view>
      </view>

      <view class="wrap-box margin-tb bg-white">
        <view v-if="orderPrice.totalPrice !== undefined" class="item flex flex-wrap row-between padding-sm">
          <view>商品总价：</view>
          <view class="price text-red text-df">￥{{ orderPrice.totalPrice }}</view>
        </view>
        <view v-if="orderPrice.payPostage > 0" class="item flex flex-wrap row-between padding-sm">
          <view>运费：</view>
          <view class="price">￥{{ orderPrice.payPostage }}</view>
        </view>
        <view v-if="orderPrice.couponPrice > 0" class="item flex flex-wrap row-between padding-sm">
          <view>优惠券抵扣：</view>
          <view class="price">-￥{{ orderPrice.couponPrice }}</view>
        </view>
        <view v-if="orderPrice.deductionPrice > 0" class="item flex flex-wrap row-between padding-sm">
          <view>积分抵扣：</view>
          <view class="price">-￥{{ orderPrice.deductionPrice }}</view>
        </view>
      </view>

      <view class="cu-tabbar-height" />
    </scroll-view>

    <view class="cu-bar bg-white tabbar border shop foot">
      <view class="btn-group">
        <view>合计:
          <text class="text-red text-lg">￥{{ orderPrice.payPrice }}</text>
        </view>
      </view>
      <view class="bg-red submit" @tap="createOrder">立即结算</view>
    </view>

    <coupon-pop
      v-model="showCoupon"
      :price="orderPrice.totalPrice"
      :checked="usableCoupon.id"
      @couponchange="changecoupon($event)"
      @checked="changeCoupon"
    />

    <address-pop
      ref="address"
      v-model="showAddress"
      :checked="addressInfo.id"
      @change="changeAddress"
      @redirect="addressRedirect"
    />

  </view>
</template>

<script>
import orderProduct from '@/components/order-product/index'
// import CouponListWindow from '@components/CouponListWindow'
import { postOrderConfirm, postOrderComputed, createOrder } from '@/api/order'
import AddressPop from '@/components/address/address-pop'
import CouponPop from '@/components/coupon/coupon-pop'
import { mapGetters } from 'vuex'
// import { weappPay } from '@libs/wechat'
// import { isWeixin } from '@utils'
import mixins from '@/mixins/index'

// const _isWeixin = isWeixin()
export default {
  components: {
    orderProduct,
    CouponPop,
    AddressPop
  },
  mixins: [mixins],
  data() {
    return {
      ids: '',
      offlinePayStatus: 2,
      from: 'routine',
      // from: _isWeixin ? "weixin" : "weixinh5",
      deduction: true,
      isWeixin: false, // _isWeixin,
      pinkId: 0,
      active: 'weixin',
      showCoupon: false,
      showAddress: false,
      addressInfo: {},
      couponId: 0,
      orderGroupInfo: {
        priceGroup: {}
      },
      usableCoupon: {},
      addressLoaded: false,
      useIntegral: false,
      orderPrice: {
        payPrice: '计算中'
      },
      mark: '',
      system_store: {},
      shipping_type: 0,
      contacts: '',
      contactsTel: '',
      store_self_mention: 0,
      images: {
        line: 'https://shop.cdn.dev56.com/assets/images/line.jpg'
      }
      // userInfo: {},
    }
  },
  // computed: mapGetters(['userInfo']),
  watch: {
    useIntegral() {
      this.computedPrice()
    },
    shipping_type() {
      this.computedPrice()
    }
  },
  onLoad(option) {
    const that = this
    that.ids = option.ids
    if (option.pinkid !== undefined) {
      that.pinkId = option.pinkid
    }
  },
  onShow() {
    const that = this
    that.getCartInfo()
    // that.getUserInfo()
  },
  methods: {
    addressType: function(index) {
      if (index && !this.system_store.id) {
        uni.showToast({
          title: '暂无门店信息，您无法选择到店自提！',
          icon: 'none',
          duration: 2000
        })
      }
      this.shipping_type = index
    },
    computedPrice() {
      const that = this
      const shippingType = that.shipping_type
      postOrderComputed(that.orderGroupInfo.orderKey, {
        addressId: that.addressInfo.id,
        useIntegral: that.useIntegral ? 1 : 0,
        couponId: that.usableCoupon.id || 0,
        shipping_type: parseInt(shippingType) + 1
      }).then((res) => {
        const data = res.data
        if (data.status === 'EXTEND_ORDER') {
          this.$router.replace({
            path: '/pages/order/OrderDetails/main',
            query: { id: data.result.orderId }
          })
        } else {
          this.orderPrice = data.result
        }
      })
    },
    getCartInfo() {
      const that = this
      const cartIds = that.ids
      if (!cartIds) {
        uni.showToast({
          title: '参数有误',
          icon: 'none',
          duration: 2000
        })
        return this.$router.back()
      }
      postOrderConfirm(cartIds)
        .then((res) => {
          // this.offlinePayStatus = res.data.offline_pay_status
          that.orderGroupInfo = res.data
          that.deduction = res.data.deduction
          that.usableCoupon = res.data.usableCoupon || {}
          that.addressInfo = res.data.addressInfo || {}
          that.system_store = res.data.system_store || {}
          that.store_self_mention = res.data.store_self_mention
          that.computedPrice()
        })
        .catch(() => {
          uni.showToast({
            title: '加载订单数据失败',
            icon: 'none',
            duration: 2000
          })
        })
    },
    addressTap() {
      const that = this
      debugger
      that.showAddress = true
      if (!that.addressLoaded) {
        that.addressLoaded = true
        that.$refs.address.getAddressList()
      }
    },
    addressRedirect() {
      this.addressLoaded = false
      this.showAddress = false
    },
    couponTap() {
      this.showCoupon = true
    },
    changeCoupon(coupon) {
      if (!coupon) {
        this.usableCoupon = { couponTitle: '不使用优惠券', id: 0 }
      } else {
        this.usableCoupon = coupon
      }
      this.computedPrice()
    },
    payItem: function(index) {
      this.active = index
    },
    changeAddress(addressInfo) {
      this.addressInfo = Object.assign({}, addressInfo)
    },
    createOrder() {
      const shipping_type = this.shipping_type
      if (!this.active) {
        uni.showToast({
          title: '请选择支付方式',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.addressInfo.id && !this.shipping_type) {
        uni.showToast({
          title: '请选择收货地址',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.shipping_type) {
        if ((this.contacts === '' || this.contactsTel === '') && this.shipping_type) {
          uni.showToast({
            title: '请填写联系人或联系人电话',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (!/^1(3|4|5|7|8|9|6)\d{9}$/.test(this.contactsTel)) {
          uni.showToast({
            title: '请填写正确的手机号',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.contacts)) {
          uni.showToast({
            title: '请填写您的真实姓名',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }

      wx.showLoading({ title: '生成订单中' })
      createOrder(this.orderGroupInfo.orderKey, {
        realName: this.contacts,
        phone: this.contactsTel,
        addressId: this.addressInfo.id,
        useIntegral: this.useIntegral ? 1 : 0,
        couponId: this.usableCoupon.id || 0,
        payType: this.active,
        pinkId: this.pinkId,
        seckillId: this.orderGroupInfo.seckill_id,
        combinationId: this.orderGroupInfo.combination_id,
        bargainId: this.orderGroupInfo.bargain_id,
        from: this.from,
        mark: this.mark || '',
        shippingType: parseInt(shipping_type) + 1
      }).then((res) => {
        uni.hideLoading()
        const data = res.data
        switch (data.status) {
          case 'ORDER_EXIST':
          case 'EXTEND_ORDER':
          case 'PAY_DEFICIENCY':
          case 'PAY_ERROR':
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
            uni.navigateTo({
              url: '/pages/order/details/index?id=' + data.result.orderId
            })
            break
          case 'SUCCESS':
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
            uni.navigateTo({
              url: '/pages/order/details/index?id=' + data.result.orderId
            })
            break
          case 'WECHAT_H5_PAY':
            uni.navigateTo({
              url: '/pages/order/details/index?id=' + data.result.orderId
            })
            setTimeout(() => {
              // location.href = data.result.jsConfig.mweb_url;
            }, 100)
            break
          case 'WECHAT_PAY':
            weappPay(data.result.jsConfig).then((res) => {
              uni.navigateTo({
                url: '/pages/order/details/index?id=' + data.result.orderId
              })
            })

            // 下面为原先微信支付方式，
            // pay(data.result.jsConfig).finally(() => {
            //   this.$router.replace({
            //     path: "/pages/order/OrderDetails/main" ,query: { id: data.result.orderId}
            //   });
            // });
        }
      })
        .catch((err) => {
          uni.hideLoading()
          uni.showToast({
            title: err.msg || '创建订单失败',
            icon: 'none',
            duration: 2000
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-manage {
  .line{
    height: 9upx;
    overflow: hidden;
  }
}

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

.wrap-box {
  .item {
    border-bottom: 1upx solid #ddd;
  }
  .pay-item {
    border: 1upx solid #eee;
    margin-top: 20upx;
    &.active {
      border: 1upx dotted #fc5445;
      color: #e93323;
    }
    .cuIcon-weixin,
    .cuIcon-coin {
      font-size: 36upx;
    }
    .tip {
      font-style:oblique
    }
  }
}
</style>
