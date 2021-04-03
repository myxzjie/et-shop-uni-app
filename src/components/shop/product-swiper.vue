<template>
  <view class="slider-banner product-bg">
    <swiper v-if="imgUrls.length > 0" class="swiper-wrapper" @change="handleChange">
      <block v-for="(item, imgUrlsIndex) in imgUrls" :key="imgUrlsIndex">
        <swiper-item>
          <img :src="item" class="slide-image">
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
    const that = this
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
