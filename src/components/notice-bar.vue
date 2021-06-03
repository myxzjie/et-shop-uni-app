<template>
  <scroll-view class="scrool-more" scroll-x="true" scroll-with-animation="true">
    <text v-for="(item,index) in notices" :key="index" class="label-name">
      {{ item }}
    </text>
  </scroll-view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      defualt: ''
    },
    scroll: {
      type: Boolean,
      defualt: ''
    }
  },
  data() {
    return {
      styleName: 'animation-duration: 6s',
      // scroll: false,
      tipWidth: 0
    }
  },
  watch: {
    text: {
      handler(val) {
        this.textScroll()
      },
      immediate: false
    }
  },
  methods: {
    textScroll() {
      // 等待节点挂载后再执行,热门线路tip滚动实现
      this.$nextTick(() => {
        const query = wx.createSelectorQuery().in(this)
        query.select('.tip').boundingClientRect(data => {
          this.tipWidth = data.width
        }).exec()
        query.select('.tip-inder').boundingClientRect(data => {
          if (data.width > this.tipWidth) {
            const w = Number(data.width)
            const time = Math.round(w / 40)
            this.styleName = `animation-duration: ${time}s`
            this.scroll = true
          }
        }).exec()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.scrool-more{
	/*  white-space: nowrap; 表示的不换行*/
	white-space: nowrap;
	/*宽度100%也是必须要给定的*/
	width: 100%;
	height: 56rpx;
}
.label-name{
	width: 140rpx;
	height: 40rpx;
	line-height: 40rpx;
	vertical-align: middle;
	color: #fff;
	padding: 20rpx;
	background: pink;
}
</style>
