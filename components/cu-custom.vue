<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
        <view
          v-if="isBack"
          class="action border-custom"
          :style="[{width: Custom.width+'px', height: (Custom.height-2)+'px','margin-left': 'calc(750rpx - '+Custom.right+'px)'}]"
        >
          <text :style="[{'line-height':Custom.height+'px'}]" class="cuIcon-back" @tap="backPage" />
          <!-- <u-icon @click="back()" name="arrow-left" class="icon-back"></u-icon> -->
          <!-- <slot name="backText" /> -->
          <text :style="[{'line-height':Custom.height+'px'}]" class="cuIcon-homefill" @tap="homePage" />
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
      default: 'bg-gradual-olive'
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
      Custom: this.Custom,
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    }
  },
  computed: {
    style() {
      const StatusBar = this.StatusBar
      const CustomBar = this.CustomBar
      const bgImage = this.bgImage
      let style = `height:${CustomBar}px;padding-top:${StatusBar}px;`
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`
      }
      return style
    }
  },
  methods: {
    backPage() {
      let delta = 1
      const pages = getCurrentPages()
      const beforePage = pages[pages.length - 2]
      if (beforePage.route === 'pages/auth/login') {
        delta = 2
      }
      if (pages.length < 2 && typeof __wxConfig !== 'undefined') {
        const url = '/' + __wxConfig.pages[0]
        if (__wxConfig.pages[0] === 'pages/auth/login') {
          url = '/pages/index/index'
        }
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: delta
      })
    },
    homePage() {
      uni.navigateTo({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style>

</style>
