<template>
  <view class="cu-bar tabbar bg-white foot">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="action"
      :class="[active === item.id ? 'text-green' : 'text-gray', item.shadow ? 'add-action':'']"
      :data-id="item.id"
      @tap="switchTab(item.id)"
    >
      <view :class="[item.icon, item.shadow ? 'bg-green': '']">
        <!-- <image :src="active === item.id ? item.current : item.default" mode="aspectFit" /> -->
        <!-- <view class="cu-tag badge">99</view> -->
      </view>
      <view>{{ item.name }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: { type: [Number, String], default: 1 },
    list: { type: [Array, Object], default: () => [] }
  },
  data() {
    return {
      active: this.current
    }
  },
  mounted() {},
  methods: {
    switchTab(id) {
      this.active = id
      this.$emit('change', id)
    }
    // changeTab(item) {
    //   this.page = item.pagePath
    //   // 这里使用reLaunch关闭所有的页面，打开新的栏目页面
    //   uni.reLaunch({
    //     url: this.page
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>

.cu-bar{
  &.tabbar {
    .action {
      [class*="svg-icon-"] {
        // width: 100upx;
        // position: relative;
        // display: block;
        // height: auto;
        // margin: 0 auto 10upx;
        // text-align: center;
        font-size: 64upx;
      }
      &.add-action {
        [class*="svg-icon-"] {
          position: absolute;
          width: 70upx;
          z-index: 2;
          height: 70upx;
          border-radius: 50%;
          line-height: 70upx;
          font-size: 50upx;
          top: -35upx;
          left: 0;
          right: 0;
          margin: auto;
          padding: 0;
        }
      }
    }
  }
}
</style>
