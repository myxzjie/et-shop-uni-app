<template>
  <view>
    <view class="cu-modal bottom-modal" :class="value ? 'show' : ''" @tap="onClose">
      <view class="cu-dialog" @tap.stop="">
        <view class="cu-bar bg-white">
          <view class="action text-green" />
          <view class="action">选择付款方式</view>
          <view class="action text-blue" @tap="onClose">
            <text class="cuIcon-close" />
          </view>
        </view>
        <view class="margin-top-sm padding-bottom">
          <view
            v-if="types.indexOf('weixin') !== -1"
            class="item flex flex-wrap align-between padding-sm bg-white"
            @tap="checked('weixin')"
          >
            <view class="cuIcon-weixin text-green" />
            <view class="content text-left padding-left-sm">
              <view class="text">
                <view class="name">微信支付</view>
                <view class="info text-grey">使用微信快捷支付</view>
              </view>
            </view>
          </view>

          <!-- <view
            class="item flex flex-wrap align-between padding-sm bg-white"
            v-if="types.indexOf('alipay') !== -1"
            @click="checked('alipay')"
          >
            <view class="iconfont icon-zhifubao"></view>
            <view class="content text-left padding-left-sm">
              <view class="text">
                <view class="name">支付宝支付</view>
                <view class="info">使用线上支付宝支付</view>
              </view>
            </view>
          </view> -->
          <view
            v-if="types.indexOf('yue') !== -1"
            class="item flex flex-wrap align-between padding-sm bg-white"
            @tap="checked('yue')"
          >
            <view class="cuIcon-coin text-yellow" />
            <view class="content text-left padding-left-sm">
              <view class="text">
                <view class="name">余额支付</view>
                <view class="info text-grey">
                  当前可用余额：<text class="money text-yellow">{{ balance }}</text>
                </view>
              </view>
            </view>
          </view>
          <!-- <view
            class="item flex flex-wrap align-between padding-sm bg-white"
            v-if="types.indexOf('offline') !== -1"
            @tap="checked('offline')"
          >
            <view class="iconfont icon-yuezhifu1"></view>
            <view class="content text-left padding-left-sm">

              <view class="text">
                <view class="name">线下支付</view>
                <view class="info">选择线下付款方式</view>
              </view>
            </view>

          </view> -->

        </view>
      </view>
    </view>

  </view>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    balance: {
      type: [Number, String],
      default: 0
    },
    types: {
      type: Array,
      default: () => ['weixin', 'alipay', 'yue', 'offline']
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    checked(type) {
      this.$emit('change', type)
      this.onClose()
    },
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
    border-bottom: 1px solid #eee;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    [class^="cuIcon"] {
      width: 30upx;
    }
    .content {
      width: calc(100% - 30upx);
    }
  }
</style>
