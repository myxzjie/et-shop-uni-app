<template>
  <view class="cu-modal bottom-modal" :class="dialog ? 'show' : ''" @tap="qrcodeClose">
    <view class="cu-dialog" @tap.stop="">
      <view class="cu-bar bg-white">
        <view class="action text-green" />
        <view class="action">订单核销二维码</view>
        <view class="action text-blue" @tap="qrcodeClose">
          <text class="cuIcon-close" />
        </view>
      </view>
      <view class="margin-top-sm padding-bottom">
        <view class="qrcode-box">
          <image v-if="qrcode !== ''" :src="qrcode" class="qrcode" mode="aspectFill" show-menu-by-longpress />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    qrcode: {
      type: String,
      default: ''
    }
  },
  data(){
    return {}
  },
  methods: {
    qrcodeClose() {
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.qrcode-box {
  text-align: center;
  .qrcode{
    width: 600upx;
    height: 600upx;
    margin: 20upx auto;
  }
}
</style>