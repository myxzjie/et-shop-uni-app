<template>
  <view class="tartan">
    <div class="tartan-half" @tap="handleNavigationPage(res.list[0])">
      <u-image width="100%" height="330rpx" border-radius="6rpx" class="image" :src="res.list[0].img">
        <u-loading slot="loading" />
      </u-image>
    </div>
    <div class="tartan-half">
      <div class="tartan-half-height" @tap="handleNavigationPage(res.list[1])">
        <u-image width="100%" height="166rpx" border-radius="6rpx" class="image" :src="res.list[1].img" alt>
          <u-loading slot="loading" />
        </u-image>
      </div>
      <div class="tartan-half-height" @tap="handleNavigationPage(res.list[2])">
        <u-image width="100%" height="166rpx" border-radius="6rpx" class="image" :src="res.list[2].img" alt>
          <u-loading slot="loading" />
        </u-image>
      </div>
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
  padding: 10rpx 8rpx;
  margin: 8rpx 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  overflow: hidden;
  .tartan-half {
    height: 335rpx;
    flex: 1;
    overflow: hidden;
    padding: 2rpx;
    .tartan-half-height {
      height: 168rpx;
      overflow: hidden;
    }
  }
  .image {
    width: 100%;
    height: 100%;
    display: block;
    padding: 2rpx;
  }
}
</style>
