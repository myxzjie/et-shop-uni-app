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
      <view class="apply-return">
        <view v-for="cart in orderInfo.cartInfo" :key="cart.id" class="product flex flex-wrap row-between margin-top bg-white padding">
          <view class="pictrue">
            <image :src="cart.productInfo.image" class="image" />
          </view>
          <view class="content padding-left-xs">
            <view class="title flex flex-wrap row-between padding-top-xs ">
              <view class="name">
                {{ cart.productInfo.storeName }}
              </view>
            <!-- <view class="quantity">x {{ cart.cartNum }}</view> -->
            </view>
            <!-- <view class="title">
              <text>{{ cart.productInfo.storeName }}</text>
            </view> -->
            <view class="slice">
              <view class="price padding-top-sm">
                价格: ￥{{
                  cart.productInfo.attrInfo
                    ? cart.productInfo.attrInfo.price
                    : cart.productInfo.price
                }}
              </view>
              <view class="quantity padding-top-xs">数量: x{{ cart.cartNum }}</view>
            </view>
          </view>
        </view>
        <view class="wrap-box margin-top bg-white padding">
          <view class="item flex flex-wrap align-between">
            <view>退货件数</view>
            <view class="num">{{ orderInfo.totalNum }}</view>
          </view>
          <view class="item flex flex-wrap align-between padding-top">
            <view>退款金额</view>
            <view class="num">￥{{ orderInfo.payPrice }}</view>
          </view>
          <picker :value="reason" :range="reasonList" @change="changeReason">
            <view class="item flex flex-wrap align-between padding-top">
              <view>退款原因</view>
              <view class="num">{{ reason }}</view>
              <text class="cuIcon-right" />
            </view>
          </picker>
          <view class="item textarea flex flex-wrap align-between padding-top">
            <view>备注说明</view>
            <textarea v-model="refund_reason_wap_explain" placeholder="填写备注信息，100字以内" class="num" />
          </view>
        </view>
        <view class="padding flex flex-direction">
          <button class="cu-btn bg-red lg" @tap="submit">申请退款</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { orderDetail, getRefundReason, postOrderRefund } from '@/api/order'
import { trim } from '@/utils/index'

export default {
  components: {},
  data() {
    return {
      url: `/upload/image`,
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      },
      id: 0,
      orderInfo: {},
      reasonList: [],
      reason: '',
      refund_reason_wap_explain: '',
      refund_reason_wap_img: []
    }
  },
  onLoad(option) {
    this.id = option.id || 0
  },
  onShow() {
    this.getOrderDetail()
    this.getRefundReason()
  },
  methods: {
    changeReason(e) {
      this.reason = this.reasonList[e.mp.detail.value]
    },
    imageuploaded(res) {
      if (res.status !== 200) { return this.$dialog.error(res.msg || '上传图片失败') }
      this.refund_reason_wap_img.push(res.data.url)
    },
    getOrderDetail() {
      const that = this
      orderDetail(that.id).then(res => {
        that.orderInfo = res.data
      })
        .catch(err => {
          this.$dialog.error(err.response.data.msg || '获取订单失败')
        })
    },
    getRefundReason() {
      getRefundReason().then(res => {
        this.reasonList = res.data
      })
    },
    submit() {
      const refund_reason_wap_explain = trim(this.refund_reason_wap_explain)
      const text = this.reason
      if (!text) {
        uni.showToast({
          title: '请选择退款原因',
          icon: 'success',
          duration: 2000
        })
        return
      }
      postOrderRefund({
        text,
        uni: this.orderInfo.orderId,
        refund_reason_wap_img: this.refund_reason_wap_img.join(','),
        refund_reason_wap_explain
      })
        .then(res => {
          console.log(res, 2222)
          uni.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        })
        .catch(err => {
          uni.showToast({
            title: err.msg,
            icon: 'none',
            duration: 2000
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        // width: calc(100% - 60upx);
        .name {
          // width: calc(100% - 60upx);
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
.wrap-box {
  .item {
    textarea {
      height: 66upx;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      text-align: right;
      // display:table-cell;
      // vertical-align:middle;
      padding-top: 20upx;
    }
  }
}
</style>
