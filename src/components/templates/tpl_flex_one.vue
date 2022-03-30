<template>
  <view class="tartan">
    <div class="tartan-half" @tap="handleNavigationPage(res.list[0])">
      <u-image width="100%" height="280rpx" class="image" :src="res.list[0].img">
        <u-loading slot="loading" />
      </u-image>
    </div>
  </view>
</template>

<script>
import { modelNavigateTo } from '@/utils'
export default {
  props: {
    res: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    handleNavigationPage(item) {
      modelNavigateTo(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tartan {
  padding: 10rpx 18rpx;
  margin: 8rpx 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  overflow: hidden;
  .tartan-half {
    width: 100%;
    overflow: hidden;
  }
  .image {
    // width: 100%;
    // height: 100%;
    // display: block;
    // padding: 2rpx;
  }
}
</style>
