<template>
  <view class="swiper-banner bg-white padding-sm">
    <swiper v-if="imgUrls.length > 0" class="swiper-item" @change="handleChange">
      <block v-for="(item, imgUrlsIndex) in imgUrls" :key="imgUrlsIndex">
        <swiper-item>
          <image class="swiper-image" :src="item" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <view class="pages">{{ currents || 1 }}/{{ imgUrls.length || 1 }}</view>
  </view>
</template>
<script>

export default {
  name: 'ProductSwiper',
  components: {},
  props: {
    imgUrls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    // const that = this
    return {
      currents: 1
    }
  },
  methods: {
    handleChange(event) {
      this.currents = event.mp.detail.current + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-banner {
  position: relative;
  .swiper-item {
    height: 750upx;
    .swiper-image {
      width: 100%;
    }
  }
  .pages {
    position: absolute;
    right: 20upx;
    bottom: 20upx;
  }
}
</style>
