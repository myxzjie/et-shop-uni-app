<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
        <view v-if="isBack" class="action" @tap="BackPage">
          <text class="cuIcon-back" />
          <slot name="backText" />
        </view>
        <view class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content" />
        </view>
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CuCustom',
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    }
  },
  computed: {
    style() {
      var StatusBar = this.StatusBar
      var CustomBar = this.CustomBar
      var bgImage = this.bgImage
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`
      }
      return style
    }
  },
  methods: {
    BackPage() {
      if (getCurrentPages().length < 2 && typeof __wxConfig !== 'undefined') {
        const url = '/' + __wxConfig.pages[0]
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style>

</style>
